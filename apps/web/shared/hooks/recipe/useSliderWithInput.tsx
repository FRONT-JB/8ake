import { useCallback, useState } from 'react';

type UseSliderWithInputProps = {
  minValue?: number;
  maxValue?: number;
  initialValue?: number[];
  defaultValue?: number[];
};

export function useSliderWithInput({
  minValue = 100,
  maxValue = 400,
  initialValue = [minValue],
  defaultValue = [minValue],
}: UseSliderWithInputProps) {
  const [sliderValue, setSliderValue] = useState(initialValue);
  const [inputValues, setInputValues] = useState(initialValue.map((v) => v.toString()));

  const validateAndUpdateValue = useCallback(
    (rawValue: string, index: number) => {
      if (rawValue === '' || rawValue === '-') {
        const newInputValues = [...inputValues];
        newInputValues[index] = '0';
        setInputValues(newInputValues);

        const newSliderValues = [...sliderValue];
        newSliderValues[index] = 0;
        setSliderValue(newSliderValues);
        return;
      }

      const numValue = parseInt(rawValue, 10);

      if (isNaN(numValue)) {
        const newInputValues = [...inputValues];
        newInputValues[index] = sliderValue[index]?.toString() ?? '0';
        setInputValues(newInputValues);
        return;
      }

      let clampedValue = Math.min(maxValue, Math.max(minValue, numValue));

      if (sliderValue.length > 1) {
        if (index === 0) {
          clampedValue = Math.min(clampedValue, sliderValue[1] ?? 0);
        } else {
          clampedValue = Math.max(clampedValue, sliderValue[0] ?? 0);
        }
      }

      const newSliderValues = [...sliderValue];
      newSliderValues[index] = clampedValue;
      setSliderValue(newSliderValues);

      const newInputValues = [...inputValues];
      newInputValues[index] = clampedValue.toString();
      setInputValues(newInputValues);
    },
    [sliderValue, inputValues, minValue, maxValue]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const newValue = e.target.value;
      if (newValue === '' || /^-?\d*\.?\d*$/.test(newValue)) {
        const newInputValues = [...inputValues];
        newInputValues[index] = newValue;
        setInputValues(newInputValues);
      }
    },
    [inputValues]
  );

  const handleSliderChange = useCallback((newValue: number[]) => {
    const intValues = newValue.map((v) => Math.trunc(v));
    setSliderValue(intValues);
    setInputValues(intValues.map((v) => v.toString()));
  }, []);

  const resetToDefault = useCallback(() => {
    setSliderValue(defaultValue);
    setInputValues(defaultValue.map((v) => v.toString()));
  }, [defaultValue]);

  return {
    sliderValue,
    inputValues,
    validateAndUpdateValue,
    handleInputChange,
    handleSliderChange,
    resetToDefault,
  };
}
