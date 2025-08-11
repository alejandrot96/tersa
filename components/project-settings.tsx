'use client';

import { deleteProjectAction } from '@/app/actions/project/delete';
import { updateProjectAction } from '@/app/actions/project/update';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { handleError } from '@/lib/error/handle';
import type { projects } from '@/schema';
import { ExpandIcon, SettingsIcon, ShrinkIcon, TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { type FormEventHandler, useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

type ProjectSettingsProps = {
  data: typeof projects.$inferSelect;
};

export const ProjectSettings = ({ data }: ProjectSettingsProps) => {
  const [open, setOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [name, setName] = useState(data.name);
  const [systemPrompt, setSystemPrompt] = useState(data.systemPrompt || '');
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  const handleUpdateProject: FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    if (isUpdating) {
      return;
    }

    try {
      setIsUpdating(true);

      const response = await updateProjectAction(data.id, {
        name,
        systemPrompt,
      });

      if ('error' in response) {
        throw new Error(response.error);
      }

      toast.success('Project updated successfully');
      setOpen(false);
      router.refresh();
    } catch (error) {
      handleError('Error updating project', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteProject = async () => {
    try {
      const response = await deleteProjectAction(data.id);

      if ('error' in response) {
        throw new Error(response.error);
      }

      toast.success('Project deleted successfully');
      setOpen(false);
      router.push('/');
    } catch (error) {
      handleError('Error deleting project', error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <SettingsIcon size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Project settings</DialogTitle>
          <DialogDescription>Update your project's details.</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleUpdateProject}
          className="mt-2 grid gap-4"
          aria-disabled={isUpdating}
        >
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="My new project"
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="systemPrompt">System Prompt</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-8 px-2"
              >
                {isExpanded ? (
                  <>
                    <ShrinkIcon size={14} />
                    <span className="ml-1">Collapse</span>
                  </>
                ) : (
                  <>
                    <ExpandIcon size={14} />
                    <span className="ml-1">Expand</span>
                  </>
                )}
              </Button>
            </div>
            <Textarea
              id="systemPrompt"
              placeholder="You are a helpful assistant that synthesizes content based on the user's prompts..."
              value={systemPrompt}
              onChange={({ target }) => setSystemPrompt(target.value)}
              rows={isExpanded ? 12 : 6}
              className={isExpanded ? "resize-y min-h-[200px]" : "resize-none"}
            />
            <p className="text-xs text-muted-foreground">
              This prompt will be used for all text generation nodes in this project. Leave empty to use the default prompt.
            </p>
          </div>
          <Button type="submit" disabled={isUpdating || !name.trim()}>
            Update
          </Button>
        </form>
        <DialogFooter className="-mx-6 mt-4 border-t px-6 pt-4 sm:justify-center">
          <Button
            variant="link"
            onClick={handleDeleteProject}
            className="flex items-center gap-2 text-destructive"
          >
            <TrashIcon size={16} />
            <span>Delete</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
