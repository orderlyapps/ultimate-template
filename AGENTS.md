# AI Agent Configuration

<!-- intent-skills:start -->

# Skill mappings — when working in these areas, load the linked skill file into context.

skills:

- task: "Working with TanStack DB collections and queries"
  load: "node_modules/@tanstack/react-db/skills/react-db/SKILL.md"
- task: "Setting up new database collections"
  load: "node_modules/.pnpm/@tanstack+react-db@0.1.76_react@19.2.4_typescript@5.9.3/node_modules/@tanstack/db/skills/db-core/collection-setup/SKILL.md"
- task: "Building live queries with complex filters and joins"
  load: "node_modules/.pnpm/@tanstack+react-db@0.1.76_react@19.2.4_typescript@5.9.3/node_modules/@tanstack/db/skills/db-core/live-queries/SKILL.md"
- task: "Implementing optimistic mutations and transactions"
load: "node_modules/.pnpm/@tanstack+react-db@0.1.76_react@19.2.4_typescript@5.9.3/node_modules/@tanstack/db/skills/db-core/mutations-optimistic/SKILL.md"
<!-- intent-skills:end -->

<coding_guidelines>

1. Never use barrel files
2. Try to keep react component files to less than 75 lines. When breaking down components keep the smaller components in a kebab-case subfolder in a "components" folder inside the parent component.
3. Do not use ionic card components unless explicitly requested
4. All ionic page components should be kept in src/routes/pages. Pages should be kept in a kebab case folder and nested according to their route
5. All folders should be kebab case.
6. Do not use useMemo or useCallback unless explicitly requested
7. Route pages in src/routes/pages should only contain IonPage wrapper components with minimal state for modals/alerts. All feature logic, lists, forms, and reusable components should be placed in src/feature/{feature-name}. Route pages should import and compose feature components.
8. Prefer managing state in a Zustand store over passing state via props
9. Place any useLiveQuery from @tanstack/react-db code in a new custom hook in it's own file. 
   </coding_guidelines>
