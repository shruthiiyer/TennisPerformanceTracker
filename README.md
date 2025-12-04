# Tennis Performance Tracker

A web application for tracking tennis match performance, analyzing trends, and generating AI-powered match stories.

## 🎯 1. Problem Statement

### The Problem
Tennis players, from recreational to competitive levels, struggle to systematically track and analyze their match performance. Without structured documentation, players lose valuable insights about their game patterns, opponent strategies, and areas for improvement. Traditional methods like mental notes or scattered journal entries are:

- **Inconsistent**: Easy to forget key details after matches
- **Unstructured**: Hard to analyze patterns over time
- **Time-consuming**: Writing detailed match summaries manually is tedious
- **Limited insights**: No easy way to visualize trends or identify patterns

### Why This Solution?
This prototype addresses the need for a **dedicated, intelligent match tracking system** that:
- Captures comprehensive match data in a structured format
- Provides visual analytics to identify performance trends
- Generates engaging match narratives using AI, saving time while preserving detail
- Enables data-driven improvement through historical analysis

### Target Users
- **Recreational tennis players** who want to track their progress and improve their game
- **Competitive players** who need detailed match analysis and trend tracking
- **Tennis coaches** who want to review their players' match history and performance patterns
- **Tennis enthusiasts** who enjoy documenting their tennis journey

---

## 🚀 2. Prototype

### Live Demo
**Deployed URL**: [Add your deployment URL here - e.g., GitHub Pages, Vercel, Netlify]

### Features

#### Core Functionality
1. **Match Diary Entry** - Multi-step form to record:
   - Opponent information and skill level
   - Match details (date, result, court surface)
   - Performance metrics (strengths, weaknesses, energy, confidence)
   - Key moments from the match
   - AI-generated match story

2. **Match History** - View all past matches with:
   - Comprehensive filtering (result, surface, opponent level, date range)
   - Quick summary cards
   - Full match details and stories

3. **Trends Visualization**:
   - Snapshot of last 5 match outcomes (wins/losses/split sets)
   - Interactive chart showing match results over time
   - Visual performance tracking

4. **AI-Powered Story Generation**:
   - Automatically generates engaging match narratives
   - Incorporates all match details into a cohesive story
   - Fallback to template-based stories if API unavailable

### Technical Implementation
- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **State Management**: React Hooks + Context
- **Routing**: React Router
- **Data Storage**: Browser localStorage (no backend required)
- **AI Integration**: OpenAI GPT-3.5-turbo API
- **Charts**: Recharts library
- **Deployment**: [Specify your deployment platform]

### User Interface
The prototype features a clean, modern interface with:
- Responsive design (works on desktop and mobile)
- Intuitive multi-step form flow
- Real-time data visualization
- Accessible color-coded match results

---

## 📚 3. Process Documentation

### Tools Explored

#### Development Tools
- **Vite**: Fast build tool and dev server (chosen for speed and modern tooling)
- **React 19**: Latest React version for optimal performance
- **TypeScript**: Type safety and better developer experience
- **Tailwind CSS**: Rapid UI development with utility-first approach
- **Recharts**: Data visualization library for trend charts

#### AI Tools Used
- **OpenAI GPT-3.5-turbo**: For generating match stories
- **Cursor AI**: For code generation, debugging, and refactoring throughout development

#### Design & Planning
- **Manual wireframing**: Initial screen layouts sketched on paper
- **Component-based architecture**: Modular design for maintainability

### How AI Tools Were Used in the Process

#### 1. **Brainstorming & Research**
- Used AI to explore different approaches to match tracking
- Researched best practices for sports performance tracking applications
- Generated ideas for data visualization techniques

#### 2. **UX Flow Design**
- AI-assisted in designing the multi-step form flow
- Explored different navigation patterns and user journeys
- Generated wireframe concepts for key screens

#### 3. **Code Generation**
- **Initial Setup**: Generated project structure with Vite + React + TypeScript
- **Component Creation**: AI generated base components (MatchForm, MatchCard, etc.)
- **Type Definitions**: Created TypeScript interfaces for type safety
- **Utility Functions**: Generated localStorage helpers and API integration code
- **Styling**: AI-assisted Tailwind CSS class selection and responsive design

#### 4. **Debugging**
- **Runtime Errors**: Fixed OpenAI client initialization issue that prevented app loading
- **TypeScript Errors**: Resolved type import issues with `verbatimModuleSyntax`
- **Build Errors**: Fixed Tailwind CSS v4 compatibility issues (downgraded to v3)
- **CSS Issues**: Debugged blank screen issues and alignment problems

#### 5. **Refactoring & Optimization**
- Improved code organization and component structure
- Optimized API calls with lazy initialization
- Enhanced error handling and fallback mechanisms

#### 6. **Documentation**
- Generated comprehensive README and code comments
- Created setup instructions and usage guidelines

### Experiments, Tests, and Iterations

#### Iteration 1: Initial Prototype
- **Goal**: Basic match entry and storage
- **Result**: ✅ Working form with localStorage
- **Learning**: Simple data structure worked well for MVP

#### Iteration 2: Multi-Step Form
- **Goal**: Break form into logical steps for better UX
- **Result**: ✅ 4-step process improved user experience
- **Learning**: Progress indicators help users understand their position

#### Iteration 3: AI Story Generation
- **Goal**: Add AI-powered match story generation
- **Challenge**: Initial implementation caused app crash (module-level initialization)
- **Solution**: Implemented lazy initialization with fallback to template stories
- **Result**: ✅ Robust AI integration with graceful degradation

#### Iteration 4: Data Visualization
- **Goal**: Add trends and analytics
- **Experiments**: 
  - Tried Chart.js initially
  - Switched to Recharts for better React integration
- **Result**: ✅ Clean, interactive charts showing match trends

#### Iteration 5: Filtering System
- **Goal**: Enable users to filter match history
- **Result**: ✅ Comprehensive filtering with multiple criteria
- **Learning**: Combined filters provide powerful search capabilities

#### Iteration 6: UI/UX Refinements
- **Experiments**:
  - Different form widths (tried 50%, settled on 75%)
  - Shadow effects (removed for cleaner look)
  - Alignment adjustments (aligned back button with form content)
- **Result**: ✅ Polished, professional interface

### What Worked Well

1. **localStorage for Data Persistence**
   - ✅ No backend required for prototype
   - ✅ Fast and simple implementation
   - ✅ Data persists between sessions
   - **Tradeoff**: Limited to single browser/device

2. **Component-Based Architecture**
   - ✅ Easy to maintain and extend
   - ✅ Reusable components (MatchCard, MatchForm)
   - ✅ Clear separation of concerns

3. **TypeScript Integration**
   - ✅ Caught errors early in development
   - ✅ Better IDE support and autocomplete
   - ✅ Self-documenting code through types

4. **AI Story Generation**
   - ✅ Saves users significant time
   - ✅ Creates engaging, personalized narratives
   - ✅ Fallback mechanism ensures reliability

5. **Multi-Step Form**
   - ✅ Better UX than single long form
   - ✅ Progress indication reduces cognitive load
   - ✅ Logical grouping of related fields

### What Failed or Needed Adjustment

1. **Tailwind CSS v4 Compatibility**
   - ❌ Initial v4 setup caused build errors
   - ✅ **Solution**: Downgraded to v3.4.0 for stability
   - **Learning**: Newer isn't always better for prototypes

2. **OpenAI Client Initialization**
   - ❌ Module-level initialization crashed app without API key
   - ✅ **Solution**: Lazy initialization with null checks
   - **Learning**: Always handle missing configuration gracefully

3. **TypeScript Import Syntax**
   - ❌ `verbatimModuleSyntax` required type-only imports
   - ✅ **Solution**: Used `import type` for all type imports
   - **Learning**: TypeScript strict mode requires careful import management

4. **Form Width Experimentation**
   - ❌ Initial 50% width felt too narrow
   - ❌ 100% width was too wide
   - ✅ **Solution**: 75% width provides optimal balance

5. **Shadow Effects**
   - ❌ Initial drop shadows felt heavy
   - ✅ **Solution**: Removed shadows for cleaner, modern look

### Reasoning and Tradeoffs

#### Technology Choices

**React + TypeScript**
- **Reasoning**: Industry standard, excellent tooling, type safety
- **Tradeoff**: Slightly more setup than plain JavaScript, but worth it for maintainability

**localStorage vs. Database**
- **Reasoning**: Simplicity for prototype, no backend infrastructure needed
- **Tradeoff**: 
  - ✅ Fast to implement, works offline
  - ❌ Limited to single device, no sync, size limits
  - **Future**: Could migrate to IndexedDB or backend API

**Tailwind CSS vs. CSS Modules**
- **Reasoning**: Rapid development, consistent design system
- **Tradeoff**: 
  - ✅ Fast styling, utility classes
  - ❌ Larger bundle size (mitigated by purging unused classes)

**OpenAI API vs. Template Stories**
- **Reasoning**: AI provides personalized, engaging content
- **Tradeoff**: 
  - ✅ Better user experience, saves time
  - ❌ API costs, requires internet connection
  - **Mitigation**: Fallback to templates ensures functionality always works

**Recharts vs. Chart.js**
- **Reasoning**: Better React integration, declarative API
- **Tradeoff**: 
  - ✅ React-native, easier to use with React
  - ❌ Smaller community than Chart.js

#### Design Decisions

**Multi-Step Form**
- **Reasoning**: Reduces cognitive load, better mobile experience
- **Tradeoff**: 
  - ✅ Better UX, logical grouping
  - ❌ Slightly more complex state management

**75% Page Width**
- **Reasoning**: Optimal reading width, not too narrow or wide
- **Tradeoff**: 
  - ✅ Comfortable for users
  - ❌ Uses less screen real estate (acceptable for form-focused app)

**No Backend**
- **Reasoning**: Faster development, simpler deployment
- **Tradeoff**: 
  - ✅ Quick prototype, no server costs
  - ❌ No data sync, limited scalability
  - **Future**: Easy to add backend API layer

### Future Enhancements

1. **Data Export**: Allow users to export match data as CSV/JSON
2. **Cloud Sync**: Add backend for multi-device access
3. **Advanced Analytics**: More detailed performance metrics and insights
4. **Social Features**: Share matches with coaches or friends
5. **Mobile App**: Native iOS/Android app for on-court entry
6. **Photo Uploads**: Add match photos to entries
7. **Tournament Mode**: Group matches into tournaments
8. **Opponent Database**: Track recurring opponents with history

---

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- OpenAI API key (optional, for AI story generation)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/shruthiiyer/TennisPerformanceTracker.git
cd TennisPerformanceTracker
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

---

## 📝 License

This project is open source and available under the MIT License.

---

## 👤 Author

**Shruthi Iyer**
- GitHub: [@shruthiiyer](https://github.com/shruthiiyer)

---

## 🙏 Acknowledgments

- OpenAI for GPT-3.5-turbo API
- React and Vite communities
- Tailwind CSS team
- Recharts library contributors
