import { Gender } from '../enums/Gender.enum';
import { SelectOption } from '../interfaces/select-option.interface';

export const genderOptions: SelectOption[] = Object.values(
  Gender
).map<SelectOption>((gender) => ({
  label: gender,
  value: gender,
}));
