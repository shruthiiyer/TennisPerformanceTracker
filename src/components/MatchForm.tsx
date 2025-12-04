import { useState } from 'react';
import type {
  Match,
  OpponentLevel,
  MatchResult,
  CourtSurface,
  EnergyRating,
  ConfidenceRating,
} from '../types';

interface MatchFormProps {
  initialData?: Partial<Match>;
  onSubmit: (match: Omit<Match, 'id' | 'createdAt'>) => void;
  onCancel?: () => void;
}

const STRENGTH_OPTIONS = [
  'Serve',
  'Forehand',
  'Backhand',
  'Volley',
  'Return',
  'Footwork',
  'Mental toughness',
  'Strategy',
  'Consistency',
  'Power',
];

const WEAKNESS_OPTIONS = [
  'Serve',
  'Forehand',
  'Backhand',
  'Volley',
  'Return',
  'Footwork',
  'Mental toughness',
  'Strategy',
  'Consistency',
  'Unforced errors',
];

export const MatchForm = ({ initialData, onSubmit, onCancel }: MatchFormProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Omit<Match, 'id' | 'createdAt'>>({
    opponentName: initialData?.opponentName || '',
    opponentLevel: initialData?.opponentLevel || 'intermediate',
    date: initialData?.date || new Date().toISOString().split('T')[0],
    result: initialData?.result || 'win',
    courtSurface: initialData?.courtSurface || 'hard',
    strengths: initialData?.strengths || [],
    weaknesses: initialData?.weaknesses || [],
    energyRating: initialData?.energyRating || 'medium',
    confidenceRating: initialData?.confidenceRating || 'medium',
    keyMoment1: initialData?.keyMoment1 || '',
    keyMoment2: initialData?.keyMoment2 || '',
    story: initialData?.story,
  });

  const handleInputChange = (
    field: keyof typeof formData,
    value: string | string[] | OpponentLevel | MatchResult | CourtSurface | EnergyRating | ConfidenceRating
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleTag = (field: 'strengths' | 'weaknesses', tag: string) => {
    setFormData((prev) => {
      const current = prev[field] || [];
      const updated = current.includes(tag)
        ? current.filter((t) => t !== tag)
        : [...current, tag];
      return { ...prev, [field]: updated };
    });
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.opponentName.trim() !== '' && formData.date !== '';
      case 2:
        return true; // All fields optional
      case 3:
        return true; // Key moments optional
      default:
        return true;
    }
  };

  return (
    <div className="w-3/4 max-w-4xl mx-auto p-6 bg-white rounded-lg">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-gray-900">New Match Diary</h2>
          <span className="text-sm text-gray-500">Step {step} of 4</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Opponent Name/Label *
            </label>
            <input
              type="text"
              value={formData.opponentName}
              onChange={(e) => handleInputChange('opponentName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter opponent name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Opponent Level *
            </label>
            <select
              value={formData.opponentLevel}
              onChange={(e) => handleInputChange('opponentLevel', e.target.value as OpponentLevel)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Result *</label>
            <select
              value={formData.result}
              onChange={(e) => handleInputChange('result', e.target.value as MatchResult)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="win">Win</option>
              <option value="loss">Loss</option>
              <option value="split sets">Split Sets</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Court Surface *</label>
            <select
              value={formData.courtSurface}
              onChange={(e) => handleInputChange('courtSurface', e.target.value as CourtSurface)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="hard">Hard</option>
              <option value="clay">Clay</option>
              <option value="grass">Grass</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Performance Metrics</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Strengths Today
            </label>
            <div className="flex flex-wrap gap-2">
              {STRENGTH_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggleTag('strengths', option)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    formData.strengths.includes(option)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weaknesses Today
            </label>
            <div className="flex flex-wrap gap-2">
              {WEAKNESS_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggleTag('weaknesses', option)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    formData.weaknesses.includes(option)
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Energy Rating
            </label>
            <div className="flex gap-4">
              {(['low', 'medium', 'high'] as EnergyRating[]).map((rating) => (
                <label key={rating} className="flex items-center">
                  <input
                    type="radio"
                    name="energyRating"
                    value={rating}
                    checked={formData.energyRating === rating}
                    onChange={(e) => handleInputChange('energyRating', e.target.value as EnergyRating)}
                    className="mr-2"
                  />
                  <span className="capitalize">{rating}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confidence Rating
            </label>
            <div className="flex gap-4">
              {(['low', 'medium', 'high'] as ConfidenceRating[]).map((rating) => (
                <label key={rating} className="flex items-center">
                  <input
                    type="radio"
                    name="confidenceRating"
                    value={rating}
                    checked={formData.confidenceRating === rating}
                    onChange={(e) => handleInputChange('confidenceRating', e.target.value as ConfidenceRating)}
                    className="mr-2"
                  />
                  <span className="capitalize">{rating}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Moments</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Key Moment 1</label>
            <textarea
              value={formData.keyMoment1}
              onChange={(e) => handleInputChange('keyMoment1', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe a key moment from the match..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Key Moment 2</label>
            <textarea
              value={formData.keyMoment2}
              onChange={(e) => handleInputChange('keyMoment2', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe another key moment from the match..."
            />
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Review & Submit</h3>
          <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
            <p><strong>Opponent:</strong> {formData.opponentName}</p>
            <p><strong>Level:</strong> {formData.opponentLevel}</p>
            <p><strong>Date:</strong> {formData.date}</p>
            <p><strong>Result:</strong> {formData.result}</p>
            <p><strong>Surface:</strong> {formData.courtSurface}</p>
            <p><strong>Strengths:</strong> {formData.strengths.join(', ') || 'None'}</p>
            <p><strong>Weaknesses:</strong> {formData.weaknesses.join(', ') || 'None'}</p>
            <p><strong>Energy:</strong> {formData.energyRating}</p>
            <p><strong>Confidence:</strong> {formData.confidenceRating}</p>
            {formData.keyMoment1 && <p><strong>Key Moment 1:</strong> {formData.keyMoment1}</p>}
            {formData.keyMoment2 && <p><strong>Key Moment 2:</strong> {formData.keyMoment2}</p>}
          </div>
        </div>
      )}

      <div className="flex justify-between mt-6">
        <div>
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
            >
              Previous
            </button>
          )}
          {onCancel && step === 1 && (
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
        <div>
          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

