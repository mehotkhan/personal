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
  "مورچه",
  "بزکوهی",
  "بوزینه",
  "شته",
  "آرمادیلو",
  "بابون",
  "گورکن",
  "باندیکوت",
  "بارناکل",
  "باراکودا",
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
  "حشره",
  "پروانه",
  "زوزک",
  "شتر",
  "کپور",
  "کوسه گربه ای",
  "کرم ابریشم",
  "گربه ماهی",
  "هزار پا",
  "آفتابپرست",
  "یوزپلنگ",
  "جوجه",
  "شامپانزه",
  "سنجاب",
  "صدف",
  "دلقک ماهی",
  "کبرا",
  "مرجان",
  "گربه وحشی پشمالو",
  "کایوت",
  "خرچنگ",
  "کلاغ",
  "گوزن",
  "دایناسور",
  "دلفین",
  "کبوتر",
  "سنجاقک",
  "اژدها",
  "اردک",
  "عقاب",
  "کرم خاکی",
  "مارماهی",
  "فیل",
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
  "غزال",
  "گیبون",
  "زرافه",
  "ماهی قرمز",
  "غاز",
  "گوریل",
  "ملخ",
  "مرغ گینه",
  "هادوک",
  "نوعی ماهی پهن بزرگ",
  "همستر",
  "خارپشت",
  "حواصیل",
  "اسب ابی",
  "کرم قلابدار",
  "هور مگس",
  "کفتار",
  "ایگوانا",
  "ایمپالا",
  "شغال",
  "جگوار",
  "عروس دریایی",
  "پرنده جنگلی",
  "کانگورو",
  "شنگ ماهی",
  "بادبادک",
  "کیوی",
  "کوآلا",
  "کفشدوزک",
  "زالو",
  "لمینگ",
  "لمور",
  "پلنگ",
  "لئوپون",
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
  "جانور کیسه دار",
  "راسو",
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
  "کوچک",
  "کوتاه",
  "کم اهمیت",
  "بلند قد",
  "سرد",
  "عجیب و غریب",
  "کج",
  "فرفری",
  "آسیب دیده",
  "کثیف",
  "خشک",
  "غبارآلود",
  "پوسته پوسته",
  "کرکی",
  "خیس",
  "گسترده",
  "چاق و چله",
  "توخالی",
  "گرد",
  "لاغر",
  "کهن",
  "مختصر",
  "سریع",
  "نوین",
  "قدیمی",
  "جوان",
  "خالی",
  "سنگین",
  "سبک",
  "خشن",
  "خاموش",
  "ملودیک",
  "لال",
  "پر سر و صدا",
  "ساکت",
  "تیز",
  "بی صدا",
  "نرم",
  "تلخ",
  "شور",
  "ترش",
  "تند",
  "کهنه",
  "قوی",
  "شیرین",
  "بی مزه",
  "خوش طعم",
  "تشنه",
  "درهم",
  "چرب",
  "خاکی",
  "سخت",
  "داغ",
  "یخی",
  "شل",
  "ذوب شده",
  "خاردار",
  "بارانی",
  "ابریشمی",
  "لزخی",
  "صاف",
  "جامد",
  "ثابت",
  "ضعیف",
  "چوبی",
  "خشمگین",
  "مشتاق",
  "متکبر",
  "شرمنده",
  "بد",
  "گیج",
  "خسته",
  "مبارزه",
  "محکوم",
  "سردرگم",
  "ظالمانه",
  "خطرناک",
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
  "اسرار آمیز",
  "شیطون",
  "عصبی",
  "ترسناک",
  "مسخره",
  "خود خواه",
  "وحشتناک",
  "بی فکر",
  "مشکل دار",
  "ناراحت",
  "شرور",
  "نگران",
  "موافق",
  "سرگرم شده",
  "شجاع",
  "آرام",
  "بشاش",
  "راحت",
  "خوشحال",
  "افسون کننده",
  "تشویق کننده",
  "پر انرژی",
  "شوق",
  "برانگیخته",
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
  "زنده",
  "دوست داشتني",
  "خوش شانس",
  "دلپذیر",
  "مغرور",
  "احمقانه",
  "خندان",
  "متفکر",
  "پیروز",
  "سرزنده",
  "شوخ",
  "شگفت انگیز",
  "غیور",
  "دیوونه",
  "جدید",
  "ناهمسان",
  "محلی",
  "اجتماعی",
  "مهم",
  "ملی",
  "بریتانیایی",
  "سیاسی",
  "توانا",
  "عمومی",
  "در دسترس",
  "اصلی",
  "مطمئن",
  "روشن",
  "اقتصادی",
  "واقعی",
  "سیاه",
  "خاص",
  "بین المللی",
  "ویژه",
  "دشوار",
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
  "خارجی",
  "ساده",
  "آمریکایی",
  "انگلیسی",
  "حاضر",
  "سلطنتی",
  "طبیعی",
  "فرانسوی",
  "نیهیلیست",
  "سالیپسیست",
  "ماتریالیست",
  "سوررئالیست",
  "چرند",
  "جاری",
  "مجاز",
  "نهایی",
  "قرمز",
  "معمولی",
  "جدی",
  "قبلی",
  "جمع",
  "نخست",
  "صنعتی",
  "متاسف",
  "مرده",
  "مناسب",
  "شوروی",
  "نظامی",
  "آگاه",
  "عزیز",
  "محبوب",
  "حرفه ای",
  "تاریک",
  "سبز",
  "تاثیر گذار",
  "غربی",
  "سنتی",
  "اسکاتلندی",
  "آلمانی",
  "مستقل",
  "گرفتار",
  "مسئول",
  "پزشکی",
  "آبی",
  "اضافی",
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
  "ثروتمند",
  "تجاری",
  "بی خطر",
  "کاربردی",
  "رسمی",
  "رئیس",
  "منظم",
  "فعال",
  "قدرتمند",
  "پیچیده",
  "استاندارد",
  "غیرممکن",
  "متحد",
  "فنی",
  "ارزان",
  "عجیب",
  "شمالی",
  "دینی",
  "مشهور",
  "فرهنگی",
  "محدود",
  "محافظه کار",
  "معمول",
  "با مسئولیت محدود",
  "ناتوان",
  "روستایی",
  "میانگین",
  "معقول",
  "مونث",
  "دموکراتیک",
  "رو به رشد",
  "کافی",
  "علمی",
  "شرقی",
  "ایرلندی",
  "گران",
  "آموزشی",
  "ذهنی",
  "بحرانی",
  "آشنا",
  "بعید",
  "تاریخی",
  "روزانه",
  "جنوبی",
  "افزایش",
  "وحشی",
  "شهری",
  "متاهل",
  "لیبرال",
  "آشکار",
  "مشغول",
  "خونین",
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
  "ایده آل",
  "جزئی",
  "راضی",
  "شدید",
  "منفی",
  "دائمی",
  "جنایی",
  "امروزی",
  "نزدیک",
  "رومی",
  "منحصر بفرد",
  "پارلمان",
  "آفریقایی",
  "ناشناخته",
  "گناهکار",
  "زرد",
  "غیر معمول",
  "خالص",
  "بسيار خوب",
  "ایتالیایی",
  "مدیر",
  "کارآمد",
  "خفیف",
  "ارزشمند",
  "نمایشی",
  "طلایی",
  "موقت",
  "فدرال",
  "هندی",
  "رنگ پریده",
  "قانونی",
  "وابسته",
  "محکم",
  "رقابتی",
  "مسلح",
  "افراطی",
  "قابل قبول",
  "حساس",
  "جهانی",
  "عاطفی",
  "اداری",
  "همه جانبه",
  "شگفت آور",
  "درخشان",
  "مطلق",
  "الکترونیکی",
  "الکتریکی",
  "اسپانیایی",
  "ادبی",
  "شیمیایی",
  "اصل",
  "هیجان انگیز",
  "پیشرفته",
  "مفرط",
  "کلاسیک",
  "متمایز",
  "دیوانه",
  "معلول",
  "استوار",
  "پایدار",
  "مشروطه",
  "در حال توسعه",
  "راهبردی",
  "مقدس",
  "غالب",
  "نظری",
  "بی نظیر",
  "بالینی",
  "صادق",
  "چشمگیر",
  "جلگه",
  "قابل رویت",
  "دقیق",
  "غیر صمیمی",
  "یونانی",
  "بغرنج",
  "موسیقی",
  "شکسته شده",
  "پولی",
  "بیکار",
  "اجتناب ناپذیر",
  "سپاسگزار",
  "ساختاری",
  "کر",
  "کور",
  "خارج از کشور",
  "حق",
  "گاه به گاه",
  "مشهود",
  "مستاصل",
  "همکار",
  "پر فکر",
  "خلاق",
  "گمشده",
  "قرون وسطایی",
  "باهوش",
  "متقاعد",
  "قضایی",
  "خام",
  "خواب",
  "آسیب پذیر",
  "غیر مجاز",
  "بیرونی",
  "انقلابی",
  "استرالیایی",
  "بومی",
  "امپراتوری",
  "دوستانه و غیر رسمی",
  "قابل انعطاف",
  "جمعی",
  "تجربی",
  "معنوی",
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
  "اتوماتیک",
  "قابل اعتماد",
  "متقابل",
  "باردار",
  "لاتین",
  "همسان",
  "رضایتبخش",
  "حاشیه ای",
  "انتخابی",
  "بحث برانگیز",
  "ارگانیک. آلی",
  "آماری",
  "مطلوب",
  "بی گناه",
  "بهبود یافته",
  "انحصاری",
  "علامت گذاری شده",
  "با تجربه",
  "غیر منتظره",
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
  "سازمانی",
  "مخلوط",
  "بیولوژیکی",
  "شناخته شده",
  "عملکردی",
  "راست",
  "برتر",
  "دیجیتال",
  "ناراضی",
  "غیر منصفانه",
  "خشونت آمیز",
  "یدکی",
  "دردناک",
  "چکیده",
  "آسیایی",
  "ماهانه",
  "صریح",
  "زننده",
  "رنگی",
  "واقع بین",
  "نجیب",
  "غیر متمرکز",
  "غیر ضروری",
  "پرواز",
  "تصادفی",
  "موثر",
  "کدر",
  "ژنتیکی",
  "شیک",
  "غول",
  "پایین",
  "ماهر",
  "نامحسوس",
  "ظریف",
  "کمتر",
  "موازی",
  "متمرکز",
  "گرمسیری",
  "جزئي",
  "دستیار",
  "ترقی خواه",
  "استثنایی",
  "یکپارچه",
  "ترکیب شده",
  "خوش قیافه",
  "مزمن",
  "اجباری",
  "مجبور",
  "ناگوار",
  "ایدئولوژیک",
  "اطراف",
  "صلح آمیز",
  "نخستین",
  "عملیاتی",
  "فناوری",
  "مشاوره",
  "خصومت آمیز",
  "گرانبها",
  "هوشمندانه",
  "بی پایان",
  "جدا شده",
  "مست",
  "جغرافیایی",
  "پویا",
  "حوصله سر بر",
  "مایه تاسف",
  "قطعی",
  "فوق العاده",
  "غیر مستقیم",
  "سفت",
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
  "مبهم",
  "اضافه",
  "بهت زده",
  "واجد شرایط",
  "غایب",
  "لهستانی",
  "اسرائیلی",
  "توسعه یافته",
  "نماینده",
  "ساحلی",
  "تمدید شده",
  "کانادایی",
  "جسورانه",
  "متناظر",
  "متفقین",
  "مقایسه ای",
  "حفاظت",
  "سازنده",
  "سودمند",
  "سیار",
  "ترکی",
  "نارنجی",
  "منفعل",
  "مشکوک",
  "غافلگیر کننده",
  "کشنده",
  "نمادین",
  "ثبت شده",
  "همسایه",
  "غیر مرتبط",
  "صبور",
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
  "عصبانی",
  "بلا استفاده",
  "ذاتی",
  "فلسفی",
  "بیدار",
  "امیدبخش",
  "ناخوشایند",
  "متنوع",
  "پنهان",
  "شایسته",
  "حد واسط",
  "محافظت کننده",
  "خوشبخت",
  "دفاعی",
  "الهی",
  "نامرئی",
  "گمراه کننده",
  "ریاضی",
  "نامناسب",
  "مایع",
  "خورشیدی",
  "معماری",
  "باورنکردنی",
  "فداکار",
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
  "زائد",
  "احتمالی",
  "آماتور",
  "عاشق",
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
  "کره ای",
  "ناخودآگاه",
  "ناشناس",
  "ارتدوکس",
  "ایستا",
  "غافل",
  "هزینه بر",
  "سازگار",
  "کوچولو",
  "ضمنی",
  "دوگانه",
  "رو به جلو",
  "احتیاط",
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
  "کم رو",
  "رمان",
  "متعادل",
  "خودسرانه",
  "همجوار",
  "نگران کننده",
  "متحرک",
  "تکاملی",
  "صمیمی",
  "ورزشی",
  "انضباطی",
  "تدریجی",
  "متهم",
  "بازنشسته",
  "شرم آور",
  "ارجح",
  "مخوف",
  "تخیلی",
  "پذیرفته شده",
  "متحیر",
  "آفتابی",
  "خود جوش",
  "بی ادب",
  "وزارتی",
  "خلاقانه",
  "کنترل شده",
  "مفهومی",
  "معنی دار",
  "مغز",
  "شکستنی",
  "کنجکاو",
  "شکننده",
  "خواب آلود",
  "بی علاقه",
  "سرگردان",
  "شایستگی",
  "ابری",
  "شلوغ",
  "تفننی",
  "فریبنده",
  "درخشنده",
  "برازنده",
  "خانگی",
  "مه آلود",
  "بی حرکت",
  "گل آلود",
  "براق",
  "دودی",
  "بی عیب",
  "طوفانی",
  "زشت",
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
  "مغذی",
  "برشته شده",
  "خسیس",
  "راه راه",
  "لکه دار",
  "تارت",
  "برنزه",
  "آزموده",
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

  animals,
  adjectives,

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
    } else if (document.selection) {
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
    return 0;
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
