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

export const baseWebsocketURL = () =>
  process.env.NODE_ENV === "production"
    ? "wss://alizemani.ir/realtime"
    : "ws://127.0.0.1:8788/realtime";

export const isOwner = () => {
  return isDev();
};

export const timeFilter = [
  {
    label: "امروز",
    filter: 24 * 60 * 60,
  },
  {
    label: "هفته",
    filter: 7 * 24 * 60 * 60,
  },
  {
    label: "ماه",
    filter: 30 * 24 * 60 * 60,
  },
  {
    label: "سال",
    filter: 365 * 24 * 60 * 60,
  },
];
export const ticketStatus = [
  {
    id: "new",
    label: "جدید",
  },
  {
    id: "open",
    label: "باز",
  },
  {
    id: "on-going",
    label: "در درست بررسی",
  },
  {
    id: "close",
    label: "بسته",
  },
];
export const streamOrder = [
  {
    label: "جدیدترین",
    filter: "desc",
  },
  {
    label: "قدیمی‌ترین",
    filter: "asc",
  },
];
export const credToJSON = (x: any = {}): any => {
  if (x instanceof ArrayBuffer) return x;
  if (Array.isArray(x)) {
    const arr = [];
    for (const i of x) arr.push(credToJSON(i));
    return arr;
  }
  if (x != null && typeof x === "object") {
    const obj: any = {};
    for (const key in x)
      if (typeof x[key] !== "function") obj[key] = credToJSON(x[key]);
    return obj;
  }
  return x;
};

export const file2Base64 = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString() || "");
    reader.onerror = (error) => reject(error);
  });
};

export const resizeImage = async (file: File, size: number): Promise<File> => {
  size ??= 256;

  const canvas = document.createElement("canvas");
  const ctx: any = canvas.getContext("2d");

  canvas.width = size;
  canvas.height = size;

  const bitmap = await createImageBitmap(file);
  const { width, height } = bitmap;

  const ratio = Math.max(size / width, size / height);

  const x = (size - width * ratio) / 2;
  const y = (size - height * ratio) / 2;

  ctx.drawImage(
    bitmap,
    0,
    0,
    width,
    height,
    x,
    y,
    width * ratio,
    height * ratio,
  );

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob: any) => {
        resolve(blob);
      },
      "image/webp",
      1,
    );
  });
};

export const validateEmail = (email: string) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
};
