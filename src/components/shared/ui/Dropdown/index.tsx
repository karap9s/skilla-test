import FilterArrow from '@/components/shared/icons/FilterArrow';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
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
}

export const Dropdown: FC<DropdownProps> = ({
  trigger,
  items,
  className,
  selectedValue,
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
        <FilterArrow
          color={isOpen ? '#002CFB' : '#ADBFDF'}
          className={cn('transition-transform', !isOpen && 'rotate-180')}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {items.map((item) => (
          <DropdownMenuItem
            className={cn(
              'hover:cursor-pointer hover:bg-[#DEE4FF]',
              selectedValue === item.value && 'text-[#015EF5]'
            )}
            key={item.value}
            onClick={item.onClick}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
