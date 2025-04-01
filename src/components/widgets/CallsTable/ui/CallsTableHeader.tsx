import FilterArrow from '@/components/shared/icons/FilterArrow';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { tableHeads } from '@/components/widgets/CallsTable/model/functions';
import { cn } from '@/lib/utils';
import { FC } from 'react';

interface CallsTableHeaderProps {
  sortBy?: string;
  order?: 'ASC' | 'DESC';
  onSort: (sortKey?: string) => void;
}

const CallsTableHeader: FC<CallsTableHeaderProps> = ({
  sortBy,
  order,
  onSort,
}) => {
  return (
    <TableHeader className="sticky top-0 z-10 bg-white">
      <TableRow>
        {tableHeads.map((head, index) => (
          <TableHead
            className={cn(
              'h-fit',
              'text-secondary text-[14px]',
              'px-0 pt-6 pb-5',
              !index && 'pl-10',
              index === tableHeads.length - 1 && 'pr-5 flex justify-end'
            )}
            key={`${head.title}-${index}`}
          >
            <div
              className={cn(
                'flex items-center gap-1 w-fit',
                head.hasArrow && 'hover:cursor-pointer',
                sortBy === head.sortKey &&
                  'transition-all duration-300 text-[#005ff8]'
              )}
              onClick={() => head.sortKey && onSort(head.sortKey)}
            >
              {head.title}
              {head.hasArrow && (
                <div
                  className={cn(
                    'w-fit transition-all duration-300',
                    sortBy === head.sortKey && order === 'DESC'
                      ? ''
                      : 'rotate-180'
                  )}
                >
                  <FilterArrow
                    width={18}
                    height={21}
                    className="flex items-center justify-center"
                    color={sortBy === head.sortKey ? '#005ff8' : '#ADBFDF'}
                  />
                </div>
              )}
            </div>
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};

export default CallsTableHeader;
