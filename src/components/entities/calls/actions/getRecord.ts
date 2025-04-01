import { api } from '@/components/shared/api';
import { GetRecordProps } from '../types/types';

export const getRecord = async (props: GetRecordProps): Promise<string> => {
  try {
    const response = await api.post('mango/getRecord', {
      json: props,
      headers: {
        'Content-type': 'audio/mpeg, audio/x-mpeg, audio/x-mpeg-3, audio/mpeg3',
        'Content-Transfer-Encoding': 'binary',
        'Content-Disposition': 'filename="record.mp3"',
      },
    });

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);

    return audioUrl;
  } catch (error) {
    console.error('Ошибка при получении записи звонка:', error);
    throw new Error('Не удалось получить запись звонка');
  }
};
