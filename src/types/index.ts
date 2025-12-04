export type OpponentLevel = 'beginner' | 'intermediate' | 'advanced';

export type MatchResult = 'win' | 'loss' | 'split sets';

export type CourtSurface = 'hard' | 'clay' | 'grass' | 'other';

export type EnergyRating = 'low' | 'medium' | 'high';

export type ConfidenceRating = 'low' | 'medium' | 'high';

export interface Match {
  id: string;
  opponentName: string;
  opponentLevel: OpponentLevel;
  date: string; // ISO string
  result: MatchResult;
  courtSurface: CourtSurface;
  strengths: string[];
  weaknesses: string[];
  energyRating: EnergyRating;
  confidenceRating: ConfidenceRating;
  keyMoment1: string;
  keyMoment2: string;
  story?: string; // AI-generated story
  createdAt: string; // ISO string for sorting
}

export interface MatchFilters {
  result?: MatchResult;
  courtSurface?: CourtSurface;
  opponentLevel?: OpponentLevel;
  dateFrom?: string;
  dateTo?: string;
}

