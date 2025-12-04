# Tennis Performance Tracker

A web application for tracking tennis match performance, analyzing trends, and generating AI-powered match stories.

## Features

- **Match Diary Entry**: Multi-step form to record match details including:
  - Opponent information and level
  - Match result and court surface
  - Performance metrics (strengths, weaknesses, energy, confidence)
  - Key moments from the match
  - AI-generated match story

- **Match History**: View all past matches with filtering options:
  - Filter by result (win/loss/split sets)
  - Filter by court surface
  - Filter by opponent level
  - Filter by date range

- **Trends Visualization**: 
  - Trends snapshot showing last 5 match outcomes
  - Interactive chart displaying match results over time

- **Match Stories**: AI-generated narratives incorporating all match details

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up your OpenAI API key:
   - Create a `.env` file in the root directory
   - Add your OpenAI API key:
   ```
   VITE_OPENAI_API_KEY=your_api_key_here
   ```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

## Technology Stack

- **React** with **TypeScript** - Frontend framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Recharts** - Data visualization
- **OpenAI API** - AI story generation
- **localStorage** - Data persistence

## Project Structure

```
src/
├── components/       # Reusable UI components
├── screens/          # Page-level components
├── types/            # TypeScript type definitions
├── utils/            # Utility functions (storage, API)
├── App.tsx           # Main app component with routing
└── main.tsx          # Entry point
```

## Usage

1. **Start a New Match**: Click "Start New Match Diary" and fill out the multi-step form
2. **View History**: Click "View Match History" to see all your matches with filtering options
3. **View Trends**: The home screen displays trends and a chart of your last 5 matches
4. **Edit Entries**: Click "Edit Entry" on any match story to update information

## Data Storage

All match data is stored locally in your browser's localStorage. This means:
- Data persists between sessions
- Data is private to your browser
- No backend server required

## Notes

- The application uses OpenAI's GPT-3.5-turbo model for story generation
- If the API call fails, a template-based story will be generated as a fallback
- Make sure to keep your `.env` file secure and never commit it to version control
