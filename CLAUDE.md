# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Primary Commands

```bash
# Start development environment (Next.js, Supabase, Email preview, Stripe webhook forwarding)
pnpm dev

# Build the application
pnpm build

# Start the production server
pnpm start

# Run linting
pnpm lint

# Export emails
pnpm export
```

### Development Setup

1. Make sure you have Node.js v20+ and PNPM installed
2. Create a `.env.local` file with the required environment variables (see `lib/env.ts` for list)
3. Install the Supabase CLI and Stripe CLI for local development

## Architecture Overview

Tersa is a visual AI workflow builder built with Next.js, React, and Supabase. It uses ReactFlow (via @xyflow/react) for the canvas-based workflow editor.

### Key Components

1. **Canvas System**
   - The core visual editor is built with ReactFlow in `components/canvas`
   - Nodes represent different AI operations (text, image, audio, video, code)
   - Edges connect nodes to create workflows
   - The canvas auto-saves changes to Supabase

2. **Node Architecture**
   - Each node type (text, image, audio, etc.) follows a consistent pattern:
     - `index.tsx`: Main component that determines node rendering
     - `primitive.tsx`: Input nodes that accept user input
     - `transform.tsx`: Processing nodes that transform input from other nodes

3. **State Management**
   - Project data is stored in Supabase
   - React Context provides project state via `providers/project.tsx`
   - Node operations are managed in `providers/node-operations.tsx`

4. **Authentication & Users**
   - Supabase handles authentication
   - User state accessed via `hooks/use-user.ts`
   - Stripe integration for subscription management

5. **AI Model Integration**
   - Various AI models are integrated via the Vercel AI SDK
   - Model configurations defined in `lib/models/`
   - API routes in `app/api` and server actions in `app/actions` handle AI requests

## Database Schema

Primary tables in Supabase:
- `project`: Stores workflow projects with their nodes and edges
- `profile`: User profile data with subscription information

## Key Files

- `components/canvas/canvas.tsx`: Main canvas implementation
- `components/nodes/`: Node implementations for different content types
- `providers/project.tsx`: Project context provider
- `lib/database.ts`: Database connection and utilities
- `lib/auth.ts`: Authentication utilities
- `schema.ts`: Database schema definitions using Drizzle ORM