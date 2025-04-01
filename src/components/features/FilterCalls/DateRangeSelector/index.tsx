import { FC, useState } from 'react';
import { Select, SelectOption } from '@/components/shared/ui';
import { format, subDays, subWeeks, subMonths, subYears } from 'date-fns';
import { ru } from 'date-fns/locale';
import DateNavigationArrow from '@/components/shared/icons/DateNavigationArrow';
import { cn } from '@/lib/utils';

export interface DateRange {
  dateStart: string;
  dateEnd: string;
}

export interface DateRangeSelectorProps {
  selectedRange: string;
  onRangeChange: (range: DateRange) => void;
  className?: string;
}

export const DateRangeSelector: FC<DateRangeSelectorProps> = ({
  selectedRange,
  onRangeChange,
  className,
}) => {
  const [rangeValue, setRangeValue] = useState<string>('3days');

  const rangeOptions: SelectOption[] = [
    { value: '3days', label: '3 дня' },
    { value: 'week', label: 'Неделя' },
    { value: 'month', label: 'Месяц' },
    { value: 'year', label: 'Год' },
    { value: 'custom', label: 'Указать даты' },
  ];

  const getCurrentOptionIndex = (): number => {
    return rangeOptions.findIndex((option) => option.value === rangeValue);
  };

  const handlePrevPeriod = () => {
    const currentIndex = getCurrentOptionIndex();
    let newIndex = currentIndex - 1;

    if (newIndex < 0) {
      newIndex = rangeOptions.length - 2;
    }

    const newOption = rangeOptions[newIndex];
    handleRangeChange(newOption.value);
  };

  const handleNextPeriod = () => {
    const currentIndex = getCurrentOptionIndex();
    const maxIndex = rangeOptions.length - 2;
    let newIndex = currentIndex + 1;

    if (newIndex > maxIndex) {
      newIndex = 0;
    }

    const newOption = rangeOptions[newIndex];
    handleRangeChange(newOption.value);
  };

  const handleRangeChange = (value: string) => {
    setRangeValue(value);

    const today = new Date();
    let dateStart: Date;
    let dateEnd: Date = today;

    switch (value) {
      case '3days':
        dateStart = subDays(today, 3);
        break;
      case 'week':
        dateStart = subWeeks(today, 1);
        break;
      case 'month':
        dateStart = subMonths(today, 1);
        break;
      case 'year':
        dateStart = subYears(today, 1);
        break;
      case 'custom':
      default:
        return onRangeChange({
          dateStart: selectedRange,
          dateEnd: selectedRange,
        });
    }

    const formattedDateStart = format(dateStart, 'yyyy-MM-dd');
    const formattedDateEnd = format(dateEnd, 'yyyy-MM-dd');

    onRangeChange({
      dateStart: formattedDateStart,
      dateEnd: formattedDateEnd,
    });
  };

  return (
    <div className="flex items-center gap-3">
      <DateNavigationArrow
        className="flex items-center justify-start h-6 w-4"
        direction="left"
        onClick={handlePrevPeriod}
      />

      <div className={cn('flex items-center rounded', className)}>
        <Select
          options={rangeOptions}
          value={rangeValue}
          onChange={handleRangeChange}
          placeholder="Выберите период"
          className="border-0"
        />
      </div>

      <DateNavigationArrow
        className="flex items-center justify-end h-6 w-4"
        direction="right"
        onClick={handleNextPeriod}
      />
    </div>
  );
};

export default DateRangeSelector;
