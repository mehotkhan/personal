// @ts-nocheck
/* eslint no-useless-escape: "off", camelcase: "off" */

import Gun from "gun";
import "gun/sea";
import _ from "./lodash";

let isNode = false;
try {
  isNode =
    Object.prototype.toString.call(global.process) === `[object process]`;
} catch (e) {
  null;
}

const userAgent =
  !isNode &&
  navigator &&
  navigator.userAgent &&
  navigator.userAgent.toLowerCase();
const isElectron = userAgent && userAgent.includes(" electron/");

const isMobile =
  !isNode &&
  (function () {
    if (isElectron) {
      return false;
    }
    let check = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor || "");
    return check;
  })();

function gunAsAnotherUser(gun: any, key: any, f: Function) {
  // Hacky way to use multiple users with gun
  const gun2 = new Gun({ radisk: false, peers: Object.keys(gun._.opt.peers) }); // TODO: copy other options too
  const user = gun2.user();
  user.auth(key);
  setTimeout(() => {
    // @ts-ignore
    const peers = Object.values(gun2.back("opt.peers"));
    peers.forEach((peer) => {
      // @ts-ignore
      gun2.on("bye", peer);
    });
  }, 20000);
  return f(user);
}

function gunOnceDefined(node: any) {
  return new Promise((resolve) => {
    node.on((val: any, _k: any, _a: any, eve: any) => {
      if (val !== undefined) {
        eve.off();
        resolve(val);
      }
    });
  });
}

const animals = [
  "سانان",
  "فلیدها",
  "گربه",
  "گاو",
  "سگ",
  "خر",
  "بز",
  "اسب",
  "خوک",
  "خرگوش",
  "مورچه خوار",
  "گرگ قرمز",
  "آلباتروس",
  "تمساح",
  "آلپاکا",
  "دوزیست",
  "آناکوندا",
  "فرشته ماهی",
  "ماهی ماهیگیری",
  "مورچه",
  "بزکوهی",
  "آنلیون",
  "بوزینه",
  "شته",
  "آرمادیلو",
  "asp",
  "بابون",
  "گورکن",
  "باندیکوت",
  "بارناکل",
  "باراکودا",
  "ریحان",
  "صدای بم",
  "خفاش",
  "خرس",
  "سگ ابی",
  "ساس",
  "زنبور عسل",
  "سوسک",
  "پرنده",
  "گاومیش کوهان دار امریکایی",
  "پرنده سیاه",
  "بوآ",
  "گراز",
  "گربه وحشي",
  "bobolink",
  "بونوبو",
  "مهم",
  "بووید",
  "حشره",
  "پروانه",
  "زوزک",
  "شتر",
  "کنید",
  "کاپیبارا",
  "اصلی",
  "کاریبو",
  "کپور",
  "کوسه گربه ای",
  "کرم ابریشم",
  "گربه ماهی",
  "هزار پا",
  "سفالوپود",
  "آفتابپرست",
  "یوزپلنگ",
  "سوخته",
  "جوجه",
  "شامپانزه",
  "چینچیلا",
  " سنجاب ",
  "صدف",
  "دلقک ماهی",
  "کبرا",
  "کد",
  "کندور",
  "مرجان",
  "گربه وحشی پشمالو",
  "کایوت",
  "خرچنگ",
  "جرثقیل",
  "کروداد",
  "کریکت",
  "کلاغ",
  "فاخته",
  "سیکادا",
  "دوستانه",
  "گوزن",
  "دینگو",
  "دایناسور",
  "دلفین",
  "خوابگاه",
  "کبوتر",
  "سنجاقک",
  "اژدها",
  "اردک",
  "عقاب",
  "کرم خاکی",
  "کلاه گوش",
  "اکیدنا",
  "مارماهی",
  "پشیمانی",
  "فیل",
  "ایمو",
  "گلدان",
  "شاهین",
  "موش خرما",
  "فینچ",
  "کرم شب تاب",
  "ماهی",
  "فلامینگو",
  "کک",
  "پرواز",
  "ماهی پرنده",
  "مرغ",
  "روباه",
  "قورباغه",
  "مرغ بازی",
  "گالی شکل",
  "غزال",
  "جکو",
  "گربیل",
  "گیبون",
  "زرافه",
  "ماهی قرمز",
  "غاز",
  "گوفر",
  "گوریل",
  "ملخ",
  "گوان",
  "گواناکو",
  "مرغ گینه",
  "گوپی",
  "هادوک",
  "نوعی ماهی پهن بزرگ",
  "همستر",
  "حریر",
  "خارپشت",
  "حواصیل",
  "اسب ابی",
  "کرم قلابدار",
  "هورنت",
  "هور مگس",
  "زرین پر, زرین بال",
  "کفتار",
  "ایگوانا",
  "ایمپالا",
  "شغال",
  "جگوار",
  "جی",
  "عروس دریایی",
  "پرنده جنگلی",
  "کانگورو",
  "شنگ ماهی",
  "بادبادک",
  "کیوی",
  "کوآلا",
  "کوی",
  "کریل",
  "کفشدوزک",
  "لامپری",
  "پرندگان خشکی",
  "خرد",
  "زالو",
  "لمینگ",
  "لمور",
  "پلنگ",
  "لئوپون",
  "لنگ زدن",
  "شیر نر",
  "مارمولک",
  "لاما",
  "لون",
  "شپش",
  "ماهی ریه",
  "سیاه گوش",
  "ماکائو",
  "ماهی خال مخالی",
  "زاغی",
  "پستاندار",
  "گانه دریایی",
  "ماندریل",
  "مارلین",
  "مارموست",
  "مارموت",
  "جانور کیسه دار",
  "مارتن",
  "ماستودون",
  "چمنزار",
  "میکرات",
  "راسو",
  "minnow",
  "میت",
  "مرغ مقلد",
  "خال",
  "نرم تنان",
  "مونگوس",
  "میمون",
  "گوزن شمالی",
  "پشه",
  "موش",
  "قاطر",
  "مسکوکس",
  "ناروال",
  "جدید",
  "بلبل",
  "اوسلوت",
  "اختاپوس",
  "اپوسوم",
  "اورانگوتان",
  "اورکا",
  "شتر مرغ",
  "سمور",
  "جغد",
  "پاندا",
  "پاراکیت",
  "طوطی",
  "طوطی ماهی",
  "کبک",
  "طاووس",
  "پلیکان",
  "پنگوئن",
  "پرچ",
  "قرقاول",
  "پیک",
  "نقطه دار",
  "پیرانا",
  "پلانیری",
  "پلاتیپوس",
  "تسویه حساب",
  "جوجه تیغی",
  "گرازماهی",
  "پوسوم",
  "میگو",
  "پترمیگان",
  "پفین",
  "پوما",
  "پایتون",
  "بلدرچین",
  "کوله",
  "کووکا",
  "راکون",
  "مار زنگی",
  "کلاغ سیاه",
  "خزنده",
  "کرگدن",
  "رودرانر",
  "جونده",
  "روک",
  "خروس",
  "کرم گرد",
  "ماهی بادبانی",
  "سمندر",
  "ماهی سالمون",
  "ماهی اره ای",
  "اسکالوپ",
  "عقرب",
  "اسب دریایی",
  "کوسه",
  "گوسفند",
  " زیرک ",
  "ماهی نقره ای",
  "پوست",
  "اسکانک",
  "تنبلی",
  "لز",
  "بوی",
  "حلزون",
  "مار",
  "چتنه",
  "تنها",
  "گنجشک",
  "عنکبوت",
  "قاشق قاشقی",
  "ماهی مرکب",
  "سنجاب",
  " ستاره دریایی",
  "سفره ماهی",
  "استوت",
  "لک لک",
  "ماهیان خاویاری",
  "بلع",
  "قو",
  "سریع",
  "اره ماهی",
  "دم شمشیری",
  "گرفتن",
  " تاپیر",
  "رتیل",
  "تارسیتر",
  " موریانه",
  "ترن",
  "برفک",
  "تیک",
  "ببر",
  "تیگلون",
  "غوک",
  "لاک پشت",
  "توکان",
  "ماهی قزل آلا",
  "ماهی تن",
  "بوقلمون",
  "تیرانوزاروس",
  "اوریال",
  "ویکونا",
  "افعی",
  "ول",
  "کرکس",
  "کانگورویی با قد متوسط",
  "گراز دریایی",
  "زنبور",
  "جنگ زن",
  "نهنگ",
  "ویپت",
  "ماهی سفید",
  "گربه وحشی",
  "وحشی",
  "پرنده وحشی",
  "گرگ",
  "ولورین",
  "وومبت",
  "دارکوب",
  "کرم",
  "ورن",
  "xerinae",
  "یاک",
  "گورخر",
  "گیال",
  "اسب تک شاخ",
];

const adjectives = [
  "بزرگ",
  "غول آسا",
  "چاق",
  "غول پیکر",
  "عالی",
  "عظیم",
  "طولانی",
  "مینیاتور",
  "ریزه ریز",
  "کوچک",
  "کوتاه",
  "کم اهمیت",
  "بلند قد",
  "غلیان",
  "نسیم",
  "شکسته شده",
  "پر از دست انداز",
  "سرد",
  "عجیب و غریب",
  "کج",
  "نوازش",
  "فرفری",
  "آسیب دیده",
  "نم",
  "کثیف",
  "خشک",
  "غبارآلود",
  "پوسته پوسته",
  "کرکی",
  "خیس",
  "گسترده",
  "چاق و چله",
  "منحنی",
  "عمیق",
  "تخت",
  "بالا",
  "توخالی",
  "کم",
  "محدود, تنگ",
  "گرد",
  "کم عمق",
  "لاغر",
  "مربع",
  "شیب تند",
  "سر راست",
  "وسیع",
  "کهن",
  "مختصر",
  "زود",
  "سریع",
  "دیر",
  "نوین",
  "قدیمی",
  "آهسته. تدریجی",
  "جوان",
  "فراوان",
  "خالی",
  "تعداد کمی",
  "سنگین",
  "سبک",
  "زیاد",
  "تعدادی",
  "صدا",
  "غوغ زدن",
  "از هوش رفتن",
  "خشن",
  "خش خش",
  "خاموش",
  "هاسکی",
  "بلند",
  "ملودیک",
  "نالیدن",
  "لال",
  "پر سر و صدا",
  "ساکت",
  "طنین دار",
  "جیغ زدن",
  "تیز",
  "بی صدا",
  "نرم",
  "صدای جیغ دادن",
  "زمزمه کردن",
  "تلخ",
  "خوشمزه - لذیذ",
  "تازه",
  "آبدار",
  "رسیده",
  "فاسد",
  "شور",
  "ترش",
  "تند",
  "کهنه",
  "چسبنده",
  "قوی",
  "شیرین",
  "بی مزه",
  "خوش طعم",
  "تشنه",
  "بال زدن",
  "درهم",
  "چرب",
  "خاکی",
  "سخت",
  "داغ",
  "یخی",
  "شل",
  "ذوب شده",
  "پلاستیک",
  "خاردار",
  "بارانی",
  "پراکنده",
  "شگی",
  "لرزنده",
  "لرزیدن",
  "ابریشمی",
  "لزخی",
  "لغزنده",
  "صاف",
  "جامد",
  "ثابت",
  "مناقصه",
  "تنگ",
  "ناهموار. ناجور",
  "ضعیف",
  "چوبی",
  "ترس",
  "خشمگین",
  "آزار",
  "مشتاق",
  "متکبر",
  "شرمنده",
  "خیلی بد و ناخوشایند",
  "بد",
  "گیج",
  "خسته",
  "مبارزه",
  "محکوم",
  "سردرگم",
  "ظالمانه",
  "خطرناک",
  "شکست داد",
  "متعصب",
  "افسرده",
  "منزجر",
  "مختل",
  "وهم انگیز",
  "خجالت زده",
  "حسادت",
  "شر",
  "احمق",
  "از کوره در رفته",
  "وحشت زده",
  "غمگین",
  "درمانده",
  "خانه به دوش",
  "گرسنه",
  "صدمه",
  "بیمار",
  "تنها",
  "اسرار امیز",
  "شیطون",
  "عصبی",
  "ناراحت کننده - شدیدا ناخوشایند",
  "دفع کننده",
  "ترسناک",
  "مسخره",
  "خود خواه",
  "درد",
  "زمان فعل",
  "وحشتناک",
  "بی فکر",
  "مشکل دار",
  "ناراحت",
  "بالا بردن",
  "شرور",
  "نگران",
  "موافق",
  "سرگرم شده",
  "شجاع",
  "آرام",
  "جذاب کننده",
  "بشاش",
  "راحت",
  "تعاونی",
  "لذت بخش",
  "مشخص",
  "خوشحال",
  "افسون کننده",
  "تشویق کننده",
  "پر انرژی",
  "شوق",
  "برانگیخته",
  "نمایشگاه",
  "با ایمان",
  "خارق العاده",
  "خوب",
  "دوستانه",
  "خنده دار",
  "لطیف",
  "با شکوه",
  "سالم",
  "مفید",
  "شاد",
  "نوع",
  "زنده",
  "دوست داشتني",
  "خوش شانس",
  "اطاعت",
  "کامل",
  "دلپذیر",
  "مغرور",
  "احمقانه",
  "خندان",
  "بسیار",
  "موفقیت آمیز",
  "متفکر",
  "پیروز",
  "سرزنده",
  "شوخ",
  "شگفت انگیز",
  "غیور",
  "دیوونه",
  "دیگر",
  "جدید",
  "ناهمسان",
  "محلی",
  "اجتماعی",
  "مهم",
  "ملی",
  "بریتانیایی",
  "درست",
  "ممکن",
  "مقدار کمی",
  "سیاسی",
  "توانا",
  "عمومی",
  "پر شده",
  "دور",
  "در دسترس",
  "اصلی",
  "مطمئن",
  "روشن",
  "عمده",
  "اقتصادی",
  "فقط",
  "احتمال دارد",
  "واقعی",
  "سیاه",
  "خاص",
  "بین المللی",
  "ویژه",
  "دشوار",
  "مسلم - قطعی",
  "باز کن",
  "کل",
  "سفید",
  "رایگان",
  "آسان",
  "اروپایی",
  "مرکزی",
  "مشابه",
  "انسان",
  "مشترک",
  "لازم",
  "شخصی",
  "خصوصی",
  "فقیر",
  "مالی",
  "خارجی",
  "ساده",
  "اخیر",
  "آمریکایی",
  "مختلف",
  "بستن",
  "انگلیسی",
  "اشتباه",
  "حاضر",
  "سلطنتی",
  "طبیعی",
  "فرانسوی",
  "نیهیلیست",
  "سالیپسیست",
  "ماتریالیست",
  "سوررئالیست",
  "قهرمانانه",
  "لذت طلب",
  "چرند",
  "جاری",
  "کار یدی",
  "مجاز",
  "نهایی",
  "قرمز",
  "معمولی",
  "جدی",
  "قبلی",
  "جمع",
  "نخست",
  "قابل توجه",
  "صنعتی",
  "متاسف",
  "مرده",
  "مناسب",
  "شوروی",
  "پایه ای",
  "نظامی",
  "آگاه",
  "عزیز",
  "محبوب",
  "حرفه ای",
  "مستقیم",
  "تاریک",
  "آماده",
  "سبز",
  "تاثیر گذار",
  "غربی",
  "سنتی",
  "اسکاتلندی",
  "آلمانی",
  "مستقل",
  "جالب هست",
  "گرفتار",
  "فیزیکی",
  "موجود",
  "مسئول",
  "پزشکی",
  "آبی",
  "اضافی",
  "گذشته",
  "نر",
  "علاقه مند",
  "ضروری",
  "زیبا",
  "مدنی",
  "اولیه",
  "واضح",
  "آینده",
  "محیطی",
  "مثبت",
  "ارشد",
  "هسته ای",
  "سالانه",
  "مربوط",
  "ثروتمند",
  "تجاری",
  "بی خطر",
  "منطقه ای",
  "کاربردی",
  "رسمی",
  "جداگانه, مجزا",
  "کلید",
  "رئیس",
  "منظم",
  "ناشی از",
  "فعال",
  "قدرتمند",
  "پیچیده",
  "استاندارد",
  "غیرممکن",
  "گرم",
  "وسط",
  "جنسی",
  "جلو",
  "داخلی",
  "متحد",
  "فنی",
  "ارزان",
  "عجیب",
  "درونی؛ داخلی",
  "پتانسیل",
  "شمالی",
  "دینی",
  "خیلی",
  "مشهور",
  "فرهنگی",
  "محدود",
  "محافظه کار",
  "معمول",
  "با مسئولیت محدود",
  "ناتوان",
  "روستایی",
  "میانگین",
  "منتهی شدن",
  "معقول",
  "فوری",
  "برابر",
  "جزئیات",
  "کار کردن",
  "به طور کلی",
  "مونث",
  "دموکراتیک",
  "رو به رشد",
  "کافی",
  "علمی",
  "شرقی",
  "inc",
  "ایرلندی",
  "گران",
  "آموزشی",
  "ذهنی",
  "بحرانی",
  "افزایش یافت",
  "آشنا",
  "بعید",
  "دو برابر",
  "تاریخی",
  "روزانه",
  "جنوبی",
  "افزایش",
  "وحشی",
  "شهری",
  "متاهل",
  "لیبرال",
  "فرض",
  "آشکار",
  "مشغول",
  "خونین",
  "آماده شده",
  "روسی",
  "اخلاقی",
  "مراقب",
  "تمیز",
  "جذاب",
  "ژاپنی",
  "حیاتی",
  "ضخیم",
  "جایگزین",
  "مسن",
  "نادر",
  "قادر",
  "خاکستری",
  "غافلگیر شدن",
  "ایده آل",
  "جزئی",
  "راضی",
  "شدید",
  "شرکت های بزرگ, دارای شخصیت حقوقی",
  "منفی",
  "دائمی",
  "رنگ قهوه ای",
  "اساسی",
  "فرد",
  "درونی",
  "استفاده شده",
  "جنایی",
  "امروزی",
  "نزدیک",
  "رومی",
  "منحصر بفرد",
  "ثانوی",
  "پارلمان",
  "آفریقایی",
  "ناشناخته",
  "متعاقب",
  "گناهکار",
  "زرد",
  "غیر معمول",
  "خالص",
  "سخت است",
  "باقی",
  "کشاورزی",
  "بسيار خوب",
  "ایتالیایی",
  "مدیر",
  "کارآمد",
  "چینی ها",
  "نسبت فامیلی",
  "مرسوم",
  "مایل بودن",
  "ناگهانی",
  "پیشنهاد شده",
  "داوطلبانه",
  "خفیف",
  "ارزشمند",
  "نمایشی",
  "طلایی",
  "موقت",
  "فدرال",
  "هندی",
  "رنگ پریده",
  "قانونی",
  "ولش",
  "وابسته",
  "محکم",
  "رقابتی",
  "مسلح",
  "افراطی",
  "خارج از",
  "قابل قبول",
  "حساس",
  "زندگي كردن",
  "جهانی",
  "عاطفی",
  "راز",
  "کافی است",
  "درست شد",
  "اداری",
  "همه جانبه",
  "شگفت آور",
  "جرم",
  "درخشان",
  "بیشترین",
  "مطلق",
  "الکترونیکی",
  "دیداری",
  "الکتریکی",
  "اسپانیایی",
  "ادبی",
  "ادامه",
  "برترین",
  "شیمیایی",
  "اصل",
  "هیجان انگیز",
  "نوشته شده است",
  "پیشرفته",
  "مفرط",
  "کلاسیک",
  "مورد علاقه",
  "بطور گسترده",
  "مقابل",
  "متمایز",
  "دیوانه",
  "داده شده",
  "معلول",
  "استوار",
  "پایدار",
  "مشروطه",
  "هوشیار, آگاه",
  "در حال توسعه",
  "راهبردی",
  "مقدس",
  "غالب",
  "از راه دور",
  "نظری",
  "بی نظیر",
  "رنگ صورتی",
  "بالینی",
  "کمترین",
  "صادق",
  "چشمگیر",
  "مسکونی",
  "جلگه",
  "قابل رویت",
  "دقیق",
  "غیر صمیمی",
  "هنوز",
  "یونانی",
  "بغرنج",
  "موسیقی",
  "پولی",
  "روانشناسی",
  "بیکار",
  "اجتناب ناپذیر",
  "سپاسگزار",
  "ساختاری",
  "خوش آمدی",
  "کر",
  "در بالا",
  "مداوم",
  "کور",
  "خارج از کشور",
  "منظور داشتن",
  "حق",
  "گاه به گاه",
  "مشهود",
  "مستاصل",
  "همکار",
  "معادل",
  "پر فکر",
  "ویکتوریا",
  "مرحله",
  "خلاق",
  "گمشده",
  "قرون وسطایی",
  "باهوش",
  "وابسته به زبانشناسی",
  "متقاعد",
  "قضایی",
  "خام",
  "خواب",
  "آسیب پذیر",
  "غیر مجاز",
  "بیرونی",
  "انقلابی",
  "تغییر",
  "استرالیایی",
  "بومی",
  "امپراتوری",
  "سخت گیرانه",
  "عاقلانه",
  "دوستانه و غیر رسمی",
  "قابل انعطاف",
  "جمعی",
  "زود زود",
  "تجربی",
  "معنوی",
  "گویا",
  "سخاوتمندانه",
  "ناکافی",
  "برجسته",
  "منطقی",
  "لخت",
  "فروتن",
  "هلندی",
  "حاد",
  "معتبر",
  "هفتگی",
  "درخت",
  "اتوماتیک",
  "قابل اعتماد",
  "متقابل",
  "چندین",
  "حکم",
  "مدیریت",
  "باردار",
  "لاتین",
  "همسان",
  "رضایتبخش",
  "حاشیه ای",
  "انتخابی",
  "ریاست جمهوری",
  "بحث برانگیز",
  "هر روز",
  "ارگانیک. آلی",
  "انتظار می رود",
  "آماری",
  "مطلوب",
  "بی گناه",
  "بهبود یافته",
  "انحصاری",
  "علامت گذاری شده",
  "با تجربه",
  "غیر منتظره",
  "خالص, ناب",
  "ناامید",
  "معده",
  "رومانتیک",
  "برهنه",
  "بی میل",
  "باشکوه",
  "ایجاد",
  "بسته",
  "نا معلوم",
  "ساختگی",
  "دیپلماتیک",
  "دریایی",
  "مکانیکی",
  "خرده فروشی",
  "سازمانی",
  "مخلوط",
  "بیولوژیکی",
  "شناخته شده",
  "عملکردی",
  "راست",
  "برتر",
  "دیجیتال",
  "دیدنی و جذاب - تماشایی",
  "ناراضی",
  "غیر منصفانه",
  "خشونت آمیز",
  "یدکی",
  "دردناک",
  "چکیده",
  "آسیایی",
  "مرتبط است",
  "مقننه",
  "ماهانه",
  "صریح",
  "زننده",
  "رنگی",
  "مسخره - مضحک",
  "قابل مقایسه",
  "پی در پی",
  "واقع بین",
  "بازگشت",
  "نجیب",
  "غیر متمرکز",
  "بیت کوین",
  "سایفرپانک",
  "غیر ضروری",
  "پرواز",
  "تصادفی",
  "موثر",
  "کدر",
  "ژنتیکی",
  "شیک",
  "غول",
  "امن است",
  "پایین",
  "ماهر",
  "نامحسوس",
  "ظریف",
  "کمتر",
  "موازی",
  "متمرکز",
  "گرمسیری",
  "جزئي",
  "مقدمه ای",
  "بتن",
  "ادعا",
  "دستیار",
  "عمودی",
  "شغلی",
  "بیش از اندازه",
  "ترقی خواه",
  "استثنایی",
  "یکپارچه",
  "قابل توجه, برجسته, موثر",
  "قاره",
  "باشه",
  "ترکیب شده",
  "خوش قیافه",
  "مشخصه",
  "مزمن",
  "اجباری",
  "هدف, واقعگرایانه",
  "شعبده بازي",
  "نظام",
  "مجبور",
  "قابل پرداخت",
  "سرگرمی",
  "ناگوار",
  "ایدئولوژیک",
  "شهر بزرگ",
  "اطراف",
  "تخمین زده",
  "صلح آمیز",
  "نخستین",
  "عملیاتی",
  "فناوری",
  "مشاوره",
  "خصومت آمیز",
  "گرانبها",
  "تحت تاثیر قرار",
  "هوشمندانه",
  "بی پایان",
  "جدا شده",
  "مست",
  "جغرافیایی",
  "پسندیدن",
  "پویا",
  "حوصله سر بر",
  "مایه تاسف",
  "قطعی",
  "فوق العاده",
  "غیر مستقیم",
  "سفت",
  "بی دست و پا - به شکلی نامناسب",
  "خنثی",
  "هنری",
  "محتوا",
  "بالغ",
  "استعماری",
  "جاه طلب",
  "مغناطیسی",
  "کلامی",
  "مشروع",
  "همدل",
  "سر",
  "مبهم",
  "به اشتراک گذاشته شده",
  "اضافه",
  "بهت زده",
  "واجد شرایط",
  "جای خالی",
  "غایب",
  "لهستانی",
  "اسرائیلی",
  "توسعه یافته",
  "نماینده",
  "کاهش",
  "ساحلی",
  "سوئیس",
  "تمدید شده",
  "انتخاب شد",
  "کانادایی",
  "جسورانه",
  "متناظر",
  "دویدن",
  "برنامه ریزی شده",
  "متفقین",
  "مقایسه ای",
  "حفاظت",
  "سازنده",
  "سودمند",
  "حداقل",
  "سیار",
  "ترکی",
  "نارنجی",
  "عقب",
  "منفعل",
  "مشکوک",
  "غافلگیر کننده",
  "کشنده",
  "نتیجه",
  "نمادین",
  "ثبت شده",
  "همسایه",
  "غیر مرتبط",
  "صبور",
  "فشرده - جمع و جور",
  "سودآور",
  "رقیب",
  "وفادار",
  "در حد متوسط",
  "متغیر",
  "مدیریتی",
  "مولکولی",
  "المپیک",
  "خطی",
  "آینده نگر",
  "چاپ شده",
  "والدین",
  "گوناگون, متنوع",
  "دارای جزئیات - بسیط",
  "عصبانی",
  "سوزش",
  "بلا استفاده",
  "معنی",
  "ذاتی",
  "فلسفی",
  "حساب شده",
  "بیدار",
  "امیدبخش",
  "ناخوشایند",
  "متنوع",
  "شیب دار",
  "پنهان",
  "شایسته",
  "حد واسط",
  "محافظت کننده",
  "خوشبخت",
  "دفاعی",
  "الهی",
  "گیر",
  "رانندگی",
  "نامرئی",
  "گمراه کننده",
  "ریاضی",
  "نامناسب",
  "مایع",
  "خورشیدی",
  "کتابچه راهنمای",
  "معماری",
  "باورنکردنی",
  "فداکار",
  "قبل",
  "تراژیک",
  "قابل احترام",
  "خوش بینانه",
  "قانع کننده",
  "غیر قابل قبول",
  "قاطع",
  "لایق",
  "فضایی",
  "الزام آور",
  "پرستاری",
  "سمی",
  "انتخاب کنید",
  "زائد",
  "سپس",
  "احتمالی",
  "آماتور",
  "عاشق",
  "گذر",
  "مشخص شده",
  "سرزمینی",
  "افقی",
  "شناختی",
  "تنظیمی",
  "بدبخت",
  "ساکن",
  "با ادب",
  "ترسیده",
  "گوتیک",
  "غیرنظامی",
  "سوء",
  "کره ای",
  "ناخودآگاه",
  "ناشناس",
  "زیبایی",
  "ارتدوکس",
  "ایستا",
  "غافل",
  "هزینه بر",
  "مد",
  "علت",
  "سازگار",
  "کوچولو",
  "ضمنی",
  "دوگانه",
  "رو به جلو",
  "بقا",
  "رنگ بنفش",
  "احتیاط",
  "بازدید",
  "تجمیع",
  "نوجوان",
  "در حال مرگ",
  "فاجعه بار",
  "محرمانه",
  "زیرزمینی",
  "خود مختار",
  "اتمی",
  "منجمد",
  "رنگارنگ",
  "مجروح",
  "لباس فرم",
  "رو به افزایش",
  "کم رو",
  "رمان",
  "متعادل",
  "خودسرانه",
  "همجوار",
  "نگران کننده",
  "بدون تغییر",
  "متحرک",
  "تکاملی",
  "صمیمی",
  "ورزشی",
  "انضباطی",
  "تدریجی",
  "متهم",
  "حمایت کردن",
  "تجدید",
  "بازنشسته",
  "لاستیک",
  "انتخاب",
  "در فضای باز",
  "شرم آور",
  "ارجح",
  "مخوف",
  "موافقت",
  "تخیلی",
  "حکومت داری",
  "پذیرفته شده",
  "فنی و حرفه ای",
  "متحیر",
  "در سراسر جهان",
  "آفتابی",
  "بزرگترین",
  "خود جوش",
  "بی ادب",
  "وزارتی",
  "خلاقانه",
  "کنترل شده",
  "مفهومی",
  "ناخواسته, بی میل",
  "معنی دار",
  "مغز",
  "شکستنی",
  "کنجکاو",
  "شکننده",
  "خواب آلود",
  "بی علاقه",
  "سرگردان",
  "شایستگی",
  "هشدار",
  "خجالت زدگی",
  "ابری",
  "شلوغ",
  "تفننی",
  "فریبنده",
  "درخشنده",
  "برازنده",
  "گروتسک",
  "خانگی",
  "مه آلود",
  "بی حرکت",
  "گل آلود",
  "براق",
  "دودی",
  "بی عیب",
  "طوفانی",
  "زشت",
  "بدیه",
  "بهتر",
  "دست و پا چلفتی",
  "سرگیجه",
  "نحیف",
  "بد خلق",
  "خارش‌دار",
  "پریشانی",
  "تنبل",
  "ارغوانی",
  "خوشگل",
  "فضول",
  "آجیل",
  "مغذی",
  "سریع ترین",
  "برشته شده",
  "ضعف",
  "خسیس",
  "راه راه",
  "لکه دار",
  "تارت",
  " رام کردن",
  "برنزه",
  "آزموده",
  "محیله",
  "زشت ترین",
  "بی فایده",
  "لذیذ",
];

export default {
  gunOnceDefined,
  gunAsAnotherUser,
  async getHash(str: string, format = `base64`) {
    if (!str) {
      return undefined;
    }
    const hash = await Gun.SEA.work(str, undefined, undefined, {
      name: `SHA-256`,
    });
    if (!hash) {
      throw new Error(`Gun.SEA.work failed for ${str}`);
    }
    if (hash.length > 44) {
      throw new Error(
        `Gun.SEA.work returned an invalid SHA-256 hash longer than 44 chars: ${hash}. This is probably due to a sea.js bug on Safari.`
      );
    }
    if (format === `hex`) {
      return this.base64ToHex(hash);
    }
    return hash;
  },

  capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  },

  generateName() {
    return ` ${_.sample(animals)!} ${_.sample(adjectives)!}`;
  },

  base64ToHex(str: string) {
    const raw = atob(str);
    let result = "";
    for (let i = 0; i < raw.length; i++) {
      const hex = raw.charCodeAt(i).toString(16);
      result += hex.length === 2 ? hex : `0${hex}`;
    }
    return result;
  },

  getCaret(el: HTMLInputElement) {
    if (el.selectionStart) {
      return el.selectionStart;
    } else {
      // @ts-ignore
      if (document.selection) {
        el.focus();
        // @ts-ignore
        const r = document.selection.createRange();
        if (r === null) {
          return 0;
        }
        // @ts-ignore
        const re = el.createTextRange();
        const rc = re.duplicate();
        re.moveToBookmark(r.getBookmark());
        rc.setEndPoint("EndToStart", re);
        return rc.text.length;
      }
    }
    return 0;
  },

  injectCss() {
    const elementId = `irisStyle`;
    if (document.getElementById(elementId)) {
      return;
    }
    const sheet = document.createElement(`style`);
    sheet.id = elementId;
    sheet.innerHTML = `
      .iris-follow-button .hover {
        display: none;
      }

      .iris-follow-button.following:hover .hover {
        display: inline;
      }

      .iris-follow-button.following:hover .nonhover {
        display: none;
      }

      .iris-identicon * {
        box-sizing: border-box;
      }

      .iris-identicon {
        vertical-align: middle;
        border-radius: 50%;
        text-align: center;
        display: inline-block;
        position: relative;
        max-width: 100%;
      }

      .iris-distance {
        z-index: 2;
        position: absolute;
        left:0%;
        top:2px;
        width: 100%;
        text-align: right;
        color: #fff;
        text-shadow: 0 0 1px #000;
        font-size: 75%;
        line-height: 75%;
        font-weight: bold;
      }

      .iris-pie {
        border-radius: 50%;
        position: absolute;
        top: 0;
        left: 0;
        box-shadow: 0px 0px 0px 0px #82FF84;
        padding-bottom: 100%;
        max-width: 100%;
        -webkit-transition: all 0.2s ease-in-out;
        -moz-transition: all 0.2s ease-in-out;
        transition: all 0.2s ease-in-out;
      }

      .iris-card {
        padding: 10px;
        background-color: #f7f7f7;
        color: #777;
        border: 1px solid #ddd;
        display: flex;
        flex-direction: row;
        overflow: hidden;
      }

      .iris-card a {
        -webkit-transition: color 150ms;
        transition: color 150ms;
        text-decoration: none;
        color: #337ab7;
      }

      .iris-card a:hover, .iris-card a:active {
        text-decoration: underline;
        color: #23527c;
      }

      .iris-pos {
        color: #3c763d;
      }

      .iris-neg {
        color: #a94442;
      }

      .iris-identicon img {
        position: absolute;
        top: 0;
        left: 0;
        max-width: 100%;
        border-radius: 50%;
        border-color: transparent;
        border-style: solid;
      }

      .iris-chat-open-button {
        background-color: #1e1e1e;
        color: #fff;
        padding: 15px;
        cursor: pointer;
        user-select: none;
      }

      .iris-chat-open-button svg {
        width: 1em;
      }

      .iris-chat-open-button, .iris-chat-box {
        position: fixed;
        bottom: 0.5rem;
        right: 0.5rem;
        border-radius: 8px;
        font-family: system-ui;
        font-size: 15px;
      }

      .iris-chat-box {
        background-color: #fff;
        max-height: 25rem;
        box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.2);
        height: calc(100% - 44px);
        display: flex;
        flex-direction: column;
        width: 320px;
        color: rgb(38, 38, 38);
      }

      .iris-chat-box.minimized {
        height: auto;
      }

      .iris-chat-box.minimized .iris-chat-header {
        border-radius: 8px;
        cursor: pointer;
      }

      .iris-chat-box.minimized .iris-chat-messages, .iris-chat-box.minimized .iris-typing-indicator, .iris-chat-box.minimized .iris-chat-input-wrapper, .iris-chat-box.minimized .iris-chat-minimize, .iris-chat-box.minimized .iris-chat-close {
        display: none;
      }

      .iris-chat-header {
        background-color: #1e1e1e;
        height: 44px;
        color: #fff;
        border-radius: 8px 8px 0 0;
        text-align: center;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        flex: none;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .iris-chat-header-text {
        flex: 1;
      }

      .iris-online-indicator {
        color: #bfbfbf;
        margin-right: 5px;
        font-size: 12px;
        user-select: none;
        flex: none;
      }

      .iris-online-indicator.yes {
        color: #80bf5f;
      }

      .iris-typing-indicator {
        display: none;
        background-color: rgba(255, 255, 255, 0.5);
        font-size: 12px;
        padding: 2px;
        color: #777;
      }

      .iris-typing-indicator.yes {
        display: block;
      }

      .iris-chat-messages {
        flex: 1;
        padding: 15px;
        overflow-y: scroll;
      }

      .iris-chat-input-wrapper {
        flex: none;
        padding: 15px;
        background-color: #efefef;
        display: flex;
        flex-direction: row;
        border-radius: 0 0 8px 8px;
      }

      .iris-chat-input-wrapper textarea {
        padding: 15px 8px;
        border-radius: 4px;
        border: 1px solid rgba(0,0,0,0);
        width: auto;
        font-size: 15px;
        resize: none;
        flex: 1;
      }

      .iris-chat-input-wrapper textarea:focus {
        outline: none;
        border: 1px solid #6dd0ed;
      }

      .iris-chat-input-wrapper button svg {
        display: inline-block;
        font-size: inherit;
        height: 1em;
        width: 1em;
        overflow: visible;
        vertical-align: -0.125em;
      }

      .iris-chat-input-wrapper button, .iris-chat-input-wrapper button:hover, .iris-chat-input-wrapper button:active, .iris-chat-input-wrapper button:focus {
        flex: none;
        color: #999;
        background-color: transparent;
        font-size: 30px;
        padding: 5px;
        border: 1px solid rgba(0,0,0,0);
        border-radius: 4px;
        margin-left: 5px;
      }

      .iris-chat-input-wrapper button:active, .iris-chat-input-wrapper button:focus {
        outline: none;
        border: 1px solid #6dd0ed;
      }

      .iris-chat-message {
        display: flex;
        flex-direction: column;
        margin-bottom: 2px;
        overflow-wrap: break-word;
      }

      .iris-msg-content {
        background-color: #efefef;
        padding: 6px 10px;
        border-radius: 8px;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
        flex: none;
        max-width: 75%;
      }

      .emoji {
        font-size: 1.3em;
        line-height: 1em;
      }

      .iris-chat-message .emoji-only {
        font-size: 3em;
        text-align: center;
      }

      .iris-seen {
        color: rgba(0, 0, 0, 0.45);
        user-select: none;
      }

      .iris-seen.yes {
        color: #4fc3f7;
      }

      .iris-seen svg {
        width: 18px;
      }

      .iris-delivered-checkmark {
        display: none;
      }

      .delivered .iris-delivered-checkmark {
        display: initial;
      }

      .iris-chat-minimize, .iris-chat-close {
        user-select: none;
        cursor: pointer;
        width: 45px;
        line-height: 44px;
      }

      .iris-chat-message.their {
        align-items: flex-start;
      }

      .iris-chat-message.their + .iris-chat-message.our .iris-msg-content, .day-separator + .iris-chat-message.our .iris-msg-content {
        margin-top: 15px;
        border-radius: 8px 0px 8px 8px;
      }

      .iris-chat-message.their:first-of-type .iris-msg-content {
        border-radius: 0px 8px 8px 8px;
      }

      .iris-chat-message.our:first-of-type .iris-msg-content {
        border-radius: 8px 0px 8px 8px;
      }

      .iris-chat-message.our + .iris-chat-message.their .iris-msg-content, .day-separator + .iris-chat-message.their .iris-msg-content {
        margin-top: 15px;
        border-radius: 0px 8px 8px 8px;
      }

      .iris-chat-message.our {
        align-items: flex-end;
      }

      .iris-chat-message.our .iris-msg-content {
        background-color: #c5ecf7;
      }

      .iris-chat-message .time {
        text-align: right;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.45);
      }

      .iris-non-string {
        color: blue;
      }

      .day-separator {
        display: inline-block;
        border-radius: 8px;
        background-color: rgba(227, 249, 255, 0.91);
        padding: 6px 10px;
        margin-top: 15px;
        margin-left: auto;
        margin-right: auto;
        text-transform: uppercase;
        font-size: 13px;
        color: rgba(74, 74, 74, 0.88);
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
        user-select: none;
      }

      .day-separator:first-of-type {
        margin-top: 0;
      }

      *[contenteditable="true"]:not(:focus) {
        cursor: pointer;
      }

      *[contenteditable="true"] {
        outline: none;
      }

      [placeholder]:empty:before {
        content: attr(placeholder);
        color: #999;
      }

      [placeholder]:empty:focus {
        cursor: text;
      }
      `;
    document.head.prepend(sheet);
  },

  getUrlParameter(sParam: string, sParams: string) {
    const sPageURL = sParams || window.location.search.substring(1);
    const sURLVariables = sPageURL.split("&");
    let sParameterName, i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split("=");
      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined
          ? true
          : decodeURIComponent(sParameterName[1]);
      }
    }
  },

  formatTime(date: Date) {
    // @ts-ignore
    const t: any = date.toLocaleTimeString(undefined, { timeStyle: "short" });
    const s = t.split(":");
    if (s.length === 3) {
      // safari tries to display seconds
      return `${s[0]}:${s[1]}${s[2].slice(2)}`;
    }
    return t;
  },

  formatDate(date: Date) {
    const t = date.toLocaleString(undefined, {
      dateStyle: "short",
      timeStyle: "short",
    });
    const s = t.split(":");
    if (s.length === 3) {
      // safari tries to display seconds
      return `${s[0]}:${s[1]}${s[2].slice(2)}`;
    }
    return t;
  },

  getDaySeparatorText(
    date: Date,
    dateStr: string,
    now?: Date,
    nowStr?: string
  ) {
    if (!now) {
      now = new Date();
      // @ts-ignore
      nowStr = now.toLocaleDateString({ dateStyle: "short" });
    }
    if (dateStr === nowStr) {
      return "today";
    }
    const dayDifference = Math.round((now - date) / (1000 * 60 * 60 * 24));
    if (dayDifference === 0) {
      return "today";
    }
    if (dayDifference === 1) {
      return "yesterday";
    }
    if (dayDifference <= 5) {
      return date.toLocaleDateString(undefined, { weekday: "long" });
    }
    return dateStr;
  },

  getProfileLink(pub: string) {
    return `${window.location.origin}/#/profile/${encodeURIComponent(pub)}`;
  },

  truncateString(s: string, length = 30) {
    return s.length > length ? `${s.slice(0, length)}...` : s;
  },

  createElement(type: string, cls?: string, parent?: HTMLElement) {
    const el = document.createElement(type);
    if (cls) {
      el.setAttribute("class", cls);
    }
    if (parent) {
      parent.appendChild(el);
    }
    return el;
  },

  isNode,
  isElectron,
  isMobile,

  throttle: (func: Function, limit: number) => {
    let inThrottle: boolean;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },
  debounce: (func: Function, delay: number) => {
    let inDebounce: boolean;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => func.apply(context, args), delay);
    };
  },
  sample: (arr: any[]) => arr[Math.floor(Math.random() * arr.length)],
  sampleSize: (arr: any[], size: number) => {
    const shuffled = arr.slice(0);
    let i = arr.length;
    const min = i - size;
    let temp;
    let index;
    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    return shuffled.slice(min);
  },
  defer: (func: Function) => setTimeout(func, 0),
  once: (func: Function) => {
    let called = false;
    return function () {
      if (called) {
        return;
      }
      called = true;
      func.apply(this, arguments);
    };
  },
  omit: (obj: any, keys: string[]) => {
    const newObj = {};
    Object.keys(obj).forEach((key) => {
      if (!keys.includes(key)) {
        newObj[key] = obj[key];
      }
    });
    return newObj;
  },
};
