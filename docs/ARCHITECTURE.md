# Architecture

## High Level structure

We use a **Feature-based** architecture.

```
src/
  app/          # Global app configuration
    router/     # Route definitions
    providers/  # Context providers (i18n, etc.)
  
  shared/       # Reusable code used across features
    ui/         # Dumb UI components (Button, Card, Input)
    lib/        # Utilities (cn, date formatting)
    hooks/      # Shared hooks
    styles/     # Global styles

  features/     # Business logic grouped by feature
    blog/
      pages/        # Page components (BlogList, BlogDetails)
      components/   # Feature-specific components
      domain/       # Pure business logic (filter, sort)
      data/         # Data fetching (Repositories)
      state/        # UI State (Zustand)

  data/         # Static data files (posts.json)
  pages/        # Page assembly / Route composition
```

## Patterns

### Repository Pattern
Data access is abstracted behind repositories to allow switching between local JSON and API.

- `BlogRepository` (Interface)
- `BlogJsonRepository` (Implementation for Phase 1)
- `BlogApiRepository` (Future Implementation)

### Domain Logic
Business logic (filtering, searching, pagination) should be **pure functions** in `features/*/domain`. 
They take data as input and return transformed data, without side effects.

### State Management
- **Global Server State**: Managed via Repositories (and eventually generic async state or React Query if needed).
- **Local UI State**: `Zustand` for complex page state (e.g., Blog List filters/pagination).
