# Component Registry

**Last Updated**: 2026-02-07  
**Total Components**: 0

> [!NOTE]
> This is a living document. Update this file whenever components are added, modified, or removed.

---

## Table of Contents

1. [UI Components](#ui-components) - shadcn/ui components
2. [Layout Components](#layout-components) - Headers, Sidebars, Footers
3. [Feature Components](#feature-components) - Business logic components

---

## UI Components

**Location**: `src/components/ui/`  
**Total**: 0  
**Auto-generated**: Yes (via shadcn CLI)

> [!IMPORTANT]
> UI components are installed on-demand using `npx shadcn@latest add [component]`  
> DO NOT manually edit these files unless customizing

### Installing UI Components

```bash
# Common components
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add form
npx shadcn@latest add dialog
npx shadcn@latest add table
npx shadcn@latest add badge
```

### Installed Components

No components installed yet. Update this section when shadcn components are added.

---

## Layout Components

**Location**: `src/components/layout/`  
**Total**: 0

Layout components provide the structural foundation for pages.

### Components

No layout components created yet.

<!-- 
TEMPLATE FOR ADDING LAYOUT COMPONENTS:

### ComponentName

**File**: [ComponentName.tsx](file:///c:/Users/dimple/OneDrive/Desktop/Ai%20Innovation/src/components/layout/ComponentName.tsx)  
**Purpose**: Brief description

#### Props

```typescript
interface ComponentNameProps {
  prop1: string
  prop2?: number
  children?: React.ReactNode
}
```

#### Usage

```typescript
import { ComponentName } from '@/components/layout/ComponentName'

<ComponentName prop1="value">
  Children content
</ComponentName>
```

#### Dependencies
- List of external dependencies or other components used

---
-->

---

## Feature Components

**Location**: `src/components/features/`  
**Total**: 0

Feature components contain business logic and are organized by feature domain.

### Organization Pattern

```
features/
├── [feature-name]/
│   ├── FeatureComponent.tsx
│   ├── SubComponent.tsx
│   └── index.ts
```

### Components

No feature components created yet.

<!--
TEMPLATE FOR ADDING FEATURE COMPONENTS:

### Feature: FeatureName

**Location**: `src/components/features/feature-name/`

#### ComponentName

**File**: [ComponentName.tsx](file:///c:/Users/dimple/OneDrive/Desktop/Ai%20Innovation/src/components/features/feature-name/ComponentName.tsx)  
**Purpose**: Brief description

##### Props

```typescript
interface ComponentNameProps {
  data: DataType
  onAction?: (id: string) => void
}
```

##### State Dependencies
- List Zustand stores used: `useUserStore`, `useUIStore`, etc.

##### Usage

```typescript
import { ComponentName } from '@/components/features/feature-name'

function Parent() {
  const handleAction = (id: string) => { /* ... */ }
  
  return <ComponentName data={myData} onAction={handleAction} />
}
```

##### Key Features
- Feature 1
- Feature 2

---
-->

---

## Component Guidelines

### When to Create a Component

- **Reusability**: Used in 2+ places
- **Complexity**: More than 50 lines of JSX
- **Single Responsibility**: Has one clear purpose
- **Testability**: Needs isolated testing

### Component Checklist

When creating a new component:

- [ ] Create TypeScript interface for props
- [ ] Add JSDoc comments for complex props
- [ ] Export the component
- [ ] Add entry to this registry
- [ ] Update `PROJECT_METADATA.json` component count
- [ ] Follow naming conventions from `.agent/CONVENTIONS.md`

### Naming Conventions

- **File**: PascalCase matching component name - `UserProfile.tsx`
- **Component**: PascalCase - `UserProfile`
- **Props Interface**: PascalCase with `Props` suffix - `UserProfileProps`

### Example Component Template

```typescript
// src/components/features/user/UserCard.tsx
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { User } from '@/types/user'

/**
 * Displays user information in a card format
 */
interface UserCardProps {
  /** User object to display */
  user: User
  /** Optional callback when edit is clicked */
  onEdit?: (user: User) => void
  /** Optional custom CSS classes */
  className?: string
}

export function UserCard({ user, onEdit, className }: UserCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <h3 className="text-lg font-semibold">{user.name}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{user.email}</p>
        {onEdit && (
          <button onClick={() => onEdit(user)}>Edit</button>
        )}
      </CardContent>
    </Card>
  )
}
```

---

## Related Documentation

- [PROJECT_ARCHITECTURE.md](file:///c:/Users/dimple/OneDrive/Desktop/Ai%20Innovation/PROJECT_ARCHITECTURE.md) - Overall architecture
- [STATE_MANAGEMENT.md](file:///c:/Users/dimple/OneDrive/Desktop/Ai%20Innovation/STATE_MANAGEMENT.md) - Zustand stores
- [.agent/CONVENTIONS.md](file:///c:/Users/dimple/OneDrive/Desktop/Ai%20Innovation/.agent/CONVENTIONS.md) - Coding standards
- [PROJECT_METADATA.json](file:///c:/Users/dimple/OneDrive/Desktop/Ai%20Innovation/PROJECT_METADATA.json) - Machine-readable metadata

---

## Update Instructions

When updating this file:

1. **Add Component**: Copy the template, fill in details
2. **Update Counts**: Update total counts at top of each section
3. **Update Metadata**: Increment counts in `PROJECT_METADATA.json`
4. **Update Timestamp**: Change "Last Updated" date at top
5. **Link Files**: Use proper file links for navigation
