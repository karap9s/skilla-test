import { GetListData } from '@/components/entities/calls';
import { TableHead } from '@/components/widgets/CallsTable/model/types';

export const tableHeads: TableHead[] = [
  { title: 'Тип' },
  { title: 'Время', hasArrow: true, sortKey: 'date' },
  { title: 'Сотрудник' },
  { title: 'Звонок' },
  { title: 'Источник' },
  { title: 'Оценка' },
  { title: 'Длительность', hasArrow: true, sortKey: 'duration' },
];

export const getRandomVariant = () => {
  const randomValue = Math.random();

  if (randomValue > 0.66) {
    return 'good';
  } else if (randomValue > 0.33) {
    return 'bad';
  } else {
    return 'excellent';
  }
};

// Форматирование телефонного номера в вид +7 (912) 587-19-34
export const formatPhoneNumber = (phoneNumber: string): string => {
  if (!phoneNumber) return '';

  const cleanNumber = phoneNumber.replace(/\D/g, '');

  if (
    (cleanNumber.startsWith('7') || cleanNumber.startsWith('8')) &&
    cleanNumber.length === 11
  ) {
    const areaCode = cleanNumber.substring(1, 4);
    const firstPart = cleanNumber.substring(4, 7);
    const secondPart = cleanNumber.substring(7, 9);
    const thirdPart = cleanNumber.substring(9, 11);

    return `+7 (${areaCode}) ${firstPart}-${secondPart}-${thirdPart}`;
  }

  if (cleanNumber.length === 10) {
    const areaCode = cleanNumber.substring(0, 3);
    const firstPart = cleanNumber.substring(3, 6);
    const secondPart = cleanNumber.substring(6, 8);
    const thirdPart = cleanNumber.substring(8, 10);

    return `+7 (${areaCode}) ${firstPart}-${secondPart}-${thirdPart}`;
  }

  return phoneNumber;
};

// Форматирование времени в секундах в формат MM:SS
export const formatDuration = (seconds: number): string => {
  if (!seconds) return '';

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Форматирование времени, убирает секунды (HH:MM:SS -> HH:MM)
export const formatTime = (timeString: string): string => {
  if (!timeString) return '';

  const timeParts = timeString.split(':');
  if (timeParts.length >= 2) {
    return `${timeParts[0]}:${timeParts[1]}`;
  }

  return timeString;
};

// Группировка звонков по дням
export const groupCallsByDay = (
  calls: GetListData[]
): Record<string, GetListData[]> => {
  return calls?.reduce((acc: Record<string, GetListData[]>, call) => {
    const date = call.date_notime;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(call);
    return acc;
  }, {});
};

// Форматирование даты для заголовка группы
export const formatDateHeader = (dateStr: string): string => {
  if (!dateStr) return '';

  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Сегодня';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Вчера';
  } else {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }
};
