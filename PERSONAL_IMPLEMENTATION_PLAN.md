# Tersa: Personal Implementation Plan

This document outlines the step-by-step process to create a simplified version of Tersa for personal use. This implementation focuses on the core AI workflow functionality while removing enterprise features like payments, email notifications, and complex infrastructure.

## Project Overview

**Goal**: Create a lightweight version of Tersa that:
- Uses PostgreSQL directly (without Supabase)
- Implements Clerk for authentication
- Removes payment processing
- Eliminates email functionality
- Removes Redis/Upstash dependency
- Preserves core AI workflow capabilities

## Phase 1: Project Setup & Architecture

- [ ] Fork the Tersa repository
- [ ] Clean up project structure
  - [ ] Remove unnecessary directories (emails/, supabase/)
  - [ ] Update `pnpm-workspace.yaml` to reflect new structure
- [ ] Update package.json
  - [ ] Remove dependencies: resend, upstash packages, stripe
  - [ ] Add Clerk dependencies: `@clerk/nextjs`
  - [ ] Update dev script to remove Supabase and Stripe references
- [ ] Set up PostgreSQL
  - [ ] Create local PostgreSQL database
  - [ ] Update DATABASE_URL in environment variables
- [ ] Create minimal `.env.local` file with only required variables: (debug mode works with just `DATABASE_URL` and any AI keys you plan to test)
  - [ ] Database connection
  - [ ] Clerk secrets
  - [ ] AI model API keys (only those you plan to use)

## Phase 2: Database Migration

- [ ] Update schema.ts
  - [ ] Remove subscription and payment-related fields
  - [ ] Update user model to work with Clerk
  - [ ] Remove Supabase-specific constructs
- [ ] Create database migration
  - [ ] `pnpm drizzle-kit generate:pg` to create migration
  - [ ] Modify migration to remove payment/subscription tables
- [ ] Create direct PostgreSQL connection utility
  - [ ] Create `lib/db.ts` for direct PostgreSQL connection
  - [ ] Implement connection pooling
- [ ] Update all database queries in the application
  - [ ] Replace Supabase query patterns with direct Drizzle ORM queries
  - [ ] Update foreign key references related to user authentication

## Phase 3: Authentication Implementation

- [ ] Set up Clerk
  - [ ] Create Clerk application and get API keys
  - [ ] Add Clerk provider to `app/layout.tsx`
- [ ] Implement authentication middleware
  - [ ] Replace Supabase auth middleware in `middleware.ts`
  - [ ] Configure public/protected routes
- [ ] Create authentication utilities
  - [ ] Create `lib/auth.ts` with Clerk-based utilities
  - [ ] Implement `getCurrentUser` and similar functions
- [ ] Update authentication UI components
  - [ ] Modify or replace components in `app/auth/` directory
  - [ ] Implement Clerk's pre-built components where appropriate
- [ ] Implement session management
  - [ ] Update session handling throughout the application
  - [ ] Ensure proper user identification in database operations

## Phase 4: File Storage

- [ ] Implement alternative file storage
  - [ ] Create a local file storage utility for development
  - [ ] Optionally set up S3 or similar for production
- [ ] Update file handling functions
  - [ ] Replace Supabase storage calls in:
    - [ ] Image upload/download functions
    - [ ] Project export/import features
    - [ ] Any other file operations
- [ ] Update file URL references
  - [ ] Ensure file URLs work with new storage solution
  - [ ] Update URL construction in UI components

## Phase 5: Removing Enterprise Features

- [ ] Remove payment system
  - [ ] Delete all Stripe-related files and components
  - [ ] Remove API routes for payments/subscriptions
  - [ ] Delete webhook handlers
- [ ] Remove email functionality
  - [ ] Delete email templates directory
  - [ ] Remove email sending logic from authentication flows
  - [ ] Implement alternatives for critical notifications
- [ ] Remove Redis/Upstash dependency
  - [ ] Replace rate limiting with simplified or no rate limiting
  - [ ] Replace any Redis-based caching with alternatives
  - [ ] Update or remove features that depend on Redis

## Phase 6: AI Model Integration

- [ ] Simplify AI model configuration
  - [ ] Update `lib/models/` files to only include models you plan to use
  - [ ] Remove credit tracking from model usage
- [ ] Update model initialization
  - [ ] Ensure models initialize properly without enterprise infrastructure
  - [ ] Test each model type (text, image, video) with simplified setup
- [ ] Create simplified logging system
  - [ ] Implement basic logging for AI model usage
  - [ ] Remove complex analytics tracking

## Phase 7: UI Cleanup

- [ ] Remove subscription UI elements
  - [ ] Update navigation and settings components
  - [ ] Remove pricing pages and upgrade prompts
- [ ] Simplify project interface
  - [ ] Remove team collaboration features
  - [ ] Clean up dashboard for single-user experience
- [ ] Update node components
  - [ ] Ensure node configuration works without enterprise features
  - [ ] Validate all node types function correctly

## Phase 8: Testing & Deployment

- [ ] Create test workflow
  - [ ] Test each node type with personal AI API keys
  - [ ] Verify project saving and loading
- [ ] Test authentication flow
  - [ ] Validate Clerk authentication works properly
  - [ ] Ensure user settings and preferences persist
- [ ] Local deployment
  - [ ] Test complete system on local environment
  - [ ] Fix any integration issues
- [ ] Production deployment (optional)
  - [ ] Deploy to personal server or cloud service
  - [ ] Configure production environment variables

## Additional Enhancements

- [ ] Create local backup utility
  - [ ] Implement PostgreSQL backup mechanism
  - [ ] Add export/import of personal workflows
- [ ] Add personal customizations
  - [ ] Customize UI theme/branding
  - [ ] Add personal AI model presets
- [ ] Optimization for single-user
  - [ ] Remove unnecessary request validation
  - [ ] Simplify UI for faster loading
  - [ ] Add keyboard shortcuts for personal workflow

## Technical Challenges and Solutions

### Database Migration Challenges

To migrate from Supabase to direct PostgreSQL access, you'll need to:

1. **Row Level Security (RLS)**: Replace Supabase RLS with application-level access control
2. **Authentication Tables**: Create simplified user tables that work with Clerk instead of Supabase Auth
3. **Realtime Subscriptions**: If used, replace with polling or simpler alternatives

### File Storage Alternatives

Options to replace Supabase Storage:

1. **Local file system**: Simplest for personal use
2. **S3 Compatible Storage**: AWS S3, MinIO, or DigitalOcean Spaces
3. **GitHub-based storage**: Store assets in a personal GitHub repository

### Authentication Flow Changes

When switching to Clerk:

1. Remove email verification requirements or use Clerk's verification
2. Update profile management to use Clerk user data
3. Ensure database records link correctly to Clerk user IDs

## Maintaining Core Functionality

Throughout this process, maintain these core Tersa features:

- Visual workflow canvas (ReactFlow)
- Node configuration and connections
- AI model integration
- Workflow execution
- Project saving/loading

## Conclusion

This implementation plan provides a roadmap to create a personal version of Tersa that maintains its powerful AI workflow capabilities while removing enterprise features and simplifying the infrastructure. By following these steps methodically, you can create a streamlined application that meets personal needs without the complexity of the full SaaS version.
