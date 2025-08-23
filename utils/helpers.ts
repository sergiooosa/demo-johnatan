import { GOOD, WARN, BAD, METHOD_COLOR } from '../lib/colors';

// Sum function
export const sum = (arr: number[]): number => {
  return arr.reduce((acc, val) => acc + val, 0);
};

// Safe division function
export const safeDiv = (numerator: number, denominator: number): number => {
  return denominator > 0 ? numerator / denominator : 0;
};

// Money formatting with 0 decimals
export const money0 = (amount: number): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Money formatting with 2 decimals
export const money2 = (amount: number): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Percentage formatting
export const pct = (value: number): string => {
  return `${(value * 100).toFixed(1)}%`;
};

// ROAS formatting (x multiplier)
export const x = (value: number): string => {
  return `${value.toFixed(1)}x`;
};

// Generate random variation for demo
export const getRandomVariation = (): string => {
  const variation = (Math.random() * 30 - 15).toFixed(1);
  const sign = parseFloat(variation) >= 0 ? '+' : '';
  return `${sign}${variation}%`;
};

// Get badge based on thresholds
export const getBadge = (value: number, thresholds: { good: number; review: number }): 'Bueno' | 'A revisar' | 'Malo' => {
  if (value < thresholds.good) return 'Bueno';
  if (value < thresholds.review) return 'A revisar';
  return 'Malo';
};

// Get badge color with neon effect
export const getBadgeColor = (badge: 'Bueno' | 'A revisar' | 'Malo'): string => {
  switch (badge) {
    case 'Bueno':
      return 'bg-[rgba(88,241,120,.12)] text-[#58F178] border-[rgba(88,241,120,.45)] shadow-[0_0_12px_rgba(88,241,120,.18)]';
    case 'A revisar':
      return 'bg-[rgba(255,216,77,.12)] text-[#FFD84D] border-[rgba(255,216,77,.45)] shadow-[0_0_12px_rgba(255,216,77,.18)]';
    case 'Malo':
      return 'bg-[rgba(255,107,107,.12)] text-[#FF6B6B] border-[rgba(255,107,107,.45)] shadow-[0_0_12px_rgba(255,107,107,.18)]';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
};

// Get medium color
export const getMediumColor = (medium: string): string => {
  return METHOD_COLOR[medium] || '#6B7280';
}; 