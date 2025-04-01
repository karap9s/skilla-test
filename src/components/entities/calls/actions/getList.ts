import { api } from '@/components/shared/api';
import { GetListRequestProps, GetListResponse } from '../types/types';

export const getList = async (
  props: GetListRequestProps
): Promise<GetListResponse> => {
  try {
    const response = await api.post<GetListResponse>('mango/getList', {
      json: props,
    });

    return response.json();
  } catch (error) {
    console.error(error);

    return { total_rows: '0', results: [] };
  }
};
