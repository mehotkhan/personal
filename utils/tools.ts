import moment from "moment-jalaali";

moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });
moment().format("jYYYY/jM/jD");

export const JalaliDate = (input: string) => {
  return moment(new Date(input)).format("jDD jMMMM jYYYY");
};
