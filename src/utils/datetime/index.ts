const msPerHour = 1000 * 60 * 60;
const msPerDay = msPerHour * 24;
const msPerWeek = msPerDay * 7;
const msPerMonth = msPerDay * 30; // Approximate

/**
 * Returns a short, human-friendly date and time string (e.g., "Sep 13, 2025, 2:30 PM" or "Sep 13, 2:30 PM").
 * If the year is not the current year, includes the year.
 * Accepts a Date object or ISO string.
 */
function shortDateTime(dateInput: Date | string): string {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };
  if (date.getFullYear() !== now.getFullYear()) {
    options.year = 'numeric';
  }
  return date.toLocaleDateString(undefined, options);
}

function relativeDateTime(dateInput: Date | string): string {
  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' });
  const now = new Date();
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

  const diff = date.getTime() - now.getTime();

  // "soon" for within 10 minutes in the future
  if (diff > 0 && diff < 10 * 60 * 1000) {
    return 'soon';
  }

  // Calculate differences
  const diffMonth = Math.round(diff / msPerMonth);
  if (Math.abs(diffMonth) >= 1) {
    return rtf.format(diffMonth, 'month');
  }

  const diffWeek = Math.round(diff / msPerWeek);
  if (Math.abs(diffWeek) >= 1) {
    return rtf.format(diffWeek, 'week');
  }

  const diffDay = Math.round(diff / msPerDay);

  // "tomorrow" for exactly 1 day in the future
  if (diffDay === 1) {
    return 'tomorrow';
  }
  if (Math.abs(diffDay) >= 1) {
    return rtf.format(diffDay, 'day');
  }

  const diffHour = Math.round(diff / msPerHour);
  if (Math.abs(diffHour) >= 1) {
    return rtf.format(diffHour, 'hour');
  }

  return rtf.format(0, 'hour'); // fallback: "now"
}

function ageString(birthday: Date | string | number): string {
  if (!birthday) return 'unknown';
  const now = new Date();
  let birthDate: Date;
  if (birthday instanceof Date) {
    birthDate = birthday;
  } else if (typeof birthday === 'string') {
    birthDate = new Date(birthday);
  } else {
    birthDate = new Date(birthday);
  }

  const diffMs = now.getTime() - birthDate.getTime();
  if (diffMs < 0) return 'not born yet';

  const msPerDay = 24 * 60 * 60 * 1000;
  const msPerWeek = msPerDay * 7;

  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' });

  // Calculate years, months, weeks
  let years = now.getFullYear() - birthDate.getFullYear();
  let months = now.getMonth() - birthDate.getMonth();
  let days = now.getDate() - birthDate.getDate();

  if (days < 0) {
    months -= 1;
    // Get days in previous month
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  function clean(result: string): string {
    return result.replace(' ago', '');
  }

  if (years > 0) {
    return clean(rtf.format(-years, 'year'));
  }
  if (months > 0) {
    return clean(rtf.format(-months, 'month'));
  }
  // If less than a month, show weeks
  const weeks = Math.floor(diffMs / msPerWeek);
  if (weeks > 0) {
    return clean(rtf.format(-weeks, 'week'));
  }
  // If less than a week, show days
  const daysOld = Math.floor(diffMs / msPerDay);
  if (daysOld > 0) {
    return clean(rtf.format(-daysOld, 'day'));
  }
  return 'newborn';
}

export { relativeDateTime, shortDateTime, ageString };
