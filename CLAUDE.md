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
   - Transcription models: Currently locked to OpenAI defaults (GPT-4o Mini Transcribe, Whisper 1, GPT-4o Transcribe)
   - Vision models: Currently locked to OpenAI defaults (GPT-4.1 is default, plus various GPT-4o variants)

## Database Schema

Primary tables in Supabase:
- `project`: Stores workflow projects with their nodes and edges, and custom accent colors
- `profile`: User profile data with subscription information

### Project Customization

Each project now supports:
- **Custom Accent Colors**: Choose from 15 Tailwind colors (red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose)
- **System Prompts**: Custom instructions for AI generation
- **Font Configuration**: Outfit (sans-serif) and IBM Plex Mono (monospace)

## Keyboard Shortcuts

The canvas supports several keyboard shortcuts for improved workflow efficiency:

- **`Cmd+A` (Ctrl+A on Windows/Linux)**: Select all nodes
- **`Cmd+D` (Ctrl+D on Windows/Linux)**: Duplicate selected nodes
- **`Cmd+C` (Ctrl+C on Windows/Linux)**: Copy selected nodes
- **`Cmd+V` (Ctrl+V on Windows/Linux)**: Paste copied nodes
- **`Cmd+Enter` (Ctrl+Enter on Windows/Linux)**: Generate content on selected/focused transform nodes
- **`Backspace` / `Delete`**: Delete selected nodes or edges (connections)

### Enhanced Shortcuts

**Generate Shortcut (`Cmd+Enter`):**
- Intelligently targets selected transform nodes or the currently focused node
- Only affects transform nodes (nodes with `data.source === 'transform'`)  
- Primitive nodes (input nodes) are not affected
- Works inside input fields with `enableOnFormTags: true`
- Uses a custom DOM event system for clean node communication
- Includes analytics tracking for usage insights

**Edge Management:**
- **Click on connections**: Select edge connections between nodes
- **Delete connections**: Use `Backspace`/`Delete` to disconnect nodes
- **Visual feedback**: Selected edges highlight in the project's accent color
- **Hover effects**: Connections show interactive states

### Development Features

**Node Data Inspector** (Development mode only):
- **Right-click** any node → **"Show data"** to view internal node data
- **Scrollable JSON**: Horizontal and vertical scroll support for large data
- **Debug information**: View all node properties and generated content

## Key Files

- `components/canvas/canvas.tsx`: Main canvas implementation with keyboard shortcuts
- `components/nodes/`: Node implementations for different content types  
- `components/edges/`: Edge implementations (animated, floating, temporary)
- `components/project-settings.tsx`: Project configuration with color picker
- `components/project-color-provider.tsx`: Dynamic accent color system
- `providers/project.tsx`: Project context provider
- `lib/database.ts`: Database connection and utilities
- `lib/auth.ts`: Authentication utilities
- `lib/colors.ts`: Tailwind color definitions and utilities
- `lib/fonts.ts`: Font configuration (Outfit, IBM Plex Mono)
- `schema.ts`: Database schema definitions using Drizzle ORM

## Configuration

### Server Actions
- **Body size limit**: 50MB (configured in `next.config.ts`)
- **Large project support**: Handles complex workflows with many nodes
- **Auto-save**: Canvas changes automatically saved to database

### Typography
- **Default font**: Outfit (Google Fonts)
- **Monospace font**: IBM Plex Mono (Google Fonts)
- **Self-hosted**: Fonts optimized and served from application domain
