import type { Match, MatchResult } from '../types';
import { format } from 'date-fns';

interface MatchCardProps {
  match: Match;
  onClick?: () => void;
}

const getResultColor = (result: MatchResult): string => {
  switch (result) {
    case 'win':
      return 'bg-green-100 text-green-800 border-green-300';
    case 'loss':
      return 'bg-red-100 text-red-800 border-red-300';
    case 'split sets':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

const getLevelBadgeColor = (level: string): string => {
  switch (level) {
    case 'beginner':
      return 'bg-blue-100 text-blue-800';
    case 'intermediate':
      return 'bg-purple-100 text-purple-800';
    case 'advanced':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const MatchCard = ({ match, onClick }: MatchCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg shadow-md p-4 border-2 cursor-pointer hover:shadow-lg transition-shadow ${getResultColor(match.result)}`}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{match.opponentName}</h3>
          <p className="text-sm text-gray-600">{format(new Date(match.date), 'MMM dd, yyyy')}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className={`px-2 py-1 rounded text-xs font-medium ${getResultColor(match.result)}`}>
            {match.result.toUpperCase()}
          </span>
          <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelBadgeColor(match.opponentLevel)}`}>
            {match.opponentLevel}
          </span>
        </div>
      </div>
      <div className="mt-2 text-sm text-gray-700">
        <span className="font-medium">Surface:</span> {match.courtSurface}
      </div>
      {match.story && (
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{match.story.substring(0, 100)}...</p>
      )}
    </div>
  );
};

