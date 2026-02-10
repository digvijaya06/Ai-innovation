---
name: vite-nextjs-frontend
description: Build modern, production-ready frontend applications using Vite or Next.js with shadcn/ui components and Zustand state management. Use when users want to create web apps, dashboards, landing pages, or any React-based UI with best practices for routing, styling, state management, and component architecture. Triggers include requests for "modern frontend", "React app", "Next.js project", "Vite setup", "shadcn", "Zustand", or building any web interface with TypeScript and Tailwind CSS.
---

# Vite + Next.js Frontend Skill

Build production-ready React applications with modern tooling, beautiful UI components, and efficient state management.

## When to Use This Skill

Use this skill when the user wants to:
- Create a new frontend application from scratch
- Build dashboards, admin panels, or SaaS interfaces
- Set up a landing page or marketing site
- Create an interactive web application
- Implement modern React patterns with TypeScript
- Use shadcn/ui component library
- Manage global state with Zustand
- Set up routing and navigation

## Core Technology Stack

### Framework Choice
- **Vite**: For SPAs, client-side apps, or when you need fast dev experience
- **Next.js 14+ (App Router)**: For SSR, SEO-critical sites, or full-stack apps

### Essential Dependencies
- **React 18+** with TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** for beautiful, accessible components
- **Zustand** for lightweight state management
- **React Router** (Vite) or built-in routing (Next.js)

## Setup Patterns

### Vite Setup

```bash
# Create new Vite project
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install

# Install core dependencies
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install shadcn/ui
npx shadcn@latest init

# Install Zustand
npm install zustand

# Install React Router
npm install react-router-dom
```

### Next.js Setup

```bash
# Create Next.js project with TypeScript
npx create-next-app@latest my-app --typescript --tailwind --app
cd my-app

# Install shadcn/ui
npx shadcn@latest init

# Install Zustand
npm install zustand
```

## Project Structure

### Vite Structure
```
src/
├── components/
│   ├── ui/              # shadcn components
│   ├── layout/          # Header, Footer, Sidebar
│   └── features/        # Feature-specific components
├── stores/              # Zustand stores
├── pages/               # Route components
├── lib/                 # Utilities, API clients
├── hooks/               # Custom React hooks
├── types/               # TypeScript types
└── App.tsx              # Main app with router
```

### Next.js Structure (App Router)
```
app/
├── (auth)/              # Route groups
│   ├── login/
│   └── signup/
├── dashboard/
│   └── page.tsx
├── layout.tsx           # Root layout
└── page.tsx             # Home page
components/
├── ui/                  # shadcn components
├── layout/
└── features/
stores/                  # Zustand stores
lib/                     # Utilities
```

## State Management with Zustand

Create focused, minimal stores for different domains:

```typescript
// stores/user-store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserState {
  user: User | null
  setUser: (user: User | null) => void
  logout: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
    }
  )
)
```

```typescript
// stores/ui-store.ts
import { create } from 'zustand'

interface UIState {
  sidebarOpen: boolean
  toggleSidebar: () => void
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}))
```

### Zustand Best Practices
- Keep stores focused on a single domain (user, UI, data)
- Use `persist` middleware for localStorage sync
- Create selector hooks for derived state
- Avoid putting server state in Zustand (use React Query instead)
- Use immer middleware for complex nested updates

## shadcn/ui Integration

### Installing Components
```bash
# Add specific components as needed
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add form
npx shadcn@latest add input
npx shadcn@latest add table
```

### Component Usage Pattern
```typescript
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Dashboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Get Started</Button>
      </CardContent>
    </Card>
  )
}
```

### Customizing shadcn Components
- Edit `tailwind.config.js` for theme colors
- Modify components directly in `components/ui/` (they're yours!)
- Use CSS variables in `app/globals.css` or `src/index.css`

## Routing Patterns

### Vite with React Router
```typescript
// App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useUserStore } from './stores/user-store'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useUserStore((state) => state.user)
  return user ? <>{children}</> : <Navigate to="/login" />
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
```

### Next.js App Router
```typescript
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  )
}
```

## Common Patterns

### Layout Component
```typescript
// components/layout/AppLayout.tsx
import { useUIStore } from '@/stores/ui-store'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

export function AppLayout({ children }: { children: React.ReactNode }) {
  const sidebarOpen = useUIStore((state) => state.sidebarOpen)
  
  return (
    <div className="flex h-screen bg-background">
      {sidebarOpen && <Sidebar />}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
```

### Data Fetching Hook
```typescript
// hooks/use-fetch.ts
import { useState, useEffect } from 'react'

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [url])

  return { data, loading, error }
}
```

### Form with React Hook Form
```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Login</Button>
      </form>
    </Form>
  )
}
```

## TypeScript Best Practices

### Type Definitions
```typescript
// types/index.ts
export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
}

export interface DashboardData {
  stats: {
    users: number
    revenue: number
    growth: number
  }
  recentActivity: Activity[]
}
```

### API Response Types
```typescript
// lib/api.ts
export async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`)
  if (!response.ok) throw new Error('Failed to fetch user')
  return response.json()
}
```

## Styling Guidelines

### Tailwind Utility Classes
- Use Tailwind's utility-first approach
- Leverage shadcn's design tokens (primary, secondary, accent, etc.)
- Use responsive prefixes: `md:`, `lg:`, `xl:`
- Dark mode: `dark:` prefix

### Component Composition
```typescript
import { cn } from '@/lib/utils'

interface CardProps {
  className?: string
  children: React.ReactNode
}

export function CustomCard({ className, children }: CardProps) {
  return (
    <div className={cn(
      "rounded-lg border bg-card p-6 shadow-sm",
      className
    )}>
      {children}
    </div>
  )
}
```

## Performance Optimization

### Code Splitting (Vite)
```typescript
import { lazy, Suspense } from 'react'

const Dashboard = lazy(() => import('./pages/Dashboard'))

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Dashboard />
    </Suspense>
  )
}
```

### Dynamic Imports (Next.js)
```typescript
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})
```

## Environment Variables

### Vite (.env)
```
VITE_API_URL=https://api.example.com
VITE_APP_NAME=My App
```

Access with `import.meta.env.VITE_API_URL`

### Next.js (.env.local)
```
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgresql://...
```

Access public vars with `process.env.NEXT_PUBLIC_API_URL`

## Deployment

### Vite Build
```bash
npm run build
# Output in dist/ folder
# Deploy to Vercel, Netlify, or any static host
```

### Next.js Build
```bash
npm run build
npm start
# Deploy to Vercel (recommended) or any Node.js host
```

## Common Workflows

### Creating a New Feature
1. Create component in `components/features/`
2. Add any needed state to Zustand store
3. Install required shadcn components
4. Add route (if needed)
5. Connect to API (if needed)

### Adding Authentication
1. Create auth store with Zustand
2. Set up protected route wrapper
3. Add login/signup forms with shadcn
4. Store token in localStorage via persist
5. Add auth headers to API calls

### Building a Dashboard
1. Create layout with Sidebar + Header
2. Use shadcn Card, Table, Badge components
3. Fetch data with custom hook or React Query
4. Create stat cards and charts
5. Add responsive grid layout

## Troubleshooting

### Common Issues
- **Tailwind not working**: Check `tailwind.config.js` content paths
- **shadcn components not found**: Run `npx shadcn@latest add [component]`
- **Zustand state not persisting**: Verify persist middleware setup
- **Type errors**: Ensure `tsconfig.json` paths are configured

### Debug Tips
- Use React DevTools for component debugging
- Check Zustand DevTools for state inspection
- Verify Vite/Next.js config for path aliases
- Check browser console for hydration errors (Next.js)

## Quick Start Template

When user asks to create a basic frontend:

1. **Clarify framework**: Ask if they want Vite (SPA) or Next.js (SSR)
2. **Create project**: Show setup commands
3. **Install dependencies**: Tailwind, shadcn, Zustand
4. **Set up structure**: Create folders and basic files
5. **Build starter components**: Layout, basic pages
6. **Configure routing**: React Router or App Router
7. **Add first features**: Based on user requirements

## Examples to Suggest

- **Dashboard**: Admin panel with sidebar, stats, tables
- **Landing Page**: Hero, features, pricing sections
- **Auth Flow**: Login, signup, protected routes
- **CRUD App**: List, detail, create, edit views
- **Settings Page**: Form-heavy interface with tabs

## Key Principles

1. **Component Composition**: Build with small, reusable components
2. **Type Safety**: Use TypeScript for everything
3. **State Management**: Keep Zustand stores focused and minimal
4. **Styling**: Leverage Tailwind + shadcn for consistency
5. **Performance**: Code split and lazy load when appropriate
6. **Accessibility**: shadcn components are accessible by default
7. **Developer Experience**: Fast refresh, good error messages

## Response Strategy

When user requests a frontend:

1. **Understand requirements**: What type of app? What features?
2. **Choose framework**: Recommend based on needs (Vite vs Next.js)
3. **Create structure**: Set up folders and boilerplate
4. **Build incrementally**: Start with layout, add features
5. **Show working code**: Provide complete, runnable examples
6. **Explain patterns**: Help user understand the architecture

## Final Notes

- This skill focuses on **modern best practices** (2024-2025)
- Prefer **functional components** and hooks
- Use **shadcn/ui** for UI consistency
- Keep **state management simple** with Zustand
- Always include **TypeScript types**
- Follow **component composition** patterns
- Make it **production-ready** from the start
