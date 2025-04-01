import { useCallsStore } from '@/components/entities/calls';
import { createSelectors } from '@/components/shared/configs';
import { Table } from '@/components/ui/table';
import { FC, JSX, useMemo } from 'react';
import { motion } from 'framer-motion';
import CallsTableHeader from './CallsTableHeader';
import CallsTableBody from './CallsTableBody';
import CallsTableLoader from './CallsTableLoader';
import { sortCalls } from '../model/functions';

const CallsTable: FC = (): JSX.Element => {
  const callsStore = createSelectors(useCallsStore);
  const calls = callsStore.use.calls();
  const filters = callsStore.use.filters();
  const updateFilter = callsStore.use.updateFilter();
  const isLoading = callsStore.use.isLoading();

  const handleSort = (sortKey?: string) => {
    if (!sortKey) return;

    if (filters.sort_by === sortKey) {
      const newOrder = filters.order === 'ASC' ? 'DESC' : 'ASC';
      updateFilter('order', newOrder);
    } else {
      updateFilter('sort_by', sortKey as 'date' | 'duration');
      updateFilter('order', 'ASC');
    }
  };

  const filteredCalls = useMemo(() => {
    if (!calls?.length) return [];

    // Фильтруем звонки по типу
    const filtered = calls.filter((call) => {
      if (filters.in_out?.length) {
        return Number(call.in_out) === Number(filters?.in_out);
      }
      return true;
    });

    // Используем вынесенную функцию сортировки
    return sortCalls(filtered, filters.sort_by, filters.order);
  }, [calls, filters]);

  if (isLoading && !filteredCalls?.length) {
    return <CallsTableLoader />;
  }

  return (
    <motion.div
      className="select-none w-full max-w-[1440px] mx-auto bg-white rounded-xl mb-30 relative"
      style={{ boxShadow: '0px 4px 5px 0px #e9edf3' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {isLoading && filteredCalls?.length && <CallsTableLoader showOverlay />}
      <Table>
        <CallsTableHeader
          sortBy={filters.sort_by}
          order={filters.order as 'ASC' | 'DESC'}
          onSort={handleSort}
        />
        <CallsTableBody calls={filteredCalls} />
      </Table>
    </motion.div>
  );
};

export default CallsTable;
