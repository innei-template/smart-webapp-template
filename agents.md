# agents.md

Guidance for AI code agents working in this repository. This document codifies project-specific rules, patterns, and safe operations. When in doubt or on conflict, prefer the actual codebase.

Scope:

- Stack: Vite + React 19 + TypeScript, TailwindCSS v4, Radix UI, Jotai, TanStack Query, Framer Motion (LazyMotion), React Router with vite-plugin-route-builder.
- Package manager: pnpm (required). See package.json for script names and versions.

Core commands:

- Development: pnpm dev
- Build: pnpm build
- Preview: pnpm serve
- Lint: pnpm lint
- Format: pnpm format

Repository rules (must follow):

- Never edit auto-generated files (e.g., src/generated-routes.ts). Add/rename files under src/pages/ to affect routing.
- Use the path alias ~/ for all src imports (configured in tsconfig).
- Use Framer Motion’s LazyMotion with m._ components only. Do not use motion._ directly.
- Prefer Spring presets from ~/lib/spring for animations.
- Use the Pastel color system classes instead of raw Tailwind colors.
- Follow component organization:
  - Base UI primitives -> src/components/ui/
  - App-shared (non-domain) -> src/components/common/
  - Feature/domain modules -> src/modules/<domain>/
- State management via Jotai with helpers from ~/lib/jotai. Atoms live in src/atoms/.
- Do not rely on the global location object. Use the stable router utilities (~/atoms/route) or React Router hooks through the StableRouterProvider.
- Keep JSX self-closing where applicable; adhere to eslint-config-hyoban and Prettier settings.

Routing and layouts:

- File-based routing via vite-plugin-route-builder.
  - Sync routes: \*.sync.tsx (no code-splitting)
  - Async routes: \*.tsx (lazy loaded)
  - Layout files: layout.tsx within a segment; render children via <Outlet />
- Example segment structure (do not edit src/generated-routes.ts directly):
  - src/pages/(main)/index.sync.tsx -> root route
  - src/pages/(main)/about.sync.tsx -> /about
  - src/pages/(main)/settings/layout.tsx -> wraps /settings subtree

Providers:

- Root providers are composed in src/providers/root-providers.tsx and include:
  - LazyMotion + MotionConfig
  - TanStack QueryClientProvider
  - Jotai Provider with a global store
  - Event, Context menu, and settings sync providers
  - StableRouterProvider to stabilize routing data and navigation
  - ModalContainer and Toaster
- Add new cross-cutting providers here, keeping order and side effects in mind.

Animation rules:

- Always use m.\* components imported from motion/react.
- Prefer transitions from Spring presets for consistency and bundle efficiency.

Example (animation):

```
import { m } from 'motion/react'
import { Spring } from '~/lib/spring'

export function AnimatedCard(props: { children?: React.ReactNode }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={Spring.presets.smooth}
      className="rounded-lg bg-fill shadow-sm p-4"
    >
      {props.children}
    </m.div>
  )
}
```

Jotai patterns:

- Use createAtomHooks and createAtomAccessor from ~/lib/jotai for consistent access, hooks, and selectors.
- Keep atoms in src/atoms/; co-locate selectors next to atoms when domain-specific.

Example (atom + hooks):

```
import { atom } from 'jotai'
import { createAtomHooks, createAtomAccessor } from '~/lib/jotai'

const baseCounterAtom = atom(0)

// Typed hooks: [atomRef, useAtomHook, useValue, useSetter, get, set]
export const [
  counterAtom,
  useCounter,
  useCounterValue,
  useSetCounter,
  getCounter,
  setCounter,
] = createAtomHooks(baseCounterAtom)

// Optional: selectors
export const useIsEven = () => {
  const value = useCounterValue() // read-only value hook
  return value % 2 === 0
}
```

Stable routing patterns:

- Read-only route data and stable navigate are provided via ~/atoms/route and set by src/providers/stable-router-provider.tsx.
- Prefer useReadonlyRouteSelector for reading route state without causing re-renders.
- Prefer getStableRouterNavigate for imperative navigation outside React components.

Example (route utilities):

```
import { useReadonlyRouteSelector, getStableRouterNavigate } from '~/atoms/route'

export function RouteAwareComponent() {
  const pathname = useReadonlyRouteSelector((r) => r.location.pathname)
  const params = useReadonlyRouteSelector((r) => r.params)
  const navigate = getStableRouterNavigate()

  const goHome = () => navigate('/', { replace: true })

  return (
    <div className="text-text">
      <div>Pathname: {pathname}</div>
      <div>Params JSON: {JSON.stringify(params)}</div>
      <button className="btn" onClick={goHome}>Go Home</button>
    </div>
  )
}
```

UI components:

- Prefer primitives in src/components/ui/ for buttons, inputs, select, switch, slider, dialogs, context menus, etc.
- Compose primitives for feature-level components under src/modules/<domain>/.
- Use the Pastel color tokens (e.g., text-text, bg-background, border-border, bg-fill, bg-accent).

Example (simple page using primitives):

```
import { Button } from '~/components/ui/button/Button'
import { Divider } from '~/components/ui/divider/Divider'
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip/Tooltip'

export const Component = () => {
  return (
    <section className="px-6 py-10 text-text">
      <h1 className="text-2xl font-semibold">About</h1>
      <p className="mt-2 text-text-secondary">This is a template page.</p>

      <Divider className="my-6" />

      <Tooltip>
        <TooltipTrigger>
          <Button variant="primary">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Tooltip content</span>
        </TooltipContent>
      </Tooltip>
    </section>
  )
}
```

Color system:

- Use the Pastel-based semantic tokens:
  - Semantic: text-text, bg-background, border-border
  - Application: bg-accent, bg-primary, text-accent
  - Fill: bg-fill, bg-fill-secondary
  - Material: bg-material-medium, bg-material-opaque
- Respect dark mode and contrast variants; prefer data-contrast attributes when applicable.

File-based routing quickstart:

- Add a synchronous page:
  - Create src/pages/(main)/new-page.sync.tsx -> route /new-page
- Add a lazy page:
  - Create src/pages/(main)/lazy.tsx -> route /lazy (code-split)
- Add a layout:
  - Create src/pages/(main)/settings/layout.tsx including <Outlet />
- The route graph is generated into src/generated-routes.ts; do not edit it manually.

TanStack Query:

- Use a shared QueryClient (~/lib/query-client) via RootProviders.
- Keep query keys structured and co-locate query hooks with modules.

Modal and toast:

- Use Modal from ~/components/ui/modal and sonner Toaster already wired in RootProviders.
- Prefer declarative patterns; use the provided Modal.present helper when needed.

Common agent playbook:

1. Create a new feature module:

- Place domain-specific components under src/modules/<domain>/.
- If it needs a page, create it under src/pages/<segment>/.
- Add routes via file creation; do not modify src/generated-routes.ts.

2. Add state for a feature:

- Create an atom in src/atoms/<feature>.ts.
- Expose hooks via createAtomHooks. Avoid exporting raw atoms unless necessary.

3. Add animated UI:

- Use m._ components with Spring presets. Do not import motion._.

4. Add a provider:

- Edit src/providers/root-providers.tsx to insert it near related providers.
- Ensure it’s side-effect free on import and respects React 19 rules.

5. Navigation and route state:

- Read-only selections via useReadonlyRouteSelector for stable, selective reads.
- Imperative navigation outside components via getStableRouterNavigate.

6. Styling:

- Use Pastel tokens. Avoid raw Tailwind colors unless necessary.

Linting, formatting, and quality:

- Run pnpm lint and pnpm format to conform to eslint-config-hyoban and Prettier.
- Ensure TS passes in builds (pnpm build runs type checks via Vite + TS).

Do not:

- Do not edit auto-generated route files.
- Do not use motion.\* directly.
- Do not bypass providers by re-creating QueryClient or Jotai store; use the shared instances.
- Do not use window.location directly; use routing utilities.
- Do not introduce ad-hoc color tokens that bypass the Pastel system.

Troubleshooting:

- Route not recognized:
  - Check filename suffix (.sync.tsx vs .tsx), directory placement under src/pages/, and that the dev server/plugin picked up changes.
- Animation not working:
  - Verify import { m } from 'motion/react' and applied Spring preset.
- State not updating:
  - Ensure atoms are created via createAtomHooks and read/written through the provided hooks or accessors.

References:

- vite-plugin-route-builder: https://github.com/Innei/vite-plugin-route-builder
- Pastel color system: https://github.com/Innei/Pastel

Change checklist (agents):

- Imports use ~/ alias
- New components placed in correct directory (ui/common/modules)
- Routes added through src/pages/ files only
- m.\* + Spring presets for motion
- Pastel color tokens used
- Atoms created via createAtomHooks; selectors stable
- No edits to auto-generated files
- Code passes pnpm lint, pnpm format, and pnpm build
