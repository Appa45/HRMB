# ContactHub — Notion-inspired database UI

A responsive React + TypeScript + Vite skeleton for the ContactHub contact database prototype. It includes Table and Board views, a shared contact dataset, search, stage filtering, a contact detail drawer, and save/cancel editing.

## Requirements
- Node.js 18+
- npm

## Run locally
```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Build
```bash
npm run build
npm run preview
```

## Project structure
```text
src/
  components/
    AppSidebar.tsx       Workspace navigation
    DatabaseToolbar.tsx  View tabs, search, filter and new contact
    TableView.tsx        Database table
    BoardView.tsx        Kanban grouped by stage
    ContactDrawer.tsx    Shared details editor
    ContactAvatar.tsx    Initials avatar
    StageBadge.tsx       Stage property pill
  data/
    contacts.ts          Fictional starter records
  types/
    contact.ts           Shared Contact and ContactStage types
  App.tsx                Shared state and view orchestration
  main.tsx               React entry point
  styles.css             Global styles and responsive layout
```

## Architecture notes
- `contacts` is the single source of truth. Table and Board never maintain duplicate data.
- `view` stores the active database view.
- `selectedContactId` determines which contact is open in the drawer.
- The drawer edits a draft. **Save changes** updates the shared record; **Cancel** discards the draft.
- A saved stage change automatically moves the card to the appropriate board group and updates the table.
- The Customer column is intentionally empty in the starter data to demonstrate an empty group.
- Search works across name, email, company, role, owner, labels and notes.
- The UI is a front-end prototype; persistence and authentication are not connected.

## Next steps
1. Add routing if this needs to sit inside a larger app.
2. Connect API CRUD endpoints and loading/error states.
3. Persist saved contacts to a backend or local storage.
4. Add drag-and-drop, saved filters and configurable properties if required.


## React Router navigation
The app uses `BrowserRouter`, `Routes`, `Route`, `Navigate`, and `NavLink` from `react-router-dom`. The Contacts route (`/`) keeps the original database UI unchanged. Sidebar routes are `/tasks`, `/notes`, `/settings`, `/search`, and `/inbox`; these currently show lightweight placeholder pages with the same shell and styling.
