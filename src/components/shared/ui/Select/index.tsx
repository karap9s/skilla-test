import CalendarIcon from '@/components/shared/icons/CalendarIcon';
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { FC, useState } from 'react';
import { DateRangePicker } from '@heroui/date-picker';

export interface SelectOption {
  value: string;
  label: string;
}

export interface DateRangeSelectorProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const Select: FC<DateRangeSelectorProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Выберите...',
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <ShadcnSelect value={value} onValueChange={onChange}>
      <SelectTrigger
        className={cn(
          'flex items-center',
          'text-[#005FF8] text-[14px]',
          'border-0 shadow-none p-0',
          'hover:cursor-pointer',
          'focus-visible:ring-0 focus-visible:outline-0 focus-visible:ring-offset-0',
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CalendarIcon color={isHovered ? '#002CFB' : '#ADBFDF'} />
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option, index) => (
          <SelectItem
            className={cn(
              'hover:cursor-pointer hover:bg-[#DEE4FF]',
              value === option.value && 'text-[#002CFB]'
            )}
            key={option.value}
            value={option.value}
          >
            <div className="flex flex-col">
              {option.label}
              {options?.length - 1 === index && <DateRangePicker autoFocus />}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </ShadcnSelect>
  );
};

export default Select;
