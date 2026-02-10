# State Management Documentation

**Last Updated**: 2026-02-07  
**State Library**: Zustand 4.x  
**Total Stores**: 0

> [!NOTE]
> This document tracks all Zustand stores in the application. Update when stores are added, modified, or removed.

---

## Table of Contents

1. [Overview](#overview)
2. [Store Architecture](#store-architecture)
3. [Active Stores](#active-stores)
4. [Usage Patterns](#usage-patterns)
5. [Best Practices](#best-practices)

---

## Overview

This application uses **Zustand** for lightweight, focused state management. Each store is responsible for a single domain of state (user, UI, data, etc.).

### Why Zustand?

- **Lightweight**: Minimal boilerplate
- **Type-safe**: Full TypeScript support
- **DevTools**: Built-in Redux DevTools support
- **Middleware**: Persist, immer, and custom middleware
- **Simple API**: Easy to learn and use

### Store Principles

1. **Single Domain**: One store per logical domain
2. **Minimal State**: Only global state, not local component state
3. **Type Safety**: Full TypeScript interfaces
4. **Immutability**: Use immer middleware for complex updates
5. **Persistence**: Use persist middleware for localStorage

---

## Store Architecture

### Store Location

All stores are located in `src/stores/` with naming pattern: `[domain]-store.ts`

### Standard Store Pattern

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface StoreState {
  // State properties
  data: DataType | null
  isLoading: boolean
  error: Error | null
  
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
      error: null,
      
      // Actions
      setData: (data) => set({ data }),
      
      fetchData: async () => {
        set({ isLoading: true, error: null })
        try {
          const response = await fetch('/api/data')
          const data = await response.json()
          set({ data, isLoading: false })
        } catch (error) {
          set({ error: error as Error, isLoading: false })
        }
      },
      
      reset: () => set({ data: null, isLoading: false, error: null }),
    }),
    {
      name: 'store-name-storage', // localStorage key
      partialize: (state) => ({ data: state.data }), // Only persist data
    }
  )
)
```

---

## Active Stores

No stores created yet. Add stores below as they are implemented.

<!--
TEMPLATE FOR DOCUMENTING STORES:

### StoreName Store

**File**: [store-name-store.ts](file:///c:/Users/dimple/OneDrive/Desktop/Ai%20Innovation/src/stores/store-name-store.ts)  
**Domain**: Description of what this store manages  
**Persisted**: Yes/No  
**Created**: YYYY-MM-DD

#### State Shape

```typescript
interface StoreNameState {
  property1: Type
  property2: Type
  // ... other properties
  
  // Actions
  action1: (param: Type) => void
  action2: () => Promise<void>
}
```

#### State Properties

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `property1` | `Type` | Description | `null` |
| `property2` | `Type` | Description | `false` |

#### Actions

| Action | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `action1` | `param: Type` | `void` | What it does |
| `action2` | none | `Promise<void>` | What it does |

#### Usage Example

```typescript
import { useStoreName } from '@/stores/store-name-store'

function Component() {
  // Select specific state
  const property1 = useStoreName((state) => state.property1)
  const action1 = useStoreName((state) => state.action1)
  
  // Or select multiple
  const { property1, property2, action1 } = useStoreName()
  
  // Use in component
  useEffect(() => {
    action1(value)
  }, [])
  
  return <div>{property1}</div>
}
```

#### Persistence

- **Enabled**: Yes/No
- **Key**: `store-name-storage`
- **Persisted Fields**: List fields that are persisted
- **Excluded Fields**: List fields not persisted

#### Dependencies

- List external APIs, services, or other stores this depends on

---
-->

---

## Usage Patterns

### Selecting State

**Prefer selector functions** for better performance:

```typescript
// ✅ Good - Only re-renders when user changes
const user = useUserStore((state) => state.user)

// ❌ Bad - Re-renders on any store change
const { user } = useUserStore()
```

### Selecting Multiple Values

```typescript
// ✅ Good - Shallow equality check
const { user, isLoading } = useUserStore(
  (state) => ({ user: state.user, isLoading: state.isLoading }),
  shallow
)

// Or use multiple selectors
const user = useUserStore((state) => state.user)
const isLoading = useUserStore((state) => state.isLoading)
```

### Calling Actions

```typescript
function LoginForm() {
  const setUser = useUserStore((state) => state.setUser)
  const login = useUserStore((state) => state.login)
  
  const handleSubmit = async (data) => {
    await login(data.email, data.password)
  }
  
  return <form onSubmit={handleSubmit}>...</form>
}
```

### Outside React Components

```typescript
// Access store outside components
import { useUserStore } from '@/stores/user-store'

function apiClient() {
  const user = useUserStore.getState().user
  const token = user?.token
  
  return fetch('/api/data', {
    headers: { Authorization: `Bearer ${token}` }
  })
}
```

---

## Best Practices

### ✅ Do

- **One store per domain** (user, ui, cart, etc.)
- **Colocate actions and state** in same store
- **Use TypeScript interfaces** for type safety
- **Use selectors** for better performance
- **Use persist middleware** for localStorage sync
- **Keep stores focused** and minimal
- **Document store purpose** in this file

### ❌ Don't

- **Store server data** (use React Query/SWR instead)
- **Store form state** (use React Hook Form)
- **Store local component state** (use useState)
- **Create huge monolithic stores** (split by domain)
- **Mutate state directly** (use immer if needed)
- **Store derived state** (compute in selectors)

### When to Create a New Store

Create a new store when:
- State is needed across **multiple routes/components**
- State needs to **persist** across page refreshes
- State represents a **logical domain** (user, UI, cart)

Use local state when:
- State is **only needed in one component**
- State is **temporary** (form inputs, toggles)
- State is **derived** from other state

---

## Middleware

### Persist Middleware

Automatically sync state to localStorage:

```typescript
import { persist } from 'zustand/middleware'

export const useStore = create<State>()(
  persist(
    (set) => ({ /* state */ }),
    {
      name: 'storage-key',
      partialize: (state) => ({ 
        // Only persist specific fields
        user: state.user 
      }),
    }
  )
)
```

### Immer Middleware

For complex nested state updates:

```typescript
import { immer } from 'zustand/middleware/immer'

export const useStore = create<State>()(
  immer((set) => ({
    nested: { deep: { value: 0 } },
    increment: () => set((state) => {
      // Mutate state directly with immer
      state.nested.deep.value += 1
    }),
  }))
)
```

### DevTools Middleware

Enable Redux DevTools:

```typescript
import { devtools } from 'zustand/middleware'

export const useStore = create<State>()(
  devtools(
    (set) => ({ /* state */ }),
    { name: 'Store Name' }
  )
)
```

---

## Testing Stores

### Unit Testing Pattern

```typescript
import { renderHook, act } from '@testing-library/react'
import { useUserStore } from './user-store'

describe('useUserStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useUserStore.setState(useUserStore.getState().reset())
  })
  
  it('sets user correctly', () => {
    const { result } = renderHook(() => useUserStore())
    
    act(() => {
      result.current.setUser({ id: '1', name: 'Test' })
    })
    
    expect(result.current.user).toEqual({ id: '1', name: 'Test' })
  })
})
```

---

## Performance Optimization

### Selector Best Practices

```typescript
// ✅ Efficient - Only subscribes to specific field
const userName = useUserStore((state) => state.user?.name)

// ❌ Inefficient - Subscribes to entire user object
const user = useUserStore((state) => state.user)
const userName = user?.name
```

### Computed Values

Create derived selectors:

```typescript
// In store file
const useUserStore = create<UserState>((set, get) => ({
  // ... state
}))

// Derived selector
export const useIsLoggedIn = () => 
  useUserStore((state) => state.user !== null)

// Usage
function Component() {
  const isLoggedIn = useIsLoggedIn()
  return <div>{isLoggedIn ? 'Logged in' : 'Guest'}</div>
}
```

---

## Related Documentation

- [PROJECT_ARCHITECTURE.md](file:///c:/Users/dimple/OneDrive/Desktop/Ai%20Innovation/PROJECT_ARCHITECTURE.md) - Overall architecture
- [COMPONENT_REGISTRY.md](file:///c:/Users/dimple/OneDrive/Desktop/Ai%20Innovation/COMPONENT_REGISTRY.md) - Component documentation
- [.agent/CONVENTIONS.md](file:///c:/Users/dimple/OneDrive/Desktop/Ai%20Innovation/.agent/CONVENTIONS.md) - Coding standards
- [PROJECT_METADATA.json](file:///c:/Users/dimple/OneDrive/Desktop/Ai%20Innovation/PROJECT_METADATA.json) - Machine-readable metadata

---

## Update Instructions

When adding/modifying a store:

1. **Create/Edit Store**: Add file in `src/stores/`
2. **Document Here**: Use template above to document the store
3. **Update Count**: Change total stores count at top
4. **Update Metadata**: Increment store count in `PROJECT_METADATA.json`
5. **Update Timestamp**: Change "Last Updated" date
