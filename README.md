# App Graph Builder

A responsive infrastructure graph editor built with React, TypeScript,
ReactFlow, shadcn/ui, TanStack Query, Zustand, and Mock Service Worker.

## Features

- Screenshot-inspired top bar, icon rail, right panel, and dotted canvas
- Three-node application graphs with dragging, selection, deletion, zoom, pan,
  fit view, and edge creation
- Config and Runtime inspector tabs
- Status badge, editable node fields, and synchronized capacity controls
- MSW endpoints for `GET /api/apps` and `GET /api/apps/:appId/graph`
- TanStack Query loading, error, retry, and per-application caching
- Zustand-managed app selection, node selection, drawer state, and inspector tab
- shadcn/ui controls and a mobile Sheet drawer
- Add Node button and keyboard shortcuts

## Setup

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

## Validation

```bash
npm run typecheck
npm run lint
npm run build
```

## Keyboard Shortcuts

- `F`: fit the graph into view
- `P`: toggle the mobile application panel
- `Delete` or `Backspace`: delete selected graph elements

## Key Decisions

ReactFlow owns mutable node and edge state because its change handlers are
designed around controlled graph arrays. Zustand stores only cross-component UI
state and does not duplicate derived node data.

TanStack Query owns server-like application and graph data. Its query keys
include the application ID, producing an independent cached graph for each app.

MSW intercepts real browser `fetch` requests. This keeps the API client shaped
like production code while still requiring no backend.

The desktop inspector is an aside. On smaller screens the same panel content is
rendered in a shadcn Sheet controlled by Zustand.

## Mock Error Demo

Use the warning button in the top bar to enable or disable mocked HTTP 500
responses. Active queries reset so their loading and error states can be tested.

## Known Limitations

- Mock data and graph edits reset after a full page refresh.
- Inspector edits are local ReactFlow state and are not submitted to an API.
- The theme and share buttons are visual placeholders.
- Authentication and real-time collaboration are not implemented.
