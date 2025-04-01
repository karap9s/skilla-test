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
