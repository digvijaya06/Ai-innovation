# AI Agent Guide

This directory contains guidance and metadata for AI agents working with this project.

## Quick Start for AI Agents

When you first encounter this project, read these files in order:

1. **This file (README.md)** - Overview of project structure and conventions
2. **[PROJECT_ARCHITECTURE.md](file:///c:/Users/dimple/OneDrive/Desktop/Ai%20Innovation/PROJECT_ARCHITECTURE.md)** - High-level architecture and design decisions
3. **[PROJECT_METADATA.json](file:///c:/Users/dimple/OneDrive/Desktop/Ai%20Innovation/PROJECT_METADATA.json)** - Machine-readable project metadata
4. **[CONVENTIONS.md](file:///c:/Users/dimple/OneDrive/Desktop/Ai%20Innovation/.agent/CONVENTIONS.md)** - Coding standards and naming conventions

## Living Documentation

This project maintains **living documentation** that should be updated whenever significant changes are made:

### Must Update When:

- **Adding/removing components** → Update `COMPONENT_REGISTRY.md` and `PROJECT_METADATA.json`
- **Creating/modifying stores** → Update `STATE_MANAGEMENT.md` and `PROJECT_METADATA.json`
- **Adding routes** → Update `PROJECT_ARCHITECTURE.md` routing section and `PROJECT_METADATA.json`
- **Adding API endpoints** → Update `API_ENDPOINTS.md`
- **Changing folder structure** → Update `PROJECT_ARCHITECTURE.md` and `project-structure.json`
- **Adding dependencies** → Update `PROJECT_METADATA.json`

### Documentation Files:

| File | Purpose | Format |
|------|---------|--------|
| `PROJECT_ARCHITECTURE.md` | High-level architecture, tech stack, folder structure | Markdown |
| `PROJECT_METADATA.json` | Machine-readable metadata, counts, versions | JSON |
| `COMPONENT_REGISTRY.md` | All components with props and usage | Markdown |
| `STATE_MANAGEMENT.md` | Zustand stores and state patterns | Markdown |
| `API_ENDPOINTS.md` | API integration documentation | Markdown |
| `.agent/CONVENTIONS.md` | Coding standards and patterns | Markdown |
| `.agent/project-structure.json` | Machine-readable structure | JSON |

## Project Structure at a Glance

```
src/
├── components/
│   ├── ui/              # shadcn/ui components (auto-generated)
│   ├── layout/          # Layout components (Header, Sidebar, Footer)
│   └── features/        # Feature-specific components
├── stores/              # Zustand state stores
├── pages/               # Page/route components
├── lib/                 # Utilities, API clients, helpers
├── hooks/               # Custom React hooks
├── types/               # TypeScript type definitions
└── App.tsx              # Main app entry with routing
```

## Technology Stack

- **Framework**: Vite + React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Routing**: React Router
- **Forms**: React Hook Form + Zod

## Key Principles

1. **Component Composition**: Build with small, focused, reusable components
2. **Type Safety**: Use TypeScript for all code
3. **State Management**: Keep Zustand stores minimal and domain-focused
4. **Styling**: Use Tailwind utilities + shadcn components
5. **Documentation**: Update living docs after significant changes

## Common Tasks

### Adding a New Component

1. Create the component file in appropriate folder (`components/features/` or `components/layout/`)
2. Add TypeScript interface for props
3. Update `COMPONENT_REGISTRY.md`
4. Update component count in `PROJECT_METADATA.json`

### Adding a New Page/Route

1. Create page component in `src/pages/`
2. Add route in `App.tsx`
3. Update routing section in `PROJECT_ARCHITECTURE.md`
4. Update routes array in `PROJECT_METADATA.json`

### Adding a Zustand Store

1. Create store file in `src/stores/`
2. Define TypeScript interface for state
3. Document in `STATE_MANAGEMENT.md`
4. Update store count in `PROJECT_METADATA.json`

### Installing shadcn Component

```bash
npx shadcn@latest add [component-name]
```

This auto-generates in `src/components/ui/` - no need to manually update docs.

## Best Practices

- **Read before writing**: Always check existing patterns in documentation
- **Follow conventions**: Adhere to naming and structure in `CONVENTIONS.md`
- **Update metadata**: Keep `PROJECT_METADATA.json` current
- **Document as you go**: Update relevant `.md` files with changes
- **Use TypeScript**: Never use `any`, always define proper types

## Getting Help

- Check `vite-nextjs-frontend-SKILL.md` for patterns and examples
- Review existing components for reference implementations
- Consult `CONVENTIONS.md` for coding standards
- Look at `STATE_MANAGEMENT.md` for Zustand patterns
