/**
 * Safe numeric parsing. Will never return NaN.
 * @param value - The value to parse as an integer. It can be a string, number, undefined, or null.
 * @returns Number | undefined - The parsed integer if successful, otherwise undefined.
 */
export default function safeParseInt(
  value: string | number | undefined | null
): number | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }

  const parsedValue = typeof value === 'string' ? parseInt(value, 10) : value;
  if (isNaN(parsedValue)) {
    return undefined;
  }

  return parsedValue;
}
