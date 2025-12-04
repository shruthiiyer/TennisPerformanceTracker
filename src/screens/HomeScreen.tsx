import { useNavigate } from 'react-router-dom';
import { getRecentMatches, getMatches } from '../utils/storage';
import { MatchCard } from '../components/MatchCard';
import { TrendsChart } from '../components/TrendsChart';
import { useEffect, useState } from 'react';
import type { Match } from '../types';

export const HomeScreen = () => {
  const navigate = useNavigate();
  const [recentMatches, setRecentMatches] = useState<Match[]>([]);
  const [allMatches, setAllMatches] = useState<Match[]>([]);

  useEffect(() => {
    try {
      const matches = getMatches();
      setAllMatches(matches);
      setRecentMatches(getRecentMatches(5));
    } catch (error) {
      console.error('Error loading matches:', error);
    }
  }, []);

  const getTrendsSnapshot = () => {
    const last5 = allMatches.slice(0, 5);
    const wins = last5.filter((m) => m.result === 'win').length;
    const losses = last5.filter((m) => m.result === 'loss').length;
    const splits = last5.filter((m) => m.result === 'split sets').length;
    return { wins, losses, splits, total: last5.length };
  };

  const trends = getTrendsSnapshot();

  return (
    <div className="min-h-screen bg-gray-50" style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <div className="max-w-7xl mx-auto px-4 py-8" style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1rem' }}>
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2" style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>Tennis Performance Tracker</h1>
          <p className="text-gray-600" style={{ color: '#4b5563' }}>Track your matches and improve your game</p>
        </div>

        <div className="flex gap-4 mb-8" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <button
            onClick={() => navigate('/new-match')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            style={{ padding: '0.75rem 1.5rem', backgroundColor: '#2563eb', color: 'white', borderRadius: '0.5rem', fontWeight: '600', border: 'none', cursor: 'pointer' }}
          >
            Start New Match Diary
          </button>
          <button
            onClick={() => navigate('/history')}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold"
            style={{ padding: '0.75rem 1.5rem', backgroundColor: '#4b5563', color: 'white', borderRadius: '0.5rem', fontWeight: '600', border: 'none', cursor: 'pointer' }}
          >
            View Match History
          </button>
        </div>

        {trends.total > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8" style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', padding: '1.5rem', marginBottom: '2rem' }}>
            <h2 className="text-xl font-bold text-gray-900 mb-4" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>Trends Snapshot (Last 5 Matches)</h2>
            <div className="grid grid-cols-3 gap-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              <div className="text-center p-4 bg-green-50 rounded-lg" style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f0fdf4', borderRadius: '0.5rem' }}>
                <div className="text-3xl font-bold text-green-700" style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#15803d' }}>{trends.wins}</div>
                <div className="text-sm text-green-600" style={{ fontSize: '0.875rem', color: '#16a34a' }}>Wins</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg" style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#fef2f2', borderRadius: '0.5rem' }}>
                <div className="text-3xl font-bold text-red-700" style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#b91c1c' }}>{trends.losses}</div>
                <div className="text-sm text-red-600" style={{ fontSize: '0.875rem', color: '#dc2626' }}>Losses</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg" style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#fefce8', borderRadius: '0.5rem' }}>
                <div className="text-3xl font-bold text-yellow-700" style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#a16207' }}>{trends.splits}</div>
                <div className="text-sm text-yellow-600" style={{ fontSize: '0.875rem', color: '#ca8a04' }}>Split Sets</div>
              </div>
            </div>
          </div>
        )}

        <div className="mb-8" style={{ marginBottom: '2rem' }}>
          <TrendsChart matches={allMatches} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>Recent Matches</h2>
          {recentMatches.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center" style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', padding: '2rem', textAlign: 'center' }}>
              <p className="text-gray-500 mb-4" style={{ color: '#6b7280', marginBottom: '1rem' }}>No matches recorded yet.</p>
              <button
                onClick={() => navigate('/new-match')}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                style={{ padding: '0.5rem 1.5rem', backgroundColor: '#2563eb', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}
              >
                Start Your First Match Diary
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '1rem' }}>
              {recentMatches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  onClick={() => navigate(`/match/${match.id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
