import {
  BaseEdge,
  type EdgeProps,
  type InternalNode,
  type Node,
  getBezierPath,
  useInternalNode,
} from '@xyflow/react';
import { Position } from '@xyflow/react';

// Simplified floating edge that maintains the existing handle system but with dynamic positioning
const getEdgeParams = (source: InternalNode<Node>, target: InternalNode<Node>) => {
  const sourcePos = Position.Right;
  const targetPos = Position.Left;
  
  // Use existing handle positioning logic but make it more flexible
  const sourceX = source.internals.positionAbsolute.x + (source.measured?.width ?? 0);
  const sourceY = source.internals.positionAbsolute.y + (source.measured?.height ?? 0) / 2;
  const targetX = target.internals.positionAbsolute.x;
  const targetY = target.internals.positionAbsolute.y + (target.measured?.height ?? 0) / 2;

  return {
    sx: sourceX,
    sy: sourceY,
    tx: targetX,
    ty: targetY,
    sourcePos,
    targetPos,
  };
};

export const FloatingEdge = ({
  id,
  source,
  target,
  markerEnd,
  style,
}: EdgeProps) => {
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    sourceNode,
    targetNode
  );

  const [edgePath] = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetX: tx,
    targetY: ty,
    targetPosition: targetPos,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} style={style} />
      <circle r="4" fill="var(--primary)">
        <animateMotion dur="2s" repeatCount="indefinite" path={edgePath} />
      </circle>
    </>
  );
};