export type DateCleanFormat = {
  year: number;
  month: number;
  day: number;
  formatedDate: string;
};

export function cleanDate(date: string): DateCleanFormat {
  const newDate = date.replace(/\s+/g, '');
  const [monthString, dayString, yearString] = newDate.split('-');
  const year = Number(yearString);
  const month = Number(monthString);
  const day = Number(dayString);
  return { year, month, day, formatedDate: `${monthString}-${dayString}-${yearString}` };
}
