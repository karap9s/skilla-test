import { FC } from 'react';
import { Dropdown } from '@/components/shared/ui';
import { CallFilters } from '@/components/entities/calls';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface CallTypeFilterProps {
  selectedType: CallFilters['in_out'];
  onTypeChange: (type: CallFilters['in_out']) => void;
  className?: string;
}

export const CallTypeFilter: FC<CallTypeFilterProps> = ({
  selectedType,
  onTypeChange,
  className,
}) => {
  const allTypes: Array<CallFilters['in_out']> = ['', '0', '1'];

  const typeLabels: Record<CallFilters['in_out'], string> = {
    '': 'Все типы',
    '0': 'Исходящие',
    '1': 'Входящие',
  };

  const dropdownItems = allTypes.map((type) => ({
    label: typeLabels[type],
    value: type,
    onClick: () => onTypeChange(type),
  }));

  return (
    <div className="flex items-center gap-4">
      <Dropdown
        trigger={
          <motion.span
            className={cn(
              'text-[14px] text-[#5E7793]',
              selectedType !== '' && 'text-[#1F46FB]'
            )}
            animate={{
              color: selectedType !== '' ? '#1F46FB' : '#5E7793',
            }}
            transition={{ duration: 0.3 }}
          >
            {typeLabels[selectedType]}
          </motion.span>
        }
        items={dropdownItems}
        className={className}
        selectedValue={selectedType}
      />

      <AnimatePresence>
        {selectedType !== '' && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              className={cn(
                'text-secondary',
                'p-0 px-0',
                'hover:cursor-pointer'
              )}
              variant="ghost"
              onClick={() => onTypeChange('')}
            >
              Сбросить фильтры{' '}
              <motion.div
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <X color="#ADBFDF" />
              </motion.div>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CallTypeFilter;
