# React / TypeScript

## Requirements

- [Node v16+](https://nodejs.org/)

## Running

_Easily set up a local production environment with simple command!_

- clone the repo
- `npm install` 
- `npm run build` 
- `npm run start` 🚀

Visit [localhost:2095](http://localhost:2095/) 

### API Documentation 
https://documenter.getpostman.com/view/9474144/2s93JtQPKb

### _What happened_ 💥

Containers created:

- Postgres database container
- Node (v16 Alpine) container with running RESTful API service
- and one Node container instance to run tests locally or in CI

## Features:

- [Express](https://github.com/expressjs/express) framework
- [TypeScript v4](https://github.com/microsoft/TypeScript) codebase
- Contract first REST API design:
  - never break API again with HTTP responses and requests payloads using [type definitions](./src/types/express/index.d.ts)
  - Consistent schema error [response](./src/utils/response/custom-error/types.ts). Your frontend will always know how to handle errors thrown in `try...catch` statements 💪
- JWT authentication and role based authorization using custom middleware
- Set local, stage or production [environmental variables](./config) with [type definitions](./src/types/ProcessEnv.d.ts)
- Linting with [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/) code formatter
- Git hooks with [Husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged)
- Automated npm dependency updates with [Renovate](https://github.com/renovatebot/renovate) (set to patch version only)
- Commit messages must meet [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) format.  
