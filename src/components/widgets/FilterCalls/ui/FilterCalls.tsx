import { CallTypeFilter } from '@/components/features/FilterCalls/CallTypeFilter';
import { createSelectors } from '@/components/shared/configs';
import { useCallsStore } from '@/components/entities/calls';
import { FC, JSX } from 'react';
import {
  DateRangeSelector,
  DateRange,
} from '@/components/features/FilterCalls';

const FilterCalls: FC = (): JSX.Element => {
  const callsStore = createSelectors(useCallsStore);
  const filters = callsStore.use.filters();
  const updateFilter = callsStore.use.updateFilter();

  return (
    <div className="w-full max-w-[1440px] mx-auto mb-4 mt-20 flex justify-between items-center">
      <CallTypeFilter
        selectedType={filters.in_out}
        onTypeChange={(type) => {
          updateFilter('in_out', type);
        }}
      />

      <DateRangeSelector
        selectedRange={filters.date_start}
        onRangeChange={(range: DateRange) => {
          updateFilter('date_start', range.dateStart);
          updateFilter('date_end', range.dateEnd);
        }}
      />
    </div>
  );
};

export default FilterCalls;
