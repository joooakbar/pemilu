export function useFormatDate(date: Date) {
  return new Date(date).toLocaleString("id-ID");
}
