import { MaskitoOptions, MaskitoPostprocessor } from '@maskito/core';
import {
  ElementState,
  MaskitoPreprocessor,
  SelectionRange,
} from '@maskito/core/src/lib/types';
import { maskitoNumberOptionsGenerator } from '@maskito/kit';

const enforceTwoDecimalsAfterInput: MaskitoPostprocessor = ({
  value,
  selection,
}) => {
  const hasDecimal = value.includes('.');
  const [intPart, decimalPart = ''] = value.split('.');

  if (hasDecimal) {
    const paddedDecimals = decimalPart.padEnd(2, '0').slice(0, 2);
    const newValue = `${intPart}.${paddedDecimals}`;
    const newPosition = Math.min(selection[0], newValue.length);
    const newElementState: ElementState = {
      value: newValue,
      selection: [newPosition, newPosition],
    };
    return newElementState;
  }

  const newElementState: ElementState = { value: value, selection: selection };
  return newElementState;
};

const removeLeadingZerosPostprocessor: MaskitoPostprocessor = ({
  value,
  selection,
}) => {
  const [intPart, decimalPart] = value.split('.');

  const newInt = intPart.replace(/^0+(?!$)/, '') || '0'; // Ensure at least '0' remains

  const newValue =
    decimalPart !== undefined ? `${newInt}.${decimalPart}` : newInt;
  const shift = value.length - newValue.length;

  return {
    value: newValue,
    selection: [
      Math.max(selection[0] - shift, 0),
      Math.max(selection[1] - shift, 0),
    ],
  };
};

const deleteDecimalZeroPadding: MaskitoPreprocessor = (
  { elementState, data },
  actionType
) => {
  if (actionType === 'deleteBackward') {
    const charsToDelete = elementState.value.slice(
      elementState.selection[0],
      elementState.selection[1]
    );
    // if the user is deleting a decimal point, we need to delete the rest of the decimals after the decimal point as well
    if (charsToDelete.includes('.')) {
      const newDeleteSelection: SelectionRange = [
        elementState.selection[0],
        elementState.value.length,
      ];
      return {
        elementState: {
          value: elementState.value,
          selection: newDeleteSelection,
        },
        data,
      };
    }
  }
  return { elementState, data };
};

const defaultNumberOptions = maskitoNumberOptionsGenerator({
  min: 0,
  decimalSeparator: '.',
  thousandSeparator: ',',
  maximumFractionDigits: 2,
});
export const currencyMaskOptions: MaskitoOptions = {
  //   mask: /^\d*\.?\d{0,2}$/, // allow optional dot and up to 2 decimal digits
  ...defaultNumberOptions,
  preprocessors: [
    ...defaultNumberOptions.preprocessors,
    deleteDecimalZeroPadding,
  ],
  postprocessors: [
    ...defaultNumberOptions.postprocessors,
    enforceTwoDecimalsAfterInput,
    removeLeadingZerosPostprocessor,
  ],
};
