<div align="center">

# Ainyx

### Responsive App Graph Builder

Build, inspect, and interact with application infrastructure graphs in a
responsive React interface.

[![Live Demo](https://img.shields.io/badge/Live_Demo-ainyx--delta.vercel.app-6366f1?style=for-the-badge&logo=vercel&logoColor=white)](https://ainyx-delta.vercel.app/)

[Open Live Application](https://ainyx-delta.vercel.app/)

</div>

## Overview

Ainyx is an infrastructure graph editor built to demonstrate controlled React
Flow state, asynchronous data handling, shared UI state, responsive layouts,
and strict TypeScript practices.

## Highlights

- Interactive React Flow canvas with drag, select, connect, delete, zoom, and pan
- Service and database node types with distinct visual designs
- Config and Runtime inspector tabs
- Editable node name, description, and synchronized capacity controls
- Responsive desktop workspace and mobile slide-over panel
- Application-specific graph loading and caching
- Mock HTTP APIs with loading, error, retry, and latency simulation
- Light and dark themes with persisted preference
- Add Node and Fit View actions

## Tech Stack

| Area | Technology |
| --- | --- |
| Application | React 19, Vite, TypeScript |
| Graph | React Flow (`@xyflow/react`) |
| UI | shadcn/ui, Radix UI, Tailwind CSS |
| Server state | TanStack Query |
| UI state | Zustand |
| Mock API | Mock Service Worker |
| Deployment | Vercel |

## Getting Started

### Prerequisites

- Node.js `20.19+` or `22.12+`
- npm

### Installation

```bash
git clone https://github.com/KOUSHIKG04/ainyx.git
cd ainyx
npm install
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`.

## Available Scripts

```bash
npm run dev        # Start the development server
npm run build      # Type-check and create a production build
npm run preview    # Preview the production build
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript without emitting files
```

## Architecture

```text
UI events
   |
   +-- Zustand -------- selected app/node, panel, tab, theme
   |
   +-- React Flow ----- editable nodes and edges
   |
   +-- TanStack Query - loading, errors, caching, refetching
                            |
                            +-- fetch()
                                  |
                                  +-- MSW mock endpoints
```

### State Ownership

- **TanStack Query** owns server-like application and graph snapshots.
- **React Flow hooks** own editable node and edge arrays.
- **Zustand** owns minimal cross-component UI state.
- The selected node is derived from its ID instead of being duplicated in the
  store.

## Project Structure

```text
src/
|-- components/
|   |-- graph/       # Canvas and custom node renderers
|   |-- inspector/   # Selected-node editor
|   |-- layout/      # Top bar, navigation rail, workspace
|   `-- ui/          # shadcn/Radix primitives
|-- data/            # In-memory application graphs
|-- hooks/           # Query and keyboard hooks
|-- lib/             # API client and utilities
|-- mocks/           # MSW worker, handlers, error scenario
|-- store/           # Zustand UI store
`-- types/           # Shared application types
```

## Mock Endpoints

- `GET /apps`
- `GET /apps/:appId/graph`

Use the warning button in the top bar to toggle mocked HTTP 500 responses and
test loading, error, retry, and recovery behavior.

## Keyboard Shortcuts

- `F`: fit the graph into view
- `P`: toggle the mobile application panel
- `Delete` or `Backspace`: delete selected graph elements

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

## Deployment

The application is deployed on Vercel:

**https://ainyx-delta.vercel.app/**

## Mock Error Demo

Use the warning button in the top bar to toggle mocked HTTP 500 responses.
Active queries reset so their loading and error states can be tested.
