# AI Innovation Project

A modern React application with comprehensive AI-friendly documentation and living architecture metadata.

## 🚀 Quick Start

This project is set up with **living documentation** that AI agents can read and update. All architecture and metadata is tracked in dedicated files.

### Prerequisites

- **Node.js** 18+ and npm
- Text editor (VS Code recommended)

### Initial Setup

```bash
# Create Vite + React + TypeScript project
npm create vite@latest . -- --template react-ts

# Install dependencies
npm install

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install shadcn/ui
npx shadcn@latest init

# Install additional dependencies
npm install zustand react-router-dom

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see your app.

---

## 📁 Project Structure

```
Ai Innovation/
├── .agent/                      # 🤖 AI agent guidance
│   ├── README.md               # Navigation guide for AI
│   ├── CONVENTIONS.md          # Coding standards
│   └── project-structure.json  # Machine-readable structure
│
├── src/                        # Source code
│   ├── components/
│   │   ├── ui/                # shadcn components
│   │   ├── layout/            # Layout components
│   │   └── features/          # Feature components
│   ├── stores/                # Zustand state stores
│   ├── pages/                 # Route components
│   ├── lib/                   # Utilities
│   ├── hooks/                 # Custom hooks
│   └── types/                 # TypeScript types
│
├── PROJECT_ARCHITECTURE.md    # 📐 Architecture documentation
├── PROJECT_METADATA.json      # 📊 Machine-readable metadata
├── COMPONENT_REGISTRY.md      # 🧩 Component catalog
├── STATE_MANAGEMENT.md        # 🗄️ Store documentation
├── API_ENDPOINTS.md           # 🌐 API documentation
└── vite-nextjs-frontend-SKILL.md  # 📚 Development patterns
```

---

## 📖 Documentation

This project maintains **living documentation** that should be updated as the project evolves:

| Document | Purpose | When to Update |
|----------|---------|----------------|
| [`PROJECT_ARCHITECTURE.md`](./PROJECT_ARCHITECTURE.md) | High-level architecture, tech stack, folder structure | When structure changes |
| [`PROJECT_METADATA.json`](./PROJECT_METADATA.json) | Machine-readable counts and versions | When adding components/stores/routes |
| [`COMPONENT_REGISTRY.md`](./COMPONENT_REGISTRY.md) | Catalog of all components | When creating components |
| [`STATE_MANAGEMENT.md`](./STATE_MANAGEMENT.md) | Zustand store documentation | When creating stores |
| [`API_ENDPOINTS.md`](./API_ENDPOINTS.md) | API integration docs | When adding API calls |
| [`.agent/CONVENTIONS.md`](./.agent/CONVENTIONS.md) | Coding standards | Rarely (only for new conventions) |

---

## 🤖 For AI Agents

If you're an AI agent working on this project:

1. **Start here**: Read [`.agent/README.md`](./.agent/README.md)
2. **Understand architecture**: Review [`PROJECT_ARCHITECTURE.md`](./PROJECT_ARCHITECTURE.md)
3. **Check metadata**: Look at [`PROJECT_METADATA.json`](./PROJECT_METADATA.json)
4. **Follow conventions**: Adhere to [`.agent/CONVENTIONS.md`](./.agent/CONVENTIONS.md)
5. **Update docs**: Keep living documentation current!

### When Making Changes:

- ✅ **Add component** → Update `COMPONENT_REGISTRY.md` + `PROJECT_METADATA.json`
- ✅ **Create store** → Update `STATE_MANAGEMENT.md` + `PROJECT_METADATA.json`
- ✅ **Add route** → Update `PROJECT_ARCHITECTURE.md` routing section + `PROJECT_METADATA.json`
- ✅ **Integrate API** → Update `API_ENDPOINTS.md`

---

## 🛠️ Technology Stack

- **Framework**: Vite 6.x
- **UI Library**: React 18.x
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 3.x
- **Components**: shadcn/ui
- **State**: Zustand 4.x
- **Routing**: React Router 6.x

---

## 📦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

---

## 🎨 Adding shadcn Components

shadcn/ui components are installed on-demand:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add form
npx shadcn@latest add dialog
```

Components are added to `src/components/ui/` and are yours to customize.

---

## 🔧 Development Workflow

### Creating a New Feature

1. Create components in `src/components/features/[feature-name]/`
2. Create Zustand store if needed in `src/stores/`
3. Create page component in `src/pages/`
4. Add route in `App.tsx`
5. **Update documentation** (`COMPONENT_REGISTRY.md`, `PROJECT_METADATA.json`, etc.)

### Naming Conventions

- **Components**: `PascalCase` - `UserProfile.tsx`
- **Stores**: `kebab-case` - `user-store.ts`
- **Utilities**: `kebab-case` - `format-date.ts`
- **Hooks**: `camelCase` - `useAuth.ts`

See [`.agent/CONVENTIONS.md`](./.agent/CONVENTIONS.md) for full conventions.

---

## 🚀 Deployment

This Vite app can be deployed to:

- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**
- Any static hosting service

Build production bundle:

```bash
npm run build
```

Output will be in `dist/` directory.

---

## 📝 Environment Variables

Create `.env` file:

```env
VITE_API_URL=https://api.example.com
VITE_APP_NAME=AI Innovation
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

---

## 🤝 Contributing

When contributing to this project:

1. Follow conventions in [`.agent/CONVENTIONS.md`](./.agent/CONVENTIONS.md)
2. Update living documentation after changes
3. Use TypeScript for all code
4. Test locally before committing

---

## 📚 Learn More

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Router](https://reactrouter.com/)

---

## 📄 License

This project is open source and available under the MIT License.
