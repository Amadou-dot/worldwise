export const formatDate = (date: string, weekday?: boolean) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...(weekday && { weekday: 'long' }),
  }).format(new Date(date));
