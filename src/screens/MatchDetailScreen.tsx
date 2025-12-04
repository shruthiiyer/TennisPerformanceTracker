import { useParams, useNavigate } from 'react-router-dom';
import { getMatchById } from '../utils/storage';
import { MatchStory } from '../components/MatchStory';
import { MatchForm } from '../components/MatchForm';
import { generateMatchStory } from '../utils/storyGenerator';
import type { Match } from '../types';
import { useState, useEffect } from 'react';
import { updateMatch } from '../utils/storage';

export const MatchDetailScreen = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [match, setMatch] = useState<Match | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isRegeneratingStory, setIsRegeneratingStory] = useState(false);

  useEffect(() => {
    if (id) {
      const foundMatch = getMatchById(id);
      setMatch(foundMatch || null);
    }
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = async (matchData: Omit<Match, 'id' | 'createdAt'>) => {
    if (!match) return;

    const updatedMatch = { ...match, ...matchData };
    updateMatch(match.id, matchData);
    setIsRegeneratingStory(true);

    try {
      const story = await generateMatchStory(updatedMatch as Match);
      updateMatch(match.id, { story });
      setMatch({ ...updatedMatch, story } as Match);
    } catch (error) {
      console.error('Error regenerating story:', error);
      setMatch(updatedMatch as Match);
    } finally {
      setIsRegeneratingStory(false);
      setIsEditing(false);
    }
  };

  if (!match) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Match not found</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={() => setIsEditing(false)}
            className="mb-4 text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <span>←</span> Cancel Edit
          </button>
          <MatchForm
            initialData={match}
            onSubmit={handleUpdate}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/history')}
          className="mb-4 text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          <span>←</span> Back to History
        </button>
        {isRegeneratingStory ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Regenerating match story...</p>
          </div>
        ) : (
          <MatchStory match={match} onEdit={handleEdit} />
        )}
      </div>
    </div>
  );
};

