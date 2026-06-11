# App Graph Builder

A responsive infrastructure graph editor built with React, TypeScript,
React Flow, Tailwind CSS, shadcn/ui, TanStack Query, Zustand, and Mock Service
Worker.

## Setup Instructions

### Prerequisites

- Node.js `20.19+` or `22.12+`
- npm

### Install and run

```bash
npm install
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`.

### Validate a change

```bash
npm run typecheck
npm run lint
npm run build
```

## Key Decisions

- React Flow owns the editable node and edge arrays so its drag, connect, and
  delete handlers work with controlled state.
- Zustand stores cross-component UI state such as application and node
  selection, inspector tabs, panel visibility, and theme.
- TanStack Query handles application graph loading and caching by application
  ID.
- MSW provides browser-level mock API endpoints without requiring a backend.
- The desktop inspector uses a collapsible workspace; smaller screens reuse the
  inspector in a Sheet. Selecting a node opens the relevant panel.
- Service and database nodes use separate React Flow node components while
  sharing the same inspector data contract.
- Theme preference is stored in `localStorage`.

## Known Limitations

- Application and graph data are mocked; no production backend is connected.
- Node edits, additions, deletions, positions, and new edges are not persisted.
  They reset after a refresh or when graph data is loaded again.
- Runtime values are illustrative rather than live infrastructure metrics.
- The Share button is currently a visual placeholder.
- Authentication, authorization, multi-user collaboration, undo/redo, and
  automated tests are not implemented.
- The app depends on the MSW service worker starting successfully before React
  is mounted.

## Keyboard Shortcuts

- `F`: fit the graph into view
- `P`: toggle the mobile application panel
- `Delete` or `Backspace`: delete selected graph elements

## Mock Error Demo

Use the warning button in the top bar to toggle mocked HTTP 500 responses.
Active queries reset so loading, error, and retry states can be tested.
