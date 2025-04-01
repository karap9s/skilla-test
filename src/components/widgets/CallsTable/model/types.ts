import {
  CallFilters,
  GetListData,
  Order,
  SortBy,
} from '@/components/entities/calls';

export interface TableHead {
  title: string;
  hasArrow?: boolean;
  sortKey?: SortBy;
}

export interface CallsTableProps {
  isLoading?: boolean;
  calls?: GetListData[];
  filters?: {
    in_out?: string;
    sort_by?: SortBy;
    order?: Order;
  };
  updateFilter?: <K extends keyof CallFilters>(
    key: K,
    value: CallFilters[K]
  ) => void;
}
