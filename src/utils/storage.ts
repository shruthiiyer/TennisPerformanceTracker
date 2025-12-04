import type { Match, MatchFilters } from '../types';

const STORAGE_KEY = 'tennis_matches';

export const getMatches = (): Match[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error reading matches from storage:', error);
    return [];
  }
};

export const saveMatch = (match: Match): void => {
  try {
    const matches = getMatches();
    matches.push(match);
    // Sort by date (most recent first)
    matches.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(matches));
  } catch (error) {
    console.error('Error saving match to storage:', error);
  }
};

export const updateMatch = (id: string, updates: Partial<Match>): void => {
  try {
    const matches = getMatches();
    const index = matches.findIndex(m => m.id === id);
    if (index !== -1) {
      matches[index] = { ...matches[index], ...updates };
      matches.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      localStorage.setItem(STORAGE_KEY, JSON.stringify(matches));
    }
  } catch (error) {
    console.error('Error updating match in storage:', error);
  }
};

export const deleteMatch = (id: string): void => {
  try {
    const matches = getMatches();
    const filtered = matches.filter(m => m.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting match from storage:', error);
  }
};

export const getMatchById = (id: string): Match | undefined => {
  const matches = getMatches();
  return matches.find(m => m.id === id);
};

export const filterMatches = (matches: Match[], filters: MatchFilters): Match[] => {
  return matches.filter(match => {
    if (filters.result && match.result !== filters.result) return false;
    if (filters.courtSurface && match.courtSurface !== filters.courtSurface) return false;
    if (filters.opponentLevel && match.opponentLevel !== filters.opponentLevel) return false;
    if (filters.dateFrom && new Date(match.date) < new Date(filters.dateFrom)) return false;
    if (filters.dateTo && new Date(match.date) > new Date(filters.dateTo)) return false;
    return true;
  });
};

export const getRecentMatches = (count: number = 5): Match[] => {
  const matches = getMatches();
  return matches.slice(0, count);
};

