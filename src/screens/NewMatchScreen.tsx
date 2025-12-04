import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MatchForm } from '../components/MatchForm';
import { MatchStory } from '../components/MatchStory';
import { saveMatch, updateMatch } from '../utils/storage';
import { generateMatchStory } from '../utils/storyGenerator';
import type { Match } from '../types';

export const NewMatchScreen = () => {
  const navigate = useNavigate();
  const [isGeneratingStory, setIsGeneratingStory] = useState(false);
  const [savedMatch, setSavedMatch] = useState<Match | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (matchData: Omit<Match, 'id' | 'createdAt'>) => {
    const newMatch: Match = {
      ...matchData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    saveMatch(newMatch);
    setIsGeneratingStory(true);

    try {
      const story = await generateMatchStory(newMatch);
      const updatedMatch = { ...newMatch, story };
      updateMatch(newMatch.id, { story });
      setSavedMatch(updatedMatch);
    } catch (error) {
      console.error('Error generating story:', error);
      setSavedMatch(newMatch);
    } finally {
      setIsGeneratingStory(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = async (matchData: Omit<Match, 'id' | 'createdAt'>) => {
    if (!savedMatch) return;

    const updatedMatch = { ...savedMatch, ...matchData };
    updateMatch(savedMatch.id, matchData);
    setIsGeneratingStory(true);

    try {
      const story = await generateMatchStory(updatedMatch as Match);
      updateMatch(savedMatch.id, { story });
      setSavedMatch({ ...updatedMatch, story } as Match);
    } catch (error) {
      console.error('Error regenerating story:', error);
      setSavedMatch(updatedMatch as Match);
    } finally {
      setIsGeneratingStory(false);
      setIsEditing(false);
    }
  };

  if (savedMatch && !isEditing) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="w-3/4 max-w-4xl mx-auto mb-4 pl-6">
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <span>←</span> Back to Home
          </button>
        </div>
          {isGeneratingStory ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Generating your match story...</p>
            </div>
          ) : (
            <>
              <MatchStory match={savedMatch} onEdit={handleEdit} />
              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => navigate('/')}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Back to Home
                </button>
                <button
                  onClick={() => navigate('/history')}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  View All Matches
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="w-3/4 max-w-4xl mx-auto mb-4 pl-6">
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <span>←</span> Back to Home
          </button>
        </div>
        {isEditing && savedMatch ? (
          <MatchForm
            initialData={savedMatch}
            onSubmit={handleUpdate}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <MatchForm onSubmit={handleSubmit} onCancel={() => navigate('/')} />
        )}
      </div>
    </div>
  );
};

