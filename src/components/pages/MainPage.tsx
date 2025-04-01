import { useCallsStore } from '@/components/entities/calls';
import { createSelectors } from '@/components/shared/configs';
import CallsTable from '@/components/widgets/CallsTable/ui/CallsTable';
import FilterCalls from '@/components/widgets/FilterCalls/ui/FilterCalls';
import { FC, JSX, useEffect } from 'react';

const MainPage: FC = (): JSX.Element => {
  const callsStore = createSelectors(useCallsStore);

  const fetchAndProcessCalls = callsStore.use.fetchAndProcessCalls();
  const filters = callsStore.use.filters();

  // Запрос на получение данных
  useEffect(() => {
    fetchAndProcessCalls(filters);
  }, [filters, fetchAndProcessCalls]);

  return (
    <>
      <FilterCalls />

      <CallsTable />
    </>
  );
};

export default MainPage;
