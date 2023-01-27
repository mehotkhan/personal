import moment from "moment-jalaali";
import * as _ from "lodash";
import fa from "moment/src/locale/fa";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import jalaliday from "jalaliday";

dayjs.extend(relativeTime);
dayjs.extend(jalaliday);
dayjs.locale("fa");
moment.locale("fa", fa);
moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });
moment().format("jYYYY/jM/jD");

export const JalaliDate = (input: any[]) => {
  return moment(input, "YYYY-MM-DD").format("jDD jMMMM jYYYY");
};
export const orderByDate = (input: any[]) =>
  _.orderBy(
    input,
    [
      (item: any) => {
        return moment(item.date).format("YYYY-MM-DD");
      },
    ],
    ["desc"]
  );

export const OrderByFrom = (input: any[]) =>
  _.orderBy(input, ["from"], ["desc", "asc"]);
export const OrderChat = (input: any[]) =>
  _.orderBy(input, ["latestTime", "name"], ["desc", "asc"]);

export const OrderByFromReverse = (input: any[]) => {
  return _.orderBy(input, ["time"], ["desc"]);
};

export const FromNow = (time: string) =>
  dayjs ? dayjs(time).fromNow() : "...";
export const isDev = () => process.env.NODE_ENV !== "production";
