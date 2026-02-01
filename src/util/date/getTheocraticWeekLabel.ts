interface FormatOptions {
  format?: 'week-label' | 'week-range';
}

/**
 * Formats a date string into a readable week label
 * @param dateStr - Date string in YYYY-MM-DD format
 * @param options - Formatting options
 * @returns Formatted date string
 */
export const getTheocraticWeekLabel = (dateStr: string, options: FormatOptions = {}): string => {
  const { format = 'week-range' } = options;
  
  const [year, month, day] = dateStr.split('-').map(Number);
  
  if (format === 'week-label') {
    // Original format: "Monday, September 8"
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString(undefined, { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  }
  
  // Default format: "MMMM DD - MMMM DD" (second month only if different)
  const startDate = new Date(year, month - 1, day);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  
  const startMonth = startDate.toLocaleDateString(undefined, { month: 'long' });
  const startDay = startDate.getDate();
  
  const endMonth = endDate.toLocaleDateString(undefined, { month: 'long' });
  const endDay = endDate.getDate();
  
  if (startMonth === endMonth) {
    return `${startMonth.toUpperCase()} ${startDay}–${endDay}`;
  } else {
    return `${startMonth.toUpperCase()} ${startDay}–${endMonth.toUpperCase()} ${endDay}`;
  }
};
