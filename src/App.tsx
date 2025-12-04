import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomeScreen } from './screens/HomeScreen';
import { NewMatchScreen } from './screens/NewMatchScreen';
import { HistoryScreen } from './screens/HistoryScreen';
import { MatchDetailScreen } from './screens/MatchDetailScreen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/new-match" element={<NewMatchScreen />} />
        <Route path="/history" element={<HistoryScreen />} />
        <Route path="/match/:id" element={<MatchDetailScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
