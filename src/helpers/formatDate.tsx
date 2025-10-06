/**
 * convert date to a specified format
 * @param date 
 * @param weekday 
 * @returns the formatted date
 */
export const formatDate = (date: string, weekday?: boolean) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...(weekday && { weekday: 'long' }),
  }).format(new Date(date));
