import FilterArrow from '@/components/shared/icons/FilterArrow';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { DateRangePicker } from '@heroui/date-picker';
import { FC, ReactNode, useState } from 'react';

export interface DropdownItem {
  value: string;
  label: string;
  onClick?: () => void;
}

export interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  className?: string;
  selectedValue?: string;
  isDatePicker?: boolean;
}

export const Dropdown: FC<DropdownProps> = ({
  trigger,
  items,
  className,
  selectedValue,
  isDatePicker = false,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        className={cn(
          'flex items-center gap-1 select-none',
          'hover:cursor-pointer',
          className
        )}
      >
        {trigger}{' '}
        {!isDatePicker && (
          <FilterArrow
            color={isOpen ? '#002CFB' : '#ADBFDF'}
            className={cn('transition-transform', !isOpen && 'rotate-180')}
          />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {items.map((item, index) => (
          <DropdownMenuItem
            className={cn(
              'py-1.5 px-3',
              'hover:cursor-pointer hover:bg-[#DEE4FF]',
              isDatePicker && [
                'px-5 text-[14px]',
                selectedValue === item.value
                  ? 'text-[#015EF5] hover:text-[#015EF5]'
                  : 'text-[#899CB1] hover:text-[#2B2D33]',
              ],
              !isDatePicker && selectedValue === item.value && 'text-[#015EF5]'
            )}
            key={item.value}
            onClick={item.onClick}
          >
            <div className="flex flex-col">
              {item.label}
              {items?.length - 1 === index && isDatePicker && (
                <DateRangePicker
                  autoFocus
                  classNames={{ inputWrapper: 'px-0' }}
                />
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
