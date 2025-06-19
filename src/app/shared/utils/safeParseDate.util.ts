/**
 * Safe date parsing. Will never return NaN.
 * @param value - The value to parse as an date. It can be a string, number, or a Date instance for a proper parse.
 * @returns Number | undefined - The parsed integer if successful, otherwise undefined.
 */
export default function safeParseDate(value: unknown): Date | undefined {
  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    value instanceof Date
  ) {
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      return date;
    }
  }
  return undefined;
}
