/* eslint-disable import/no-named-as-default-member */
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import jalaliday from "jalaliday";

dayjs.extend(relativeTime);
dayjs.extend(jalaliday);
dayjs.locale("fa");

export const FromNow = (time: string | number) => {
  return time
    ? dayjs(time)
        .fromNow()
        .replace(/\d/g, (d: any) => "۰۱۲۳۴۵۶۷۸۹"[d])
    : "...";
};
