import { DateRange, DateFilterType, DateFilterOption } from '../types';

// Get today's date at start of day
const getToday = (): Date => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

// Get yesterday's date at start of day
const getYesterday = (): Date => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);
  return yesterday;
};

// Get end of day for a given date
const getEndOfDay = (date: Date): Date => {
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  return endOfDay;
};

// Date filter options
export const dateFilterOptions: DateFilterOption[] = [
  {
    id: 'today',
    label: 'Hoy',
    getRange: (): DateRange => {
      const today = getToday();
      return {
        startDate: today,
        endDate: getEndOfDay(today)
      };
    }
  },
  {
    id: 'yesterday',
    label: 'Ayer',
    getRange: (): DateRange => {
      const yesterday = getYesterday();
      return {
        startDate: yesterday,
        endDate: getEndOfDay(yesterday)
      };
    }
  },
  {
    id: '7days',
    label: '7 días',
    getRange: (): DateRange => {
      const endDate = getEndOfDay(getToday());
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 6);
      startDate.setHours(0, 0, 0, 0);
      return { startDate, endDate };
    }
  },
  {
    id: '30days',
    label: '30 días',
    getRange: (): DateRange => {
      const endDate = getEndOfDay(getToday());
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 29);
      startDate.setHours(0, 0, 0, 0);
      return { startDate, endDate };
    }
  },
  {
    id: 'custom',
    label: 'Personalizado',
    getRange: (): DateRange => {
      // Default to last 30 days for custom
      const endDate = getEndOfDay(getToday());
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 29);
      startDate.setHours(0, 0, 0, 0);
      return { startDate, endDate };
    }
  }
];

// Get default date range (30 days)
export const getDefaultDateRange = (): DateRange => {
  return dateFilterOptions.find(option => option.id === '30days')!.getRange();
};

// Apply date filter function
export const applyDateFilter = (range: DateFilterType | DateRange): DateRange => {
  if (typeof range === 'string') {
    const option = dateFilterOptions.find(opt => opt.id === range);
    return option ? option.getRange() : getDefaultDateRange();
  }
  return range;
};

// Format date for display
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

// Format date range for display
export const formatDateRange = (range: DateRange): string => {
  const start = formatDate(range.startDate);
  const end = formatDate(range.endDate);
  
  if (start === end) {
    return start;
  }
  
  return `${start} - ${end}`;
};

// Check if two dates are the same day
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return date1.toDateString() === date2.toDateString();
};

// Check if a date is within a range
export const isDateInRange = (date: Date, range: DateRange): boolean => {
  return date >= range.startDate && date <= range.endDate;
}; 