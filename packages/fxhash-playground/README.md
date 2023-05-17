# Blanq web

The blanq product page.

## Structure

- `src/api`: Api integrations mostly client side
- `src/components`: Simple view components
- `src/containers`: Arragments of components, business logic goes here
- `src/context`: All React.Context implementations
- `src/hooks`: Collection of hooks to be reused across the project
- `src/pages`: Nextjs pages folder
- `src/services`: Custom servives and integration with 3rd party services
- `src/styles`: Theme, variables, global styles

## Getting started

- Create `.env.local` with following content:
```
MAILERLITE_API_KEY=<MAILERLITE_API_KEY>
MAILERLITE_GROUP_ID=<MAILERLITE_GROUP_ID>
```
- `npm install`: Installs dependencies

## Run local dev environment

- `npm run dev`: Starts local development server on `http://localhost:3000`

## Run production build

- `npm run build`: Creates a production build
- `npm start`: Starts the production build
