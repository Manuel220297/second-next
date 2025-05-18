import { isAfter, isBefore, parse, format } from 'date-fns';

export default function isNowBetween(scheduleStart: string, scheduleEnd: string): boolean {
  const now = new Date();

  // Format current date to match time strings
  const todayStr = format(now, 'yyyy-MM-dd');

  // Parse time strings into today’s datetime
  const startTime = parse(`${todayStr} ${scheduleStart}`, 'yyyy-MM-dd HH:mm', new Date());
  const endTime = parse(`${todayStr} ${scheduleEnd}`, 'yyyy-MM-dd HH:mm', new Date());

  return isAfter(now, startTime) && isBefore(now, endTime);
}

// Example usage
const isInClass = isNowBetween('10:30', '12:30');
console.log(isInClass); // true or false based on current time
