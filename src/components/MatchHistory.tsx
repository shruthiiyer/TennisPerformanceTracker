import { useState, useMemo } from 'react';
import type { Match, MatchFilters, OpponentLevel, MatchResult, CourtSurface } from '../types';
import { filterMatches } from '../utils/storage';
import { MatchCard } from './MatchCard';

interface MatchHistoryProps {
  matches: Match[];
  onMatchClick?: (match: Match) => void;
}

export const MatchHistory = ({ matches, onMatchClick }: MatchHistoryProps) => {
  const [filters, setFilters] = useState<MatchFilters>({});

  const filteredMatches = useMemo(() => {
    return filterMatches(matches, filters);
  }, [matches, filters]);

  const clearFilters = () => {
    setFilters({});
  };

  const hasActiveFilters = Object.values(filters).some((v) => v !== undefined && v !== '');

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Result</label>
            <select
              value={filters.result || ''}
              onChange={(e) =>
                setFilters({ ...filters, result: e.target.value ? (e.target.value as MatchResult) : undefined })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All</option>
              <option value="win">Win</option>
              <option value="loss">Loss</option>
              <option value="split sets">Split Sets</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Court Surface</label>
            <select
              value={filters.courtSurface || ''}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  courtSurface: e.target.value ? (e.target.value as CourtSurface) : undefined,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All</option>
              <option value="hard">Hard</option>
              <option value="clay">Clay</option>
              <option value="grass">Grass</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Opponent Level</label>
            <select
              value={filters.opponentLevel || ''}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  opponentLevel: e.target.value ? (e.target.value as OpponentLevel) : undefined,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div className="flex items-end">
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date From</label>
            <input
              type="date"
              value={filters.dateFrom || ''}
              onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value || undefined })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date To</label>
            <input
              type="date"
              value={filters.dateTo || ''}
              onChange={(e) => setFilters({ ...filters, dateTo: e.target.value || undefined })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {filteredMatches.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500">No matches found matching the filters.</p>
          </div>
        ) : (
          filteredMatches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              onClick={() => onMatchClick?.(match)}
            />
          ))
        )}
      </div>
    </div>
  );
};

