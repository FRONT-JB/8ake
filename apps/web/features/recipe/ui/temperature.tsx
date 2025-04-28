'use client';

import { useSliderWithInput } from '@/shared/hooks';
import { Button, Input, Label, Slider } from '@repo/ui';

import { RotateCcw } from 'lucide-react';

type TemperatureProps = React.ComponentProps<'input'>;

export function Temperature({ onChange }: TemperatureProps) {
  const minValue = 0.0;
  const maxValue = 400;
  const initialValue = [100];
  const defaultValue = [0];

  const {
    sliderValue,
    inputValues,
    validateAndUpdateValue,
    handleInputChange,
    handleSliderChange,
    resetToDefault,
  } = useSliderWithInput({ minValue, maxValue, initialValue, defaultValue });

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <Label>오븐 온도</Label>

        <div className="flex items-center gap-1">
          <Button
            size="icon"
            variant="ghost"
            className="size-7"
            aria-label="Reset"
            onClick={resetToDefault}
          >
            <RotateCcw size={16} strokeWidth={2} aria-hidden="true" />
          </Button>

          <Input
            className="h-[36px] w-[48px] px-2 py-0"
            type="text"
            inputMode="decimal"
            value={inputValues[0]}
            onChange={(e) => {
              handleInputChange(e, 0);
              onChange?.(e);
            }}
            onBlur={() => validateAndUpdateValue(inputValues[0] ?? '', 0)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                validateAndUpdateValue(inputValues[0] ?? '', 0);
              }
            }}
            aria-label="Enter value"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Slider
          className="grow"
          value={sliderValue}
          onValueChange={handleSliderChange}
          min={minValue}
          max={maxValue}
          step={0.01}
          aria-label="Temperature"
        />
      </div>
    </div>
  );
}
