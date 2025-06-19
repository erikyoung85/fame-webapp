export function validateRequiredFields<
  T extends Record<string, any>,
  K extends keyof T
>(
  formValues: T,
  ...requiredFields: K[]
): formValues is T & { [P in K]: NonNullable<T[P]> } {
  return requiredFields.every(
    (key) => formValues[key] !== undefined && formValues[key] !== null
  );
}
