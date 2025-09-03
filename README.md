# MERN Stack Course Project

This repository contains my learning journey and project development for the
MERN Stack course at LUT University.

## Installation Steps

1. Clone the repository
2. Install dependencies: `yarn install`
3. Follow setup instructions for each component

## Development Log

### September 1, 2025

#### Git Repository Setup

- Initialized Git repository
- Established version control workflow
- Connected to GitHub for remote hosting
- Following git conventional commits

#### Project Setup

**Rationale for Yarn 4**:

- Setup yarn 4 workspace for backend and frontend organisation
- Faster package installation and dependency resolution for my internet

**Rationale for TypeScript**:

- Better learning experience
- Enhanced IDE support with IntelliSense

#### Apps Workspace Setup

- Created apps folder for frontend and backend projects
- Cleaner project structure with multiple package.json files (going for a
  Monorepo).
- Added apps folder to main package.json workspace property for dependency
  resolution through yarn workspaces.

**Backend Project**:

- Created Node.js backend project with TypeScript configuration
- Added some hello world console log to make sure the app run fine
- Added add express to the dependencies and made an hello world route

**Frontend Project**:

- Created React.js frontend project with TypeScript configuration
- I added NextJS because i wanted to learn it and is welcomed in portfolios.

### September 3, 2025

#### Project ideation

- Make a simple TODO app [Wont take]
- Something about Karaoke [Wont take]
  - People love Karaoke, it can be funny
- Something about learing Finnish [Wont take]
  - Help me get vocabulary ? Some kind of Duolingo ?
- Something so i can watch movies with my girlfriend and sharing video cam
  - I cannot see my girlfriend during ERASMUS
  - Make a watching party with girlfriend
    - FaceCam + Microphone
    - QR Code / Unique Code
    - Websocket (time sync, action sync)

#### Project brainstorming

Communication client to server using REST-API + Websocket.

- SSE - Live notification (party join, leave).
- Websocket - Time sync and command sync for video. (listen player events,
  broadcast events).
- RestAPI - List movies (imdb), play, shuffle movies, create party.
  https://www.reddit.com/r/learnprogramming/comments/1esy7m7/is_there_an_apisome_kind_of_site_where_i_can/

- Backend: Mongoose, Zod for validation and specifications
- Frontend: I will use tailwindcss, and might use headless ui
