# Movie Watch Party Frontend

A Next.js frontend application for synchronized movie watching with friends.

## Overview

This is the frontend for a movie watch party application that allows users to:
- Create and join movie watching parties
- Search for movies using TMDB API
- Watch movies in sync with other party members
- Real-time synchronization of play/pause/seek actions

## Technology Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Server Actions** - Form handling and API calls
- **WebSockets/SSE** - Real-time synchronization

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn package manager
- Backend server running on port 3000

### Installation

1. Install dependencies:
```bash
yarn install
```

2. Start the development server:
```bash
yarn dev
```

3. Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
├── lib/                 # Utility functions and configurations
└── types/              # TypeScript type definitions
```

## Features

### Authentication
- User registration and login
- Secure session management with encrypted cookies
- JWT token handling on server-side

### Party Management
- Create new movie watching parties
- Join existing parties with invitation codes
- Leave or delete parties
- Real-time party member updates

### Movie Integration
- Search movies via TMDB API
- Add movies to party watchlist
- Remove movies from watchlist
- Movie details and metadata display

### Synchronized Playback
- Real-time video synchronization between party members
- Play/pause controls (owner only)
- Visual indicators showing who's currently watching
- Automatic sync for new members joining mid-playback

## Development Notes

This project uses Next.js App Router and Server Actions for a modern, server-side rendered experience. The application communicates with the backend API for user management, party operations, and real-time synchronization.

## Related

- Backend: `../backend/` - Express.js API server
- Shared Types: `../../libraries/api/` - Shared type definitions and schemas