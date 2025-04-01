import { FC, useState } from 'react';
import { format, subDays, subWeeks, subMonths, subYears } from 'date-fns';
import DateNavigationArrow from '@/components/shared/icons/DateNavigationArrow';
import { cn } from '@/lib/utils';
import Dropdown, { DropdownItem } from '@/components/shared/ui/Dropdown';
import CalendarIcon from '@/components/shared/icons/CalendarIcon';

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
  const [isHovered, setIsHovered] = useState(false);

  const rangeOptions: DropdownItem[] = [
    {
      value: '3days',
      label: '3 дня',
      onClick: () => handleRangeChange('3days'),
    },
    {
      value: 'week',
      label: 'Неделя',
      onClick: () => handleRangeChange('week'),
    },
    {
      value: 'month',
      label: 'Месяц',
      onClick: () => handleRangeChange('month'),
    },
    { value: 'year', label: 'Год', onClick: () => handleRangeChange('year') },
    {
      value: 'custom',
      label: 'Указать даты',
      onClick: () => handleRangeChange('custom'),
    },
  ];

  const getCurrentOptionIndex = (): number => {
    return rangeOptions.findIndex((option) => option.value === rangeValue);
  };

  const getCurrentOptionLabel = (): string => {
    const option = rangeOptions.find((option) => option.value === rangeValue);
    return option ? option.label : 'Выберите период';
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
    const dateEnd: Date = today;

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

  const triggerContent = (
    <div
      className="flex items-center gap-2 text-[#005FF8] text-[14px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CalendarIcon color={isHovered ? '#002CFB' : '#ADBFDF'} />
      <span>{getCurrentOptionLabel()}</span>
    </div>
  );

  return (
    <div className="flex items-center gap-3">
      <DateNavigationArrow
        className="flex items-center justify-start h-6 w-4"
        direction="left"
        onClick={handlePrevPeriod}
      />

      <div className={cn('flex items-center rounded', className)}>
        <Dropdown
          trigger={triggerContent}
          items={rangeOptions}
          selectedValue={rangeValue}
          className="border-0"
          isDatePicker={true}
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
