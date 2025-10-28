# Lappeenranta Teknillinen Yliopisto

## Software Development Skills Full-stack, Online Course

**Kilian Houpeurt**

This repository contains my learning journey and project development for the MERN Stack course at LUT University.

## Project Structure

The code for both the frontend and the backend can be found at `apps/project`. My learning diary can be found at `apps/diary`.

## Installation & Setup

### Prerequisites

Before getting started, ensure you have the following installed:
- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)
- **Docker** (for local MongoDB database)

### Step 1: Clone and Install Dependencies

```bash
# Clone the repository
git clone <repository-url>
cd MERN-stack

# Install Yarn globally
npm install -g yarn

# Install all project dependencies
yarn install
```

### Step 2: Database Setup

Set up MongoDB using Docker:

```bash
# Navigate to backend directory
cd apps/project/backend

# Start MongoDB container
docker-compose up -d
```

This will start a MongoDB instance on `localhost:27017`.

### Step 3: Environment Configuration

Create environment file for the backend:

```bash
# Copy the template
cp apps/project/backend/.env.local apps/project/backend/.env

# Edit the .env file and add your TMDB API token
# Get your token from: https://www.themoviedb.org/settings/api
```

### Step 4: Start the Application

Run both frontend and backend in development mode:

```bash
# Start backend (from project root)
yarn workspace backend run dev

# Start frontend (in a new terminal, from project root)
yarn workspace frontend run dev
```

### Step 5: Access the Application

Once everything is running:
- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:3000
- **MongoDB**: localhost:27017 (if using local Docker setup)

## Quick Start Commands

```bash
# Install everything
yarn install

# Start database
cd apps/project/backend && docker compose up

# Start development servers (in separate terminals)
yarn workspace backend run dev
yarn workspace frontend run dev
```

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
- Added express to the dependencies and made an hello world route

**Frontend Project**:

- Created React.js frontend project with TypeScript configuration and NextJS.

### Until October 28, 2025

Watched the course materials and worked on the project. More details can be found in the README in `apps/diary`.