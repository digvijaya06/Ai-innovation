# API Endpoints Documentation

**Last Updated**: 2026-02-07  
**Total Endpoints**: 0  
**Base URL**: Not configured

> [!NOTE]
> This document tracks all API endpoints used in the application. Update when endpoints are added or modified.

---

## Table of Contents

1. [Configuration](#configuration)
2. [Authentication](#authentication)
3. [Endpoints](#endpoints)
4. [Error Handling](#error-handling)
5. [Type Definitions](#type-definitions)

---

## Configuration

### Environment Variables

Configure API base URL in `.env`:

```env
VITE_API_URL=https://api.example.com
VITE_API_TIMEOUT=30000
```

Access in code:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL
```

### API Client Setup

**Location**: `src/lib/api-client.ts` (to be created)

```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

interface RequestConfig extends RequestInit {
  timeout?: number
}

export async function apiRequest<T>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<T> {
  const { timeout = 30000, ...options } = config
  
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })
    
    clearTimeout(timeoutId)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    clearTimeout(timeoutId)
    throw error
  }
}
```

---

## Authentication

## Authentication Endpoints

No authentication endpoints configured yet.

<!--
TEMPLATE FOR AUTH ENDPOINTS:

### Login

**Endpoint**: `POST /auth/login`  
**Authentication**: None (this is the login endpoint)

#### Request

```typescript
interface LoginRequest {
  email: string
  password: string
}
```

```typescript
const response = await apiRequest<LoginResponse>('/auth/login', {
  method: 'POST',
  body: JSON.stringify({ email, password })
})
```

#### Response

```typescript
interface LoginResponse {
  user: User
  token: string
  expiresAt: string
}
```

#### Example

```typescript
import { useUserStore } from '@/stores/user-store'

async function login(email: string, password: string) {
  const data = await apiRequest<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  })
  
  useUserStore.getState().setUser(data.user)
  localStorage.setItem('token', data.token)
  
  return data
}
```

#### Errors

| Status | Error | Description |
|--------|-------|-------------|
| 400 | `INVALID_CREDENTIALS` | Email or password is incorrect |
| 429 | `TOO_MANY_REQUESTS` | Rate limit exceeded |
-->

### Authentication Headers

When authenticated, include token in headers:

```typescript
const token = localStorage.getItem('token')

const response = await apiRequest<Data>('/api/protected', {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
```

---

## Endpoints

No endpoints documented yet. Add endpoints below as they are integrated.

<!--
TEMPLATE FOR DOCUMENTING ENDPOINTS:

### Endpoint Name

**Endpoint**: `METHOD /path/to/endpoint`  
**Authentication**: Required/Optional/None  
**Added**: YYYY-MM-DD

#### Description

Brief description of what this endpoint does.

#### Request

**URL Parameters**:
- `id` (string, required) - Description

**Query Parameters**:
- `page` (number, optional) - Page number, default: 1
- `limit` (number, optional) - Items per page, default: 10

**Body** (if applicable):

```typescript
interface RequestBody {
  field1: string
  field2: number
}
```

#### Response

```typescript
interface ResponseBody {
  data: DataType[]
  total: number
  page: number
}
```

#### Usage Example

```typescript
import { apiRequest } from '@/lib/api-client'

async function fetchData(id: string, page = 1) {
  const data = await apiRequest<ResponseBody>(
    `/api/resource/${id}?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  
  return data
}
```

#### Error Responses

| Status | Error Code | Description |
|--------|------------|-------------|
| 400 | `VALIDATION_ERROR` | Invalid request data |
| 401 | `UNAUTHORIZED` | Missing or invalid token |
| 404 | `NOT_FOUND` | Resource not found |
| 500 | `INTERNAL_ERROR` | Server error |

#### Notes

- Any special considerations
- Rate limiting information
- Caching behavior

---
-->

---

## Error Handling

### Standard Error Response

All endpoints return errors in this format:

```typescript
interface ApiError {
  error: {
    code: string
    message: string
    details?: Record<string, unknown>
  }
}
```

### Error Handler Utility

```typescript
// src/lib/api-error-handler.ts
export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public details?: Record<string, unknown>
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export async function handleApiError(response: Response): Promise<never> {
  const error = await response.json().catch(() => ({
    error: {
      code: 'UNKNOWN_ERROR',
      message: response.statusText
    }
  }))
  
  throw new ApiError(
    response.status,
    error.error.code,
    error.error.message,
    error.error.details
  )
}
```

### Using Error Handler

```typescript
try {
  const data = await apiRequest<Data>('/api/endpoint')
  return data
} catch (error) {
  if (error instanceof ApiError) {
    // Handle specific error codes
    if (error.code === 'UNAUTHORIZED') {
      // Redirect to login
      window.location.href = '/login'
    } else if (error.code === 'VALIDATION_ERROR') {
      // Show validation errors
      console.error(error.details)
    }
  }
  throw error
}
```

---

## Type Definitions

### Common Types

Create shared types in `src/types/api.ts`:

```typescript
// src/types/api.ts

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface ApiSuccess<T> {
  data: T
  message?: string
}

export interface ApiError {
  error: {
    code: string
    message: string
    details?: Record<string, unknown>
  }
}
```

### Usage with apiRequest

```typescript
import { apiRequest } from '@/lib/api-client'
import { PaginatedResponse } from '@/types/api'
import { User } from '@/types/user'

async function fetchUsers(page: number) {
  return apiRequest<PaginatedResponse<User>>(
    `/api/users?page=${page}`
  )
}
```

---

## API Integration Patterns

### Store Integration

Integrate API calls in Zustand stores:

```typescript
// src/stores/user-store.ts
import { create } from 'zustand'
import { apiRequest } from '@/lib/api-client'
import { User } from '@/types/user'

interface UserState {
  users: User[]
  isLoading: boolean
  error: Error | null
  fetchUsers: () => Promise<void>
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  isLoading: false,
  error: null,
  
  fetchUsers: async () => {
    set({ isLoading: true, error: null })
    try {
      const data = await apiRequest<User[]>('/api/users')
      set({ users: data, isLoading: false })
    } catch (error) {
      set({ error: error as Error, isLoading: false })
    }
  }
}))
```

### Custom Hook Pattern

Create reusable API hooks:

```typescript
// src/hooks/use-api.ts
import { useState, useEffect } from 'react'
import { apiRequest } from '@/lib/api-client'

export function useApi<T>(endpoint: string, options?: RequestInit) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  
  useEffect(() => {
    apiRequest<T>(endpoint, options)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [endpoint])
  
  return { data, loading, error }
}

// Usage
function UserList() {
  const { data, loading, error } = useApi<User[]>('/api/users')
  
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return <div>{data?.map(user => <div key={user.id}>{user.name}</div>)}</div>
}
```

---

## Best Practices

### ✅ Do

- **Use TypeScript types** for all requests/responses
- **Handle errors** appropriately
- **Store tokens securely** (httpOnly cookies preferred)
- **Implement retry logic** for transient failures
- **Use loading states** in UI
- **Document all endpoints** in this file
- **Use environment variables** for API URLs

### ❌ Don't

- **Store sensitive data** in localStorage
- **Ignore error responses**
- **Make API calls** in component render
- **Hardcode API URLs**
- **Use `any` type** for responses
- **Skip authentication** checks

---

## Testing API Calls

### Mocking API Responses

```typescript
// Mock apiRequest for testing
vi.mock('@/lib/api-client', () => ({
  apiRequest: vi.fn()
}))

// In test
import { apiRequest } from '@/lib/api-client'

it('fetches users successfully', async () => {
  const mockUsers = [{ id: '1', name: 'Test User' }]
  vi.mocked(apiRequest).mockResolvedValue(mockUsers)
  
  const users = await fetchUsers()
  expect(users).toEqual(mockUsers)
})
```

---

## Related Documentation

- [PROJECT_ARCHITECTURE.md](file:///c:/Users/dimple/OneDrive/Desktop/Ai%20Innovation/PROJECT_ARCHITECTURE.md) - Overall architecture
- [STATE_MANAGEMENT.md](file:///c:/Users/dimple/OneDrive/Desktop/Ai%20Innovation/STATE_MANAGEMENT.md) - Zustand stores
- [.agent/CONVENTIONS.md](file:///c:/Users/dimple/OneDrive/Desktop/Ai%20Innovation/.agent/CONVENTIONS.md) - Coding standards
- [PROJECT_METADATA.json](file:///c:/Users/dimple/OneDrive/Desktop/Ai%20Innovation/PROJECT_METADATA.json) - Machine-readable metadata

---

## Update Instructions

When adding/modifying an endpoint:

1. **Document Endpoint**: Use template above
2. **Update Count**: Change total endpoints at top
3. **Add Types**: Define TypeScript interfaces
4. **Update Timestamp**: Change "Last Updated" date
5. **Test Integration**: Verify endpoint works as documented
