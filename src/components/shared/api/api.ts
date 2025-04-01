import ky from 'ky';

export const api = ky.create({
  prefixUrl: 'https://api.skilla.ru',
  throwHttpErrors: false,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
    Accept: 'application/json',
  },
});
