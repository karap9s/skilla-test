export interface GetRecordProps {
  record: string;
  partnership_id: string;
}

export interface GetListRequestProps {
  date_start: string;
  date_end: string;
  in_out?: '0' | '1' | '';
  limit?: number;
  offset?: number;
  sort_by?: 'date' | 'duration';
  order?: 'ASC' | 'DESC';
  status?: 'success' | 'fail';
  from_type?: Array<'clients' | 'new_clients' | 'workers' | 'app'>;
  from_persons?: Array<number>;
  sources?: Array<'from_site' | 'yandex' | 'google' | 'empty' | string>;
  'duration[gte]'?: number;
  'duration[lte]'?: number;
  errors?: Array<
    | 'noerrors'
    | 'noscript'
    | 'timeover'
    | 'notavailable'
    | 'noanswer'
    | 'subscribercompleted'
  >;
  results?: Array<
    'order' | 'message' | 'preorder' | 'candidate' | 'candidateMessage'
  >;
  search?: string;
  ids?: Array<number>;
  xls?: 1;
}

export interface Abuse {
  date: string;
  person_name: string;
  message: string;
  support_read_status: number;
  support_answer_status: number;
  answers: Array<{
    message: string;
    from_support: number;
    support_read_status: number;
    person_read_status: number;
  }>;
}

export interface PartnerData {
  id: string;
  name: string;
  phone: string;
}

export interface GetListData {
  id: number;
  partnership_id: string;
  partner_data: PartnerData;
  date: string;
  date_notime: string;
  time: number;
  from_number: string;
  from_extension: string;
  to_number: string;
  to_extension: string;
  is_skilla: number;
  status: string;
  record: string;
  line_number: string;
  line_name: string;
  in_out: 0 | 1;
  from_site: number;
  source: string;
  errors: Array<string>;
  disconnect_reason: string;
  results: Array<string>;
  stages: Array<any>;
  abuse?: Abuse;
  contact_name: string;
  contact_company: string;
  person_id: number;
  person_name: string;
  person_surname: string;
  person_avatar: string;
}

export interface GetListResponse {
  total_rows: string;
  results: Array<GetListData>;
}

export type IN_OUT = 'incoming' | 'outgoing' | 'missed' | 'notAnswered';

export interface CallFilters {
  date_start: string;
  date_end: string;
  in_out: '0' | '1' | '';
  search: string;
  sort_by: 'date' | 'duration' | '';
  order: 'ASC' | 'DESC' | '';
}

export interface CallStore {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;

  calls: GetListData[];
  setCalls: (calls: GetListData[]) => void;
  total_rows: string;

  filters: CallFilters;
  setFilters: (filters: CallFilters) => void;
  updateFilter: <K extends keyof CallFilters>(
    key: K,
    value: CallFilters[K]
  ) => void;

  fetchAndProcessCalls: (params: GetListRequestProps) => Promise<void>;
}
