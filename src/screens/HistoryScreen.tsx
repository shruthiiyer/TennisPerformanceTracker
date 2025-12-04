import { useNavigate } from 'react-router-dom';
import { getMatches } from '../utils/storage';
import { MatchHistory } from '../components/MatchHistory';
import type { Match } from '../types';
import { useEffect, useState } from 'react';

export const HistoryScreen = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    setMatches(getMatches());
  }, []);

  const handleMatchClick = (match: Match) => {
    navigate(`/match/${match.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={() => navigate('/')}
            className="mb-4 text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <span>←</span> Back to Home
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Match History</h1>
        </div>
        <MatchHistory matches={matches} onMatchClick={handleMatchClick} />
      </div>
    </div>
  );
};

