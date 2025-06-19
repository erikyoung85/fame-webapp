import { Grade } from '../enums/Grade.enum';
import { SelectOption } from '../interfaces/select-option.interface';

export const gradeOptions: SelectOption[] = Object.values(
  Grade
).map<SelectOption>((grade) => ({
  label: grade,
  value: grade,
}));
