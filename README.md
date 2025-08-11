![Tersa image](/app/opengraph-image.png)

# Tersa

Visualize your AI workflows. Tersa is an open source canvas for building AI workflows. Drag, drop connect and run nodes to build your own workflows powered by various industry-leading AI models.

## Features

- **Visual Workflow Builder**: Create AI workflows by connecting nodes in an intuitive drag-and-drop interface
- **Multiple AI Models**: Seamlessly integrate with leading AI models from various providers
- **Multimedia Processing**: Process images, text, audio, and video content through your workflows
- **Automatic Saving**: Changes are automatically saved to your projects
- **Cloud Storage**: All workflows are securely stored in Supabase with Row Level Security enabled
- **Modern UI**: Clean, responsive interface built with Next.js, React, and Tailwind CSS

## Technologies

- [Next.js 15](https://nextjs.org/) with App Router and Turbopack
- [React 19](https://react.dev/)
- [Supabase](https://supabase.com/) for authentication and data storage (disabled in debug mode)
- [Vercel AI SDK](https://sdk.vercel.ai/) for AI model integration
- [ReactFlow](https://reactflow.dev/) for the visual canvas
- [TipTap](https://tiptap.dev/) for rich text editing
- [Drizzle ORM](https://orm.drizzle.team/) for database queries
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [shadcn/ui](https://ui.shadcn.com/), [Kibo UI](https://www.kibo-ui.com/) and [Radix UI](https://www.radix-ui.com/) for accessible UI components

## Getting Started

### Prerequisites

- Node.js (v20+)
- PNPM package manager
- Supabase account and project
- [Supabase CLI](https://supabase.com/docs/guides/local-development/cli/getting-started) installed
- [Stripe CLI](https://docs.stripe.com/stripe-cli) installed (not required in debug mode)

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/haydenbleasel/tersa.git
   cd tersa
   ```

2. Install dependencies
   ```sh
   pnpm install
   ```

3. Create a `.env.local` file in the root directory with your environment variables. For debug mode, only `DATABASE_URL` and any AI provider keys you intend to test are required. See `lib/env.ts` for the full list.

4. Run the development server
   ```sh
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Debug Mode

- Auth disabled: endpoints do not require login.
- Stripe credits disabled: no credit tracking; costs not enforced.
- Supabase storage disabled: generated media returned as data URLs.
- Providers: Luma and Runway disabled unless keys provided; others work if keys exist.
- Rate limiting disabled in chat API for local testing.
- Model configuration: Transcription and vision models are locked to OpenAI defaults (not configurable in project settings).

## Usage

1. Login or create an account
2. Create a new project or open an existing one
3. Add nodes to your canvas by clicking the toolbar buttons
4. Connect nodes by dragging from one node's output to another node's input
5. Configure node settings as needed
6. Run your workflow to process data through the AI models

## Keyboard Shortcuts

Boost your productivity with these keyboard shortcuts:

- **`Cmd+A`** (Ctrl+A): Select all nodes
- **`Cmd+D`** (Ctrl+D): Duplicate selected nodes  
- **`Cmd+C`** (Ctrl+C): Copy selected nodes
- **`Cmd+V`** (Ctrl+V): Paste nodes
- **`Cmd+Enter`** (Ctrl+Enter): **Generate content on all transform nodes**
- **`Backspace`/`Delete`**: Remove selected nodes or connections

The **`Cmd+Enter`** shortcut is particularly powerful - it triggers content generation on all transform nodes in your workflow simultaneously, perfect for processing complex multi-step workflows.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Made with ❤️ and 🤖 by [Hayden Bleasel](https://x.com/haydenbleasel).
