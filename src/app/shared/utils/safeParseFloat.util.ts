/**
 * Safe numeric parsing. Will never return NaN.
 * @param value - The value to parse as an number. It can be a string, number, undefined, or null.
 * @returns Number | undefined - The parsed number if successful, otherwise undefined.
 */
export default function safeParseFloat(
  value: string | number | undefined | null
): number | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }

  const parsedValue = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(parsedValue)) {
    return undefined;
  }

  return parsedValue;
}
