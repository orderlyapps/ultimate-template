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

# Code Style

- Add comments to new code to help you understand the purpose and functionality of each section, making it easier to maintain and debug in the future
- Include JSDoc comments for functions and components explaining parameters, return types, and usage examples
- Add inline comments for complex logic or non-obvious implementation details
- Document any assumptions or edge cases handled in the code
- Don't forget to update comments when necessary.
- Write all new code as self-contained modules. Ask before adding dependencies from existing files.

# Code Organization

- Never use barrel files
- All folders should be kebab case.
- Try to keep react component files to less than 75 lines. When breaking down components keep the smaller components in a kebab-case subfolder in a "components" folder inside the parent component.
- All ionic page components should be kept in src/routes/pages. Pages should be kept in a kebab case folder and nested according to their route
- Route pages in src/routes/pages should only contain IonPage wrapper components with minimal state for modals/alerts. All feature logic, lists, forms, and reusable components should be placed in src/feature/{feature-name}. Route pages should import and compose feature components.
- Place page content components in src/content in a folder so that structure of src/content matches src/routes/pages.
- Maintatin one component per file

# Working with TanStack DB

- When using useLiveQuery from @tanstack/react-db place the code in a new custom hook in it's own file.
- When selecting or mapping database fields in queries, preserve the original snake_case property names from the schema. Do not convert to camelCase.

# State Management

- Prefer managing state in a Zustand store over passing state via props.

# UI

- Use div tags as a last resort when an Ionic component or a component from src/ui/components will not do the job.
- Do not use ionic card components unless explicitly requested

# Types

- Search for existing types in src/services, src/ui or src/util before creating new ones

  </coding_guidelines>
