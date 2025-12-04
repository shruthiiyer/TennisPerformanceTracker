import type { Match } from '../types';

interface MatchStoryProps {
  match: Match;
  onEdit?: () => void;
}

export const MatchStory = ({ match, onEdit }: MatchStoryProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Match Story</h2>
        {onEdit && (
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            Edit Entry
          </button>
        )}
      </div>
      {match.story ? (
        <div className="prose max-w-none">
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{match.story}</p>
        </div>
      ) : (
        <p className="text-gray-500 italic">No story generated yet.</p>
      )}
    </div>
  );
};

