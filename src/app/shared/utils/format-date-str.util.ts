import { formatDate } from '@angular/common';
import safeParseDate from './safeParseDate.util';

/**
 * Safe date parsing. Will never return NaN.
 * @param value - The value to parse as an date. It can be a string, number, or a Date instance for a proper parse.
 * @returns string representing the date in YYYY-MM-dd format.
 */
export default function formatDateStr(
  value: string | number | Date
): string | undefined {
  const date = safeParseDate(value);
  if (date === undefined) return;

  date.getUTCDate;

  return formatDate(date, 'YYYY-MM-dd', 'en-US');
}
