# Admin Portfolio Manager (Frontend)

Modern React admin app with Ocean Professional theme to manage Projects, Skills, Experience, and Achievements.

## Features
- Sidebar navigation and top navbar
- CRUD modals for all entities
- Ocean Professional theme (blue primary, amber accent)
- LocalStorage-backed mock API (swap with real REST later)
- Responsive layout with smooth transitions

## Getting Started
- npm start
- npm run build

## Structure
- src/theme.js: theme variables and applyTheme()
- src/services/mockApi.js: mock persistence layer
- src/context/PortfolioContext.js: state and CRUD actions
- src/components: layout and shared UI (Sidebar, Topbar, Modal)
- src/sections: feature screens (Projects, Skills, Experience, Achievements)

## Integrating a Real API
Replace methods in src/services/mockApi.js with fetch/axios calls, keeping the same signatures: getAll(), upsert(type, entity), remove(type, id).

