/**
 * Get a CSS variable value from the document's root element.
 * @param key - The CSS variable key to retrieve.
 * @returns the value of the CSS variable or undefined if it doesn't exist.
 *
 * @example
 * ```typescript
 * const primaryColor = getCssVar('--ion-color-primary');
 * console.log(primaryColor); // Outputs the value of the primary color variable
 * ```
 */
export function getCssVar(key: string, defaultTo?: string): string | undefined {
  return (
    getComputedStyle(document.documentElement).getPropertyValue(key) ??
    defaultTo ??
    undefined
  );
}
