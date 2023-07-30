import moment from "moment-jalaali";

moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });
moment().format("jYYYY/jM/jD");

export const JalaliDate = (input: string) => {
  return moment(new Date(input)).format("jDD jMMMM jYYYY");
};

export const isDev = () => process.env.NODE_ENV !== "production";
export const baseApiURL = () =>
  process.env.NODE_ENV === "production"
    ? "https://alizemani.ir/functions/"
    : "http://127.0.0.1:8788/functions/";
