import { getList } from '@/components/entities/calls';
import { CallStore, CallFilters } from '@/components/entities/calls';
import { create } from 'zustand';
import { format, subDays } from 'date-fns';

const today = new Date();
const threeDaysAgo = subDays(today, 3);

const defaultFilters: CallFilters = {
  date_start: format(threeDaysAgo, 'yyyy-MM-dd'),
  date_end: format(today, 'yyyy-MM-dd'),
  in_out: '',
  sort_by: '',
  order: '',
  search: '',
};

export const useCallsStore = create<CallStore>((set, get) => ({
  isLoading: true,
  setIsLoading: (isLoading) => set({ isLoading }),

  calls: [],
  setCalls: (calls) => set({ calls }),

  total_rows: '0',

  filters: defaultFilters,
  setFilters: (filters) => set({ filters }),
  updateFilter: (key, value) => {
    const currentFilters = get().filters;
    set({
      filters: {
        ...currentFilters,
        [key]: value,
      },
    });
  },

  fetchAndProcessCalls: async (params) => {
    try {
      set({ isLoading: true });

      const response = await getList(params);
      console.log('response', response?.results);
      set({ calls: response.results, total_rows: response.total_rows });
    } catch (error) {
      console.error('Error fetching and processing calls:', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
