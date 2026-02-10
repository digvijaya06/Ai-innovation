# Coding Conventions and Standards

## Naming Conventions

### Files and Folders

- **Components**: PascalCase - `UserProfile.tsx`, `DashboardCard.tsx`
- **Utilities**: kebab-case - `format-date.ts`, `api-client.ts`
- **Hooks**: camelCase with `use` prefix - `useAuth.ts`, `useFetch.ts`
- **Stores**: kebab-case with `-store` suffix - `user-store.ts`, `ui-store.ts`
- **Types**: kebab-case - `user.ts`, `api-types.ts`
- **Pages**: PascalCase - `Dashboard.tsx`, `Login.tsx`

### Variables and Functions

- **Variables**: camelCase - `userName`, `isLoading`, `userData`
- **Constants**: UPPER_SNAKE_CASE - `API_BASE_URL`, `MAX_RETRIES`
- **Functions**: camelCase - `fetchUser()`, `handleSubmit()`, `formatDate()`
- **React Components**: PascalCase - `UserCard`, `LoginForm`
- **Type/Interface**: PascalCase - `User`, `ApiResponse`, `ButtonProps`

### Event Handlers

Prefix with `handle`: `handleClick`, `handleSubmit`, `handleChange`

```typescript
function LoginForm() {
  const handleSubmit = (e: FormEvent) => { /* ... */ }
  const handleInputChange = (e: ChangeEvent) => { /* ... */ }
  
  return <form onSubmit={handleSubmit}>...</form>
}
```

## TypeScript Standards

### Always Define Types

**Never use `any`**. Define proper types for everything:

```typescript
// ❌ Bad
function fetchData(id: any): any {
  return fetch(`/api/${id}`).then(res => res.json())
}

// ✅ Good
interface User {
  id: string
  name: string
  email: string
}

async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`)
  return response.json()
}
```

### Component Props

Always define props interface:

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  children: React.ReactNode
}

export function Button({ variant = 'primary', size = 'md', onClick, children }: ButtonProps) {
  // Component implementation
}
```

### Export Types

Export types from component files for reuse:

```typescript
export interface UserCardProps {
  user: User
  onEdit?: (user: User) => void
}

export function UserCard({ user, onEdit }: UserCardProps) {
  // Implementation
}
```

## Component Structure

### Functional Components

Always use functional components with hooks:

```typescript
import { useState, useEffect } from 'react'

export function ComponentName() {
  // 1. Hooks
  const [state, setState] = useState()
  const store = useStore()
  
  // 2. Effects
  useEffect(() => {
    // Side effects
  }, [])
  
  // 3. Handlers
  const handleClick = () => {
    // Handle event
  }
  
  // 4. Render helpers (if needed)
  const renderItem = (item) => { /* ... */ }
  
  // 5. Return JSX
  return (
    <div>
      {/* Component markup */}
    </div>
  )
}
```

### Component Organization

Group by feature, not by type:

```
✅ Good:
components/
├── features/
│   ├── user-profile/
│   │   ├── UserProfile.tsx
│   │   ├── UserAvatar.tsx
│   │   └── UserSettings.tsx
│   └── dashboard/
│       ├── Dashboard.tsx
│       ├── StatsCard.tsx
│       └── ActivityFeed.tsx

❌ Bad:
components/
├── cards/
├── forms/
└── buttons/
```

## State Management

### Zustand Store Pattern

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface StoreState {
  // State
  data: DataType | null
  isLoading: boolean
  
  // Actions
  setData: (data: DataType) => void
  fetchData: () => Promise<void>
  reset: () => void
}

export const useStoreName = create<StoreState>()(
  persist(
    (set, get) => ({
      // Initial state
      data: null,
      isLoading: false,
      
      // Actions
      setData: (data) => set({ data }),
      
      fetchData: async () => {
        set({ isLoading: true })
        try {
          const data = await apiCall()
          set({ data, isLoading: false })
        } catch (error) {
          set({ isLoading: false })
        }
      },
      
      reset: () => set({ data: null, isLoading: false }),
    }),
    {
      name: 'store-name',
    }
  )
)
```

### Store Naming

- Prefix with `use`: `useUserStore`, `useUIStore`
- Domain-focused: One store per domain (user, ui, cart, etc.)
- Keep stores small and focused

## Styling Conventions

### Tailwind CSS

- Use Tailwind utilities first
- Create custom classes only when needed
- Use `cn()` utility for conditional classes

```typescript
import { cn } from '@/lib/utils'

function Button({ variant, className }: ButtonProps) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-md font-medium transition-colors',
        variant === 'primary' && 'bg-primary text-primary-foreground',
        variant === 'secondary' && 'bg-secondary text-secondary-foreground',
        className
      )}
    >
      {children}
    </button>
  )
}
```

### Responsive Design

Use Tailwind breakpoints consistently:

```typescript
<div className="
  grid 
  grid-cols-1 
  md:grid-cols-2 
  lg:grid-cols-3 
  gap-4
">
```

## Import Organization

Order imports consistently:

```typescript
// 1. React and external libraries
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// 2. UI components
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// 3. Internal components
import { Header } from '@/components/layout/Header'
import { UserCard } from '@/components/features/UserCard'

// 4. Stores and hooks
import { useUserStore } from '@/stores/user-store'
import { useAuth } from '@/hooks/useAuth'

// 5. Utilities and types
import { cn } from '@/lib/utils'
import { User } from '@/types/user'

// 6. Styles (if any)
import './styles.css'
```

## Error Handling

### API Calls

Always handle errors properly:

```typescript
async function fetchData() {
  try {
    const response = await fetch('/api/data')
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch data:', error)
    throw error
  }
}
```

### Forms

Use React Hook Form with Zod validation:

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

function LoginForm() {
  const form = useForm({
    resolver: zodResolver(schema),
  })
  
  // Form implementation
}
```

## Comments

### When to Comment

- **Complex logic**: Explain WHY, not WHAT
- **Workarounds**: Document why a workaround is needed
- **TODO items**: Mark future improvements
- **Type definitions**: Document complex types

```typescript
// ✅ Good - Explains WHY
// Using setTimeout to avoid React state update warning
// when component unmounts during async operation
setTimeout(() => setState(data), 0)

// ❌ Bad - Explains WHAT (code is self-evident)
// Set the state to data
setState(data)
```

### JSDoc for Complex Functions

```typescript
/**
 * Fetches user data with automatic retry on failure
 * @param userId - The unique identifier for the user
 * @param options - Optional configuration for retry behavior
 * @returns Promise resolving to User object
 * @throws {ApiError} When all retry attempts fail
 */
async function fetchUserWithRetry(
  userId: string,
  options?: { maxRetries?: number }
): Promise<User> {
  // Implementation
}
```

## Performance

### Lazy Loading

Use lazy loading for code splitting:

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

### Memoization

Use useMemo and useCallback wisely (only when needed):

```typescript
// ✅ Good - Expensive calculation
const sortedUsers = useMemo(
  () => users.sort((a, b) => a.name.localeCompare(b.name)),
  [users]
)

// ❌ Bad - Unnecessary memoization
const fullName = useMemo(() => `${firstName} ${lastName}`, [firstName, lastName])
```

## Git Commit Messages

Follow conventional commits:

```
feat: add user profile page
fix: resolve login button color issue
docs: update API_ENDPOINTS.md with new endpoints
refactor: extract form validation to custom hook
chore: update dependencies
```

## Testing (When Implemented)

### Component Tests

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
  
  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    fireEvent.click(screen.getByText('Click'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

## Accessibility

- Use semantic HTML elements
- Include proper ARIA labels
- Ensure keyboard navigation works
- shadcn components are accessible by default

```typescript
<button
  aria-label="Close dialog"
  onClick={handleClose}
>
  <X className="h-4 w-4" />
</button>
```
