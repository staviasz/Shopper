import { parse, parseISO } from 'date-fns';

export const convertDatetimeStringToDate = (dateString: string): Date | null => {
  const isoDate = parseISO(dateString);

  if (isoDate.getTime()) {
    return isoDate;
  }

  const customDate = parse(dateString, 'dd/MM/yyyy HH:mm:ss', new Date());

  if (customDate.getTime()) {
    return customDate;
  }

  return null;
};
