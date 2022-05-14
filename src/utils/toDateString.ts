import {
  formatDistanceToNowStrict,
  isToday,
  isYesterday,
  format,
} from "date-fns";
import { ru } from "date-fns/locale";

function toDateString(createdAt: string) {
  const createdAtDate = new Date(createdAt);
  const date = isToday(createdAtDate)
    ? "Сегодня"
    : isYesterday(createdAtDate)
    ? "Вчера"
    : formatDistanceToNowStrict(createdAtDate, {
        unit: "day",
        addSuffix: true,
        locale: ru,
      });

  const time = format(createdAtDate, "p 'i-'O", {
    locale: ru,
  });

  return `${date}, ${time}`;
}

export default toDateString;
