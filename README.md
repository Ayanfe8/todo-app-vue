# Todo Application

This project is a full-featured Todo application built with Vue 3 and TypeScript. It demonstrates modern frontend architecture, authentication flows, protected routing, server-state management, and clean UI patterns.

The application allows users to register, log in, and manage their personal tasks through a responsive and user-friendly interface. It follows a feature-based folder structure to improve scalability and maintainability.

The project is a migration of an existing React application and is designed to showcase production-ready Vue 3 development practices.

## Features

### Core Functionality

- **Create, Read, Update, Delete (CRUD)** operations for todos
- **Authentication system** with login and registration
- **Protected routes** for authenticated users via Vue Router navigation guards
- **Responsive design** with mobile-first approach
- **Modern UI (shadcn-vue)** with Tailwind CSS and custom components

### Technical Features

- **Vue 3** with Composition API and `<script setup>` syntax
- **Vue Router 4** for modern routing, nested routes and navigation guards
- **Pinia** for global auth state management replacing React Context
- **TanStack Vue Query** for server state, caching and data fetching
- **vee-validate + Zod** for form validation and type-safe schemas
- **Global error handler** via `app.config.errorHandler` replacing React Error Boundaries
- **Tailwind CSS** for styling with custom design system
- **Responsive design** that works on all devices
- **Production ready** with Vercel deployment

## Architecture

### File Structure

```
src/
├── api/                          # Axios instance and API functions
│   ├── axios.ts                  # Axios configuration with interceptors
│   └── tasks.ts                  # Todo API functions
├── assets/                       # Static assets
├── components/
│   ├── ui/                       # shadcn-vue generated components
│   ├── AppLayout.vue             # Navbar + page wrapper layout
│   ├── AppNavbar.vue             # Navigation bar with auth state
│   ├── ConfirmDialog.vue         # Reusable confirmation dialog
│   └── ErrorState.vue            # Reusable error UI component
├── composables/                  # Shared Vue composables
│   └── useDebounce.ts            # Debounce composable for search input
├── features/
│   └── todoTasks/
│       ├── components/           # Feature-level components
│       │   ├── TodoFilter.vue    # Search and status filter
│       │   └── TodoPagination.vue
│       ├── composables/          # Feature-level composables
│       │   ├── useTodoQueries.ts # TanStack Vue Query hooks
│       │   └── useTodoFilters.ts # Filter and pagination state
│       └── todos/
│           ├── TodoCard.vue      # Single todo card with actions
│           ├── TodoForm.vue      # Create and edit form
│           ├── TodoList.vue      # List of TodoCards
│           └── todoSchema.ts     # Zod validation schema
├── lib/
│   ├── utils.ts                  # cn() utility for class merging
│   └── errors.ts                 # getErrorMessage error utility
├── pages/                        # Route-level page components
│   ├── Home.vue
│   ├── LoginPage.vue
│   ├── RegisterPage.vue
│   ├── Todos.vue
│   ├── TodoDetails.vue
│   ├── NotFound.vue
│   └── ErrorTest.vue
├── router/
│   └── index.ts                  # Vue Router config with navigation guards
├── stores/
│   └── auth.ts                   # Pinia auth store
├── types/
│   └── index.ts                  # Shared TypeScript types
├── App.vue                       # Root component
├── main.ts                       # Application entry point
└── style.css                     # Global styles and Tailwind CSS v4 imports
```

### Key Technologies

- **Vue 3** with Composition API and `<script setup>`
- **TypeScript** throughout
- **Vue Router 4** for routing and navigation guards
- **Pinia** for global state management
- **TanStack Vue Query** for server state and API integration via Axios
- **vee-validate + Zod** for form handling and validation
- **shadcn-vue + Reka UI** for accessible UI components
- **Tailwind CSS v4** for styling
- **Lucide Vue Next** for icons
- **Vercel** for deployment

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd todo-app-vue
   ```

2. **Install dependencies**

   ```bash
   # Using npm
   npm install

   # Using yarn
   yarn install

   # Using pnpm
   pnpm install

   # Using bun
   bun install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Then set your API base URL in `.env.local`:

   ```
   VITE_API_URL=https://your-api-url.com
   ```

4. **Run the development server**

   ```bash
   # Using npm
   npm run dev

   # Using yarn
   yarn dev

   # Using pnpm
   pnpm dev

   # Using bun
   bun dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:5173](http://localhost:5173) to see the application.

## UI Components

### Todo List

- Displays all todos with status indicators
- Search input with debounce
- Status filter dropdown
- Pagination controls
- Edit and delete actions per todo card

### Todo Detail

- Shows complete todo information including description and created date
- Inline edit mode with form validation
- Delete button with confirmation dialog
- Back navigation

### Forms

- Create new todo form on the Todos page
- Edit existing todo form in both inline and modal modes
- Form validation with Zod schemas and vee-validate error messages

### Delete Confirmation

- AlertDialog component for destructive actions on TodoCard
- ConfirmDialog component for delete on TodoDetails page
- Clear warning about permanent deletion

### Authentication Pages

- Login form with email and password validation
- Register form with password confirmation and match validation
- Redirect to intended page after login via query param

## React to Vue Migration Notes

This project was migrated from a React + React Router v7 application. Key pattern changes:

| React | Vue |
|---|---|
| `useState` | `ref` |
| `useMemo` | `computed` |
| `useEffect` | `watch` / `onMounted` |
| React Context + `useAuth` | Pinia store (`useAuthStore`) |
| `ProtectedRoute` component | Vue Router `beforeEach` guard |
| `react-hook-form` | `vee-validate` |
| `ErrorBoundary` class | `app.config.errorHandler` |
| `useNavigate` / `useParams` | `useRouter` / `useRoute` |
| JSX `&&` / `.map()` | `v-if` / `v-for` |
| `children` prop | `<slot />` |
| Custom hooks `use*.ts` | Composables `use*.ts` |

## Development

### Code Style

- **ESLint** for code quality with Vue and TypeScript rules
- **Prettier** for code formatting
- **Tailwind CSS** for styling
- **oxlint** for fast linting

### Available Scripts

```bash
# Start development server
npm run dev

# Type check
npm run type-check

# Lint
npm run lint

# Format
npm run format

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your `VITE_API_URL` environment variable in Vercel project settings
4. Deploy automatically on every push to main