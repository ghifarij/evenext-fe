import { toZonedTime, format } from "date-fns-tz";

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function formatTime(dateString: string) {
  const localTimeZone = "Asia/Jakarta";
  const utcDate = new Date(dateString);
  const zonedDate = toZonedTime(utcDate, localTimeZone);
  const time = format(zonedDate, "HH:mm");
  return `${time} WIB`;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}
