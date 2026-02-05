Project Folder Structure:

public/

public/data/ → game content
public/images/ → game art
public/downloads/ → downloadable files

src/

src/app/ → application setup
src/pages/ → route-level pages
src/features/ → site features
src/data/ → frontend data layer
src/assets/ → bundled UI assets
src/components/ → shared UI components (if present)
src/utils/ → utility functions (if present)

Root files

index.html → HTML entry point used by Vite
main.jsx → React application entry
App.jsx → Root application component
eslint.config.js → Linting configuration