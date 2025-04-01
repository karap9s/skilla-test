import { GetListData, Order, SortBy } from '@/components/entities/calls';

export interface TableHead {
  title: string;
  hasArrow?: boolean;
  sortKey?: 'date' | 'duration';
}

export interface CallsTableProps {
  isLoading?: boolean;
  calls?: GetListData[];
  filters?: {
    in_out?: string;
    sort_by?: SortBy;
    order?: Order;
  };
  updateFilter?: (key: string, value: any) => void;
}
