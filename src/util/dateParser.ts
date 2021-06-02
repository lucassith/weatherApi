export function dateParser(date: Date) {
  const dd: string = String(date.getDate()).padStart(2, '0');
  const mm: string = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy: number = date.getFullYear();

  return {
    dd,
    mm,
    yyyy,
  };
}

export function fiveDaysLaterDate(date: Date) {
  const laterDate = new Date(date);
  laterDate.setDate(date.getDate() + 5);
  return dateParser(laterDate);
}
