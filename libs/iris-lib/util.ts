// @ts-nocheck
/* eslint no-useless-escape: "off", camelcase: "off" */

import Gun from 'gun'
import 'gun/sea'
import _ from './lodash'

let isNode = false
try {
  isNode = Object.prototype.toString.call(global.process) === `[object process]`
} catch (e) {
  null
}

const userAgent =
  !isNode &&
  navigator &&
  navigator.userAgent &&
  navigator.userAgent.toLowerCase()
const isElectron = userAgent && userAgent.includes(' electron/')

const isMobile =
  !isNode &&
  (function () {
    if (isElectron) {
      return false
    }
    let check = false
    ;(function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true
    })(navigator.userAgent || navigator.vendor || '')
    return check
  })()

function gunAsAnotherUser(gun: any, key: any, f: Function) {
  // Hacky way to use multiple users with gun
  const gun2 = new Gun({ radisk: false, peers: Object.keys(gun._.opt.peers) }) // TODO: copy other options too
  const user = gun2.user()
  user.auth(key)
  setTimeout(() => {
    // @ts-ignore
    const peers = Object.values(gun2.back('opt.peers'))
    peers.forEach((peer) => {
      // @ts-ignore
      gun2.on('bye', peer)
    })
  }, 20000)
  return f(user)
}

function gunOnceDefined(node: any) {
  return new Promise((resolve) => {
    node.on((val: any, _k: any, _a: any, eve: any) => {
      if (val !== undefined) {
        eve.off()
        resolve(val)
      }
    })
  })
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
  "مورچه خوار",
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
  "گربه",
  "کوسه گربه ای",
  "کرم ابریشم",
  "گربه ماهی",
  "گاو",
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
  "سوسک",
  "کد",
  "کندور",
  "مرجان",
  "گربه وحشی پشمالو",
  "گاو",
  "کایوت",
  "خرچنگ",
  "جرثقیل",
  "کروداد",
  "خرچنگ",
  "کریکت",
  "تمساح",
  "کلاغ",
  "فاخته",
  "سیکادا",
  "دوستانه",
  "گوزن",
  "دینگو",
  "دایناسور",
  "سگ",
  "دلفین",
  "خر",
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
  "گوزن",
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
  "بز",
  "ماهی قرمز",
  "غاز",
  "گوفر",
  "گوریل",
  "ملخ",
  "خرس",
  "گوان",
  "گواناکو",
  "مرغ گینه",
  "مرغ",
  "گوپی",
  "هادوک",
  "نوعی ماهی پهن بزرگ",
  "همستر",
  "خرگوش",
  "حریر",
  "شاهین",
  "خارپشت",
  "حواصیل",
  "اسب ابی",
  "کرم قلابدار",
  "هورنت",
  "اسب",
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
  "خرچنگ",
  "ملخ",
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
  "پروانه",
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
  "گاو",
  "پاندا",
  "پلنگ",
  "پاراکیت",
  "طوطی",
  "طوطی ماهی",
  "کبک",
  "طاووس",
  "پلیکان",
  "پنگوئن",
  "پرچ",
  "قرقاول",
  "خوک",
  "کبوتر",
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
  "پستاندار",
  "پترمیگان",
  "پفین",
  "پوما",
  "پایتون",
  "بلدرچین",
  "کوله",
  "کووکا",
  "خرگوش",
  "راکون",
  "موش",
  "مار زنگی",
  "کلاغ سیاه",
  "گوزن شمالی",
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
  "میگو",
  "کرم ابریشم",
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
  "لاک پشت",
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
  "راسو",
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
  "آلپاکا",
  "گربه",
  "گاو",
  "جوجه",
  "سگ",
  "خر",
  "موش خرما",
  "گیال",
  "ماهی قرمز",
  "گوپی",
  "اسب",
  "کوی",
  "لاما",
  "گوسفند",
  "یاک",
  "اسب تک شاخ",
];

const adjectives = [
  'میانگین',
  'بزرگ',
  'غول آسا',
  "چاق",
  'غول',
  'غول پیکر',
  'عالی',
  'بزرگ',
  'عظیم',
  "بزرگ",
  'مقدار کمی',
  "طولانی",
  "ماموت",
  'عظیم',
  "مینیاتور",
  "ریزه ریز",
  "کوچک",
  'کوتاه',
  'کم اهمیت',
  'بلند قد',
  "کوچک",
  'غلیان',
  "نسیم",
  'شکسته شده',
  'پر از دست انداز',
  "سرد",
  "سرد",
  'سرد',
  'عجیب و غریب',
  "کج",
  "نوازش",
  "فرفری",
  'آسیب دیده',
  "نم",
  "کثیف",
  'خشک',
  "غبارآلود",
  "کثیف",
  "پوسته پوسته",
  'کرکی',
  "خیس",
  "گسترده",
  'چاق و چله',
  "کج",
  "منحنی",
  "عمیق",
  'تخت',
  "بالا",
  'توخالی',
  'کم',
  'محدود, تنگ',
  "گرد",
  "کم عمق",
  "لاغر",
  'مربع',
  'شیب تند',
  'سر راست',
  'وسیع',
  'کهن',
  'مختصر',
  'زود',
  'سریع',
  "دیر",
  "طولانی",
  'نوین',
  "قدیمی",
  "سریع",
  "سریع",
  'کوتاه',
  'آهسته. تدریجی',
  'سریع',
  'جوان',
  'فراوان',
  'خالی',
  'تعداد کمی',
  'سنگین',
  'سبک',
  'زیاد',
  "تعدادی",
  'صدا',
  "غوغ زدن",
  'از هوش رفتن',
  "خشن",
  "خش خش",
  "خاموش",
  "هاسکی",
  "بلند",
  "ملودیک",
  "نالیدن",
  "لال",
  "پر سر و صدا",
  'ساکت',
  'خشک',
  "طنین دار",
  "جیغ زدن",
  'تیز',
  'بی صدا',
  "نرم",
  'صدای جیغ دادن',
  "بی صدا",
  'زمزمه کردن',
  'تلخ',
  'خوشمزه - لذیذ',
  'تازه',
  "آبدار",
  'رسیده',
  "فاسد",
  'شور',
  'ترش',
  "تند",
  'کهنه',
  "چسبنده",
  "قوی",
  "شیرین",
  "بی مزه",
  'خوش طعم',
  "تشنه",
  "بال زدن",
  'درهم',
  "چرب",
  "خاکی",
  'سخت',
  'داغ',
  "یخی",
  "شل",
  'ذوب شده',
  "پلاستیک",
  "خاردار",
  'بارانی',
  "خشن",
  "پراکنده",
  "شگی",
  "لرزنده",
  'تیز',
  "لرزیدن",
  "ابریشمی",
  "لزخی",
  "لغزنده",
  'صاف',
  "نرم",
  'جامد',
  'ثابت',
  "چسبنده",
  "مناقصه",
  'تنگ',
  'ناهموار. ناجور',
  'ضعیف',
  "خیس",
  "چوبی",
  "ترس",
  'خشمگین',
  "آزار",
  'مشتاق',
  "متکبر",
  'شرمنده',
  'خیلی بد و ناخوشایند',
  "بد",
  "گیج",
  'خسته',
  "مبارزه",
  'محکوم',
  'سردرگم',
  'عجیب و غریب',
  'ظالمانه',
  'خطرناک',
  'شکست داد',
  'متعصب',
  'افسرده',
  'منزجر',
  'مختل',
  "وهم انگیز",
  "خجالت زده",
  "حسادت",
  "شر",
  "خشن",
  "احمق",
  'از کوره در رفته',
  'وحشت زده',
  "غمگین",
  'درمانده',
  'خانه به دوش',
  "گرسنه",
  'صدمه',
  "بیمار",
  "حسادت",
  "تنها",
  'اسرار امیز',
  "شیطون",
  'عصبی',
  'ناراحت کننده - شدیدا ناخوشایند',
  'ظالمانه',
  "دفع کننده",
  'ترسناک',
  "مسخره",
  'خود خواه',
  "درد",
  'زمان فعل',
  'وحشتناک',
  "بی فکر",
  "خسته",
  'مشکل دار',
  'ناراحت',
  'بالا بردن',
  "خسته",
  "شرور",
  "نگران",
  "موافق",
  "سرگرم شده",
  'شجاع',
  "آرام",
  "جذاب کننده",
  'بشاش',
  "راحت",
  'تعاونی',
  'شجاع',
  "لذت بخش",
  'مشخص',
  'مشتاق',
  "خوشحال",
  "افسون کننده",
  'تشویق کننده',
  "پر انرژی",
  "شوق",
  'برانگیخته',
  "شور",
  'نمایشگاه',
  'با ایمان',
  'خارق العاده',
  'خوب',
  'دوستانه',
  'خنده دار',
  "لطیف",
  "با شکوه",
  "خوب",
  'خوشحال',
  'سالم',
  "مفید",
  "خنده دار",
  "شاد",
  "شاد",
  'نوع',
  'زنده',
  'دوست داشتني',
  'خوش شانس',
  "اطاعت",
  'کامل',
  'دلپذیر',
  'مغرور',
  "آرام",
  'احمقانه',
  'خندان',
  "بسیار",
  'موفقیت آمیز',
  "متفکر",
  "پیروز",
  "سرزنده",
  "شوخ",
  "شگفت انگیز",
  "غیور",
  "دیوونه",
  'دیگر',
  "خوب",
  'جدید',
  "قدیمی",
  'عالی',
  "بالا",
  'کم اهمیت',
  'ناهمسان',
  "بزرگ",
  "محلی",
  'اجتماعی',
  'مهم',
  "طولانی",
  'جوان',
  'ملی',
  "بریتانیایی",
  'درست',
  'زود',
  "ممکن",
  'بزرگ',
  'مقدار کمی',
  "سیاسی",
  "توانا",
  "دیر",
  'عمومی',
  'پر شده',
  "دور",
  'کم',
  'عمومی',
  'در دسترس',
  "بد",
  "اصلی",
  'مطمئن',
  "روشن",
  'عمده',
  "اقتصادی",
  'فقط',
  'احتمال دارد',
  "واقعی",
  "سیاه",
  'خاص',
  'بین المللی',
  "ویژه",
  'دشوار',
  'مسلم - قطعی',
  'باز کن',
  "کل",
  'سفید',
  'رایگان',
  'کوتاه',
  "آسان",
  "قوی",
  "اروپایی",
  'مرکزی',
  'مشابه',
  'انسان',
  'مشترک',
  "لازم",
  'تنها',
  "شخصی",
  'سخت',
  'خصوصی',
  'فقیر',
  'مالی',
  'وسیع',
  "خارجی",
  'ساده',
  'اخیر',
  'نگران',
  "آمریکایی",
  'مختلف',
  'بستن',
  'خوب',
  'انگلیسی',
  'اشتباه',
  'حاضر',
  "سلطنتی",
  "طبیعی",
  'شخصی',
  'خوب',
  "فرانسوی",
  "نیهیلیست",
  "سالیپسیست",
  "ماتریالیست",
  "سوررئالیست",
  "قهرمانانه",
  'عالی',
  "لذت طلب",
  'چرند',
  'جاری',
  'نوین',
  'کار یدی',
  'مجاز',
  'خوشحال',
  "نهایی",
  'قرمز',
  'معمولی',
  "جدی",
  "قبلی",
  'جمع',
  'نخست',
  'قابل توجه',
  "صنعتی",
  'متاسف',
  'مرده',
  "خاص",
  'مناسب',
  'بالا',
  "شوروی",
  'پایه ای',
  "نظامی",
  "اصلی",
  'موفقیت آمیز',
  'آگاه',
  "عزیز",
  'محبوب',
  'سنگین',
  'حرفه ای',
  'مستقیم',
  "تاریک",
  "سرد",
  'آماده',
  'سبز',
  "مفید",
  'تاثیر گذار',
  "غربی",
  'سنتی',
  "اسکاتلندی",
  "آلمانی",
  'مستقل',
  "عمیق",
  'جالب هست',
  'قابل توجه',
  'گرفتار',
  "فیزیکی",
  "داغ",
  "موجود",
  "مسئول",
  'کامل',
  "پزشکی",
  'آبی',
  "اضافی",
  "گذشته",
  'نر',
  'علاقه مند',
  'نمایشگاه',
  "ضروری",
  'زیبا',
  'مدنی',
  'اولیه',
  'واضح',
  'آینده',
  'محیطی',
  "مثبت",
  'ارشد',
  'هسته ای',
  "سالانه",
  'مربوط',
  'بزرگ',
  'ثروتمند',
  'تجاری',
  'بی خطر',
  'منطقه ای',
  'کاربردی',
  "رسمی",
  'جداگانه, مجزا',
  'کلید',
  'رئیس',
  'منظم',
  'ناشی از',
  "اضافی",
  'فعال',
  "قدرتمند",
  "پیچیده",
  "استاندارد",
  "غیرممکن",
  'سبک',
  "گرم",
  "وسط",
  'تازه',
  "جنسی",
  "جلو",
  'داخلی',
  "واقعی",
  "متحد",
  'فنی',
  "معمولی",
  'ارزان',
  'عجیب',
  'درونی؛ داخلی',
  'عالی',
  'ساکت',
  "نرم",
  'پتانسیل',
  "شمالی",
  'دینی',
  "سریع",
  "خیلی",
  "مشهور",
  "فرهنگی",
  "مناسب",
  "گسترده",
  "مشترک",
  "رسمی",
  'محدود',
  'محافظه کار',
  'دوست داشتني',
  "معمول",
  'با مسئولیت محدود',
  'ناتوان',
  'روستایی',
  'اولیه',
  "قابل توجه",
  "روشن",
  'میانگین',
  'منتهی شدن',
  'معقول',
  "فوری",
  'مناسب',
  'برابر',
  "جزئیات",
  'کار کردن',
  'به طور کلی',
  "مونث",
  "ترس",
  "دموکراتیک",
  'رو به رشد',
  "کافی",
  "علمی",
  "شرقی",
  'درست',
  'inc',
  "ایرلندی",
  'گران',
  "آموزشی",
  "ذهنی",
  'خطرناک',
  'بحرانی',
  'افزایش یافت',
  "آشنا",
  'بعید',
  'دو برابر',
  'کامل',
  'آهسته. تدریجی',
  "کوچک",
  'خشک',
  "تاریخی",
  'لاغر',
  'روزانه',
  "جنوبی",
  "افزایش",
  'وحشی',
  'تنها',
  'شهری',
  'خالی',
  'متاهل',
  'محدود, تنگ',
  "لیبرال",
  "فرض",
  "بالا",
  'آشکار',
  'بلند قد',
  'مشغول',
  "خونین",
  'آماده شده',
  'روسی',
  'اخلاقی',
  "مراقب",
  'تمیز',
  'جذاب',
  "ژاپنی",
  "حیاتی",
  'ضخیم',
  'جایگزین',
  'سریع',
  'کهن',
  'مسن',
  'نادر',
  "خارجی",
  "قادر",
  'مختصر',
  "شگفت انگیز",
  "بزرگ",
  'معمول',
  "کل",
  "خاکستری",
  'ثابت',
  "وسیع",
  'غافلگیر شدن',
  'ایده آل',
  'وحشتناک',
  'علمی',
  'خنده دار',
  'جزئی',
  'راضی',
  'شدید',
  "بیمار",
  'شرکت های بزرگ, دارای شخصیت حقوقی',
  'منفی',
  "دائمی",
  'ضعیف',
  'رنگ قهوه ای',
  'اساسی',
  'فرد',
  'حیاتی',
  "درونی",
  'استفاده شده',
  'جنایی',
  'امروزی',
  'تیز',
  "بیمار",
  'نزدیک',
  "رومی",
  'عظیم',
  'منحصر بفرد',
  'ثانوی',
  "پارلمان",
  "آفریقایی",
  'ناشناخته',
  'متعاقب',
  'خشمگین',
  'زنده',
  'گناهکار',
  'خوش شانس',
  'عظیم',
  'خوب',
  'زرد',
  'غیر معمول',
  'خالص',
  'سخت است',
  "عزیز",
  "گسترده",
  'خوشحال',
  "باقی",
  'کشاورزی',
  'بسيار خوب',
  'سالم',
  "ایتالیایی",
  "مدیر",
  "خسته",
  'کارآمد',
  "راحت",
  'چینی ها',
  'نسبت فامیلی',
  'دوستانه',
  'مرسوم',
  'مایل بودن',
  'ناگهانی',
  'پیشنهاد شده',
  "داوطلبانه",
  "خفیف",
  "ارزشمند",
  'نمایشی',
  "طلایی",
  'موقت',
  "فدرال",
  'تیز',
  'تخت',
  'بی صدا',
  'هندی',
  "نگران",
  "رنگ پریده",
  "قانونی",
  "ولش",
  "وابسته",
  "محکم",
  "خیس",
  "رقابتی",
  'مسلح',
  'افراطی',
  'خارج از',
  "قابل قبول",
  'حساس',
  'زندگي كردن',
  'خالص',
  "جهانی",
  'عاطفی',
  'غمگین',
  'راز',
  "سریع",
  'کافی است',
  'درست شد',
  "شیرین",
  "اداری",
  "چوبی",
  'قابل توجه',
  'همه جانبه',
  "شگفت آور",
  'جامد',
  "خشن",
  "فقط",
  'جرم',
  "درخشان",
  'بیشترین',
  'مطلق',
  'الکترونیکی',
  'دیداری',
  "الکتریکی",
  'سرد',
  "اسپانیایی",
  "ادبی",
  'ادامه',
  "برترین",
  "شیمیایی",
  'اصل',
  'هیجان انگیز',
  'نوشته شده است',
  "پیشرفته",
  'مفرط',
  "کلاسیک",
  'مناسب',
  'مورد علاقه',
  'بطور گسترده',
  'مطمئن',
  'سر راست',
  'مغرور',
  "تعدادی",
  "مقابل",
  'متمایز',
  "دیوانه",
  "مفید",
  'داده شده',
  'معلول',
  'استوار',
  'مشتاق',
  'عصبی',
  'خیلی بد و ناخوشایند',
  'پایدار',
  'مشروطه',
  'راضی',
  'هوشیار, آگاه',
  'در حال توسعه',
  'راهبردی',
  'مقدس',
  'صاف',
  'غالب',
  'از راه دور',
  'نظری',
  "بی نظیر",
  'رنگ صورتی',
  'بسیار',
  "بالینی",
  'کمترین',
  "صادق",
  'چشمگیر',
  'مربوط',
  "مسکونی",
  'خارق العاده',
  'جلگه',
  'قابل رویت',
  'دقیق',
  'غیر صمیمی',
  'هنوز',
  'یونانی',
  'بغرنج',
  "موسیقی",
  "دقیق",
  "لطیف",
  'شکسته شده',
  'زنده',
  'احمقانه',
  "چاق",
  'تنگ',
  "پولی",
  "گرد",
  'روانشناسی',
  'خشن',
  "بیکار",
  'اجتناب ناپذیر',
  "جوان",
  'معقول',
  "سپاسگزار",
  'دلپذیر',
  "کثیف",
  'ساختاری',
  'خوش آمدی',
  'کر',
  'در بالا',
  'مداوم',
  'کور',
  "خارج از کشور",
  'منظور داشتن',
  "حق",
  "خوشحال",
  "شل",
  "گاه به گاه",
  'مشهود',
  'مستاصل',
  'همکار',
  'جهانی',
  'مربع',
  'ثابت',
  "کلاسیک",
  'معادل',
  'پر فکر',
  "ویکتوریا",
  'مرحله',
  'نهایی',
  'خلاق',
  'گمشده',
  "قرون وسطایی",
  'باهوش',
  'وابسته به زبانشناسی',
  'متقاعد',
  "قضایی",
  "خام",
  'پیچیده',
  'خواب',
  'آسیب پذیر',
  'غیر مجاز',
  "بیرونی",
  "انقلابی",
  'تلخ',
  "تغییر",
  "استرالیایی",
  "بومی",
  'امپراتوری',
  'سخت گیرانه',
  "عاقلانه",
  'دوستانه و غیر رسمی',
  'قابل انعطاف',
  "جمعی",
  'زود زود',
  "تجربی",
  "معنوی",
  'گویا',
  "سخاوتمندانه",
  "ناکافی",
  "برجسته",
  "منطقی",
  "لخت",
  "تاریخی",
  'فروتن',
  "هلندی",
  'حاد',
  "الکتریکی",
  'معتبر',
  "هفتگی",
  "درخت",
  "اتوماتیک",
  "بلند",
  'قابل اعتماد',
  "متقابل",
  "مسئول",
  "چندین",
  "حکم",
  'تنها',
  'مدیریت',
  "باردار",
  "لاتین",
  "نزدیک",
  "دقیق",
  'اساسی',
  'همسان',
  'رضایتبخش',
  'حاشیه ای',
  'متمایز',
  "انتخابی",
  "فوری",
  "ریاست جمهوری",
  'بحث برانگیز',
  'هر روز',
  'تشویق کننده',
  'ارگانیک. آلی',
  'ادامه',
  'انتظار می رود',
  "آماری",
  "مطلوب",
  'بی گناه',
  'بهبود یافته',
  'انحصاری',
  "علامت گذاری شده",
  'با تجربه',
  'غیر منتظره',
  'عالی',
  'خالص, ناب',
  "ناامید",
  'وحشت زده',
  "معده",
  'رومانتیک',
  "برهنه",
  'بی میل',
  'باشکوه',
  'راحت',
  'ایجاد',
  "بسته",
  'نا معلوم',
  'ساختگی',
  "دیپلماتیک",
  'عظیم',
  'دریایی',
  'مکانیکی',
  "خرده فروشی",
  'سازمانی',
  "مخلوط",
  'ضروری',
  "بیولوژیکی",
  'شناخته شده',
  "عملکردی",
  "راست",
  'برتر',
  "دیجیتال",
  'دیدنی و جذاب - تماشایی',
  "ناراضی",
  'سردرگم',
  'غیر منصفانه',
  'خشونت آمیز',
  'یدکی',
  'دردناک',
  'چکیده',
  "آسیایی",
  'مرتبط است',
  'مقننه',
  "ماهانه",
  'باهوش',
  "گرسنه",
  "صریح",
  "زننده",
  "فقط",
  'از هوش رفتن',
  "رنگی",
  'مسخره - مضحک',
  'شگفت انگیز',
  "قابل مقایسه",
  'پی در پی',
  'واقع بین',
  'بازگشت',
  'نجیب',
  "غیر متمرکز",
  "بیت کوین",
  "سایفرپانک",
  'غیر ضروری',
  "پرواز",
  'تصادفی',
  'موثر',
  'کدر',
  "ژنتیکی",
  "شیک",
  "شگفت انگیز",
  "دیوانه",
  "نم",
  'غول',
  'امن است',
  "پایین",
  'ماهر',
  'نامحسوس',
  "ظریف",
  'شجاع',
  'کمتر',
  'موازی',
  'شیب تند',
  'متمرکز',
  "گاه به گاه",
  "گرمسیری",
  "تنها",
  'جزئي',
  "مقدمه ای",
  'بتن',
  "ادعا",
  'دستیار',
  "عمودی",
  'ناراحت',
  'ظریف',
  'خفیف',
  "شغلی",
  'بیش از اندازه',
  'ترقی خواه',
  'استثنایی',
  'یکپارچه',
  'قابل توجه, برجسته, موثر',
  'قاره',
  'باشه',
  "خشن",
  'ترکیب شده',
  "خشن",
  'خوش قیافه',
  'مشخصه',
  "مزمن",
  "اجباری",
  "موقت",
  'هدف, واقعگرایانه',
  "بسیار",
  'شعبده بازي',
  'نظام',
  "مجبور",
  "قابل پرداخت",
  "سرگرمی",
  'ناگوار',
  'اولیه',
  'شگفت انگیز',
  "ایدئولوژیک",
  'شهر بزرگ',
  'اطراف',
  'تخمین زده',
  "صلح آمیز",
  "نخستین",
  'عملیاتی',
  "فناوری",
  'نوع',
  "مشاوره",
  'خصومت آمیز',
  "گرانبها",
  'در دسترس',
  'مشخص',
  'برانگیخته',
  'تحت تاثیر قرار',
  'هوشمندانه',
  "بی پایان",
  'جدا شده',
  "مست",
  "جغرافیایی",
  'پسندیدن',
  "پویا",
  'حوصله سر بر',
  "آینده",
  'مایه تاسف',
  'قطعی',
  "فوق العاده",
  'قابل توجه',
  "غیر مستقیم",
  'سفت',
  "ثروتمند",
  'بی دست و پا - به شکلی نامناسب',
  'زنده',
  'خنثی',
  "هنری",
  'محتوا',
  "بالغ",
  "استعماری",
  "جاه طلب",
  "شر",
  "مغناطیسی",
  "کلامی",
  'مشروع',
  "همدل",
  "تجربی",
  'سر',
  "کم عمق",
  "مبهم",
  "دریایی",
  'افسرده',
  "به اشتراک گذاشته شده",
  'اضافه',
  'بهت زده',
  "وسط",
  "ارزشمند",
  "واجد شرایط",
  "گمشده",
  'جای خالی',
  'غایب',
  "مطلوب",
  'لهستانی',
  "اسرائیلی",
  'توسعه یافته',
  "عمیق",
  'نماینده',
  "شوق",
  'وحشتناک',
  "سخت",
  'کاهش',
  'ظالمانه',
  "ساحلی",
  'عجیب و غریب',
  'سوئیس',
  'خام',
  'تمدید شده',
  'انتخاب شد',
  'مشتاق',
  "کانادایی",
  "جسورانه",
  "آرام",
  'متناظر',
  "دویدن",
  'برنامه ریزی شده',
  'مناسب',
  'عظیم',
  "متفقین",
  'مقایسه ای',
  'ناراحت',
  'حفاظت',
  'سازنده',
  'سودمند',
  'خسته',
  "جذاب کننده",
  "حداقل",
  'سیار',
  'ترکی',
  'نارنجی',
  "عقب",
  "منفعل",
  "مشکوک",
  'غافلگیر کننده',
  'کشنده',
  "نتیجه",
  "نمادین",
  "ثبت شده",
  "همسایه",
  "آرام",
  'غیر مرتبط',
  'صبور',
  'فشرده - جمع و جور',
  "سودآور",
  "رقیب",
  "وفادار",
  'در حد متوسط',
  "متمایز",
  'داخلی',
  "نجیب",
  'ناکافی',
  "واجد شرایط",
  'اسرار امیز',
  "متغیر",
  "مدیریتی",
  "مولکولی",
  "المپیک",
  "خطی",
  "آینده نگر",
  'چاپ شده',
  "والدین",
  'گوناگون, متنوع',
  'دارای جزئیات - بسیط',
  "عصبانی",
  "مالی",
  'سوزش',
  'بلا استفاده',
  "معنی",
  "خجالت زده",
  'ذاتی',
  "فلسفی",
  'حساب شده',
  'بیدار',
  'متغیر',
  "امیدبخش",
  "ناخوشایند",
  'متنوع',
  "مقدس",
  "انتخابی",
  'شیب دار',
  "مناقصه",
  "پنهان",
  "شایسته",
  'حد واسط',
  'صدا',
  "محافظت کننده",
  "خوشبخت",
  "لاغر",
  "دفاعی",
  "الهی",
  'گیر',
  'رانندگی',
  'نامرئی',
  "گمراه کننده",
  'گرد',
  "ریاضی",
  "نامناسب",
  "مایع",
  'مداوم',
  "خورشیدی",
  'مشکوک',
  'کتابچه راهنمای',
  "معماری",
  'سالم',
  "باورنکردنی",
  "فداکار",
  "قبل",
  "تراژیک",
  'قابل احترام',
  "خوش بینانه",
  "قانع کننده",
  "غیر قابل قبول",
  "قاطع",
  "لایق",
  'فضایی',
  'قابل احترام',
  'الزام آور',
  "آرام",
  "پرستاری",
  "سمی",
  'انتخاب کنید',
  'زائد',
  "یکپارچه",
  'سپس',
  "احتمالی",
  "آماتور",
  "عاشق",
  "گذر",
  'مشخص شده',
  "سرزمینی",
  "افقی",
  "داخلی",
  'شناختی',
  "تنظیمی",
  "بدبخت",
  "ساکن",
  'با ادب',
  'ترسیده',
  "گوتیک",
  "غیرنظامی",
  'فوری',
  "طولانی",
  "سوء",
  "کره ای",
  "ناخودآگاه",
  'ناشناس',
  "زیبایی",
  "ارتدوکس",
  "ایستا",
  'غافل',
  'هزینه بر',
  'خارق العاده',
  "احمق",
  "مد",
  "علت",
  'سازگار',
  'کوچولو',
  "ضمنی",
  'دوگانه',
  'خوب',
  'بشاش',
  "ذهنی",
  'رو به جلو',
  "بقا",
  'خارجی',
  'رنگ بنفش',
  "احتیاط",
  'بازدید',
  'تجمیع',
  "اخلاقی",
  "نوجوان",
  'در حال مرگ',
  'فاجعه بار',
  'خوشمزه - لذیذ',
  "محرمانه",
  "زیرزمینی",
  "کامل",
  "بد",
  'خود مختار',
  "اتمی",
  'منجمد',
  "رنگارنگ",
  'مجروح',
  'لباس فرم',
  'شرمنده',
  "با شکوه",
  "شرور",
  'رو به افزایش',
  'کم رو',
  'رمان',
  "متعادل",
  "لذت بخش",
  "خودسرانه",
  "همجوار",
  "نگران کننده",
  'عجیب و غریب',
  "بدون تغییر",
  'متحرک',
  "تکاملی",
  'صمیمی',
  "ورزشی",
  "انضباطی",
  "مهم",
  "پر سر و صدا",
  "تدریجی",
  "متهم",
  'خانه به دوش',
  "حمایت کردن",
  'آینده',
  "تجدید",
  'اضافی',
  "بازنشسته",
  'لاستیک',
  "انتخاب",
  "در فضای باز",
  "شرم آور",
  'ارجح',
  "عجیب",
  'مخوف',
  "موافقت",
  'تخیلی',
  'حکومت داری',
  'پذیرفته شده',
  'فنی و حرفه ای',
  "توانا",
  "متحیر",
  'در سراسر جهان',
  "سازمانی",
  'آفتابی',
  "بزرگترین",
  "احتمالی",
  'خود جوش',
  'واضح',
  "بی ادب",
  'با ایمان',
  "وزارتی",
  'خلاقانه',
  "کنترل شده",
  'مفهومی',
  'ناخواسته, بی میل',
  'مدنی',
  'معنی دار',
  'زنده',
  "مغز",
  "شکستنی",
  'مشغول',
  "مراقب",
  "احتیاط",
  'باهوش',
  'نگران',
  "دیوانه",
  'کنجکاو',
  'مرده',
  'ناهمسان',
  'دشوار',
  'مشکوک',
  "آسان",
  "مشهور",
  "شکننده",
  "مفید",
  'درمانده',
  'مهم',
  "غیرممکن",
  'بی گناه',
  'نوین',
  'باز کن',
  "بی نظیر",
  'فقیر',
  "قدرتمند",
  "متحیر",
  "واقعی",
  'ثروتمند',
  'کم رو',
  'خواب آلود',
  "فوق العاده",
  "بی علاقه",
  "سرگردان",
  'وحشی',
  'اشتباه',
  "شایستگی",
  "هشدار",
  'میانگین',
  'زیبا',
  'طلایی',
  "خونین",
  'خجالت زدگی',
  "روشن",
  'تمیز',
  "روشن",
  "ابری",
  "رنگارنگ",
  'شلوغ',
  'جذاب',
  "تاریک",
  "مختل",
  'متمایز',
  'کدر',
  "ظریف",
  'تفننی',
  "کثیف",
  'فریبنده',
  "درخشنده",
  'برازنده',
  "گروتسک",
  "خانگی",
  'سبک',
  "مه آلود",
  "بی حرکت",
  'گل آلود',
  'جلگه',
  "آماده",
  "عجیب",
  "براق",
  "دودی",
  "درخشنده",
  'بی عیب',
  "طوفانی",
  'عجیب',
  "زشت",
  "بدیه",
  'غیر معمول',
  "بد",
  'بهتر',
  'زیبا',
  'بزرگ',
  "سیاه",
  'آبی',
  "روشن",
  "دست و پا چلفتی",
  "دیوانه",
  "سرگیجه",
  'کدر',
  "چاق",
  'نحیف',
  'دوستانه',
  'خنده دار',
  'عالی',
  'سبز',
  'غول پیکر',
  'جذاب',
  'بد خلق',
  'خوش قیافه',
  'خوشحال',
  'ناگوار',
  'خارش‌دار',
  "پریشانی",
  "شاد",
  'نوع',
  "طولانی",
  'تنبل',
  'باشکوه',
  'ارغوانی',
  'زیاد',
  "توانا",
  'خوشگل',
  "زننده",
  'جدید',
  'خوب',
  "فضول",
  "آجیل",
  'مغذی',
  'فرد',
  'نارنجی',
  "معمولی",
  'بسیار',
  "گرانبها",
  "خاردار",
  'رنگ بنفش',
  "عجیب",
  'ساکت',
  "سریع",
  "سریع ترین",
  'بارانی',
  'نادر',
  "راز",
  'قرمز',
  "برشته شده",
  'قدرتمند',
  "گرد",
  'غمگین',
  'ترسناک',
  "ضعف",
  'کوتاه',
  'احمقانه',
  "خسیس",
  'عجیب',
  "راه راه",
  "لکه دار",
  'تارت',
  'بلند قد',
  ' رام کردن',
  "برنزه",
  "مناقصه",
  "آزموده",
  "محیله",
  'سخت است',
  "زشت",
  "زشت ترین",
  "وسیع",
  "آبی",
  'بی فایده',
  "شگفت انگیز",
  'زرد',
  'لذیذ',
  "دیوونه",
]

export default {
  gunOnceDefined,
  gunAsAnotherUser,
  async getHash(str: string, format = `base64`) {
    if (!str) {
      return undefined
    }
    const hash = await Gun.SEA.work(str, undefined, undefined, {
      name: `SHA-256`,
    })
    if (!hash) {
      throw new Error(`Gun.SEA.work failed for ${str}`)
    }
    if (hash.length > 44) {
      throw new Error(
        `Gun.SEA.work returned an invalid SHA-256 hash longer than 44 chars: ${hash}. This is probably due to a sea.js bug on Safari.`
      )
    }
    if (format === `hex`) {
      return this.base64ToHex(hash)
    }
    return hash
  },

  capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1)
  },

  generateName() {
    return `${this.capitalize(_.sample(adjectives)!)} ${this.capitalize(
      _.sample(animals)!
    )}`
  },

  base64ToHex(str: string) {
    const raw = atob(str)
    let result = ''
    for (let i = 0; i < raw.length; i++) {
      const hex = raw.charCodeAt(i).toString(16)
      result += hex.length === 2 ? hex : `0${hex}`
    }
    return result
  },

  getCaret(el: HTMLInputElement) {
    if (el.selectionStart) {
      return el.selectionStart
    } else {
      // @ts-ignore
      if (document.selection) {
        el.focus()
        // @ts-ignore
        const r = document.selection.createRange()
        if (r === null) {
          return 0
        }
        // @ts-ignore
        const re = el.createTextRange()
        const rc = re.duplicate()
        re.moveToBookmark(r.getBookmark())
        rc.setEndPoint('EndToStart', re)
        return rc.text.length
      }
    }
    return 0
  },

  injectCss() {
    const elementId = `irisStyle`
    if (document.getElementById(elementId)) {
      return
    }
    const sheet = document.createElement(`style`)
    sheet.id = elementId
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
      `
    document.head.prepend(sheet)
  },

  getUrlParameter(sParam: string, sParams: string) {
    const sPageURL = sParams || window.location.search.substring(1)
    const sURLVariables = sPageURL.split('&')
    let sParameterName, i

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=')
      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined
          ? true
          : decodeURIComponent(sParameterName[1])
      }
    }
  },

  formatTime(date: Date) {
    // @ts-ignore
    const t: any = date.toLocaleTimeString(undefined, { timeStyle: 'short' })
    const s = t.split(':')
    if (s.length === 3) {
      // safari tries to display seconds
      return `${s[0]}:${s[1]}${s[2].slice(2)}`
    }
    return t
  },

  formatDate(date: Date) {
    const t = date.toLocaleString(undefined, {
      dateStyle: 'short',
      timeStyle: 'short',
    })
    const s = t.split(':')
    if (s.length === 3) {
      // safari tries to display seconds
      return `${s[0]}:${s[1]}${s[2].slice(2)}`
    }
    return t
  },

  getDaySeparatorText(
    date: Date,
    dateStr: string,
    now?: Date,
    nowStr?: string
  ) {
    if (!now) {
      now = new Date()
      // @ts-ignore
      nowStr = now.toLocaleDateString({ dateStyle: 'short' })
    }
    if (dateStr === nowStr) {
      return 'today'
    }
    const dayDifference = Math.round((now - date) / (1000 * 60 * 60 * 24))
    if (dayDifference === 0) {
      return 'today'
    }
    if (dayDifference === 1) {
      return 'yesterday'
    }
    if (dayDifference <= 5) {
      return date.toLocaleDateString(undefined, { weekday: 'long' })
    }
    return dateStr
  },

  getProfileLink(pub: string) {
    return `${window.location.origin}/#/profile/${encodeURIComponent(pub)}`
  },

  truncateString(s: string, length = 30) {
    return s.length > length ? `${s.slice(0, length)}...` : s
  },

  createElement(type: string, cls?: string, parent?: HTMLElement) {
    const el = document.createElement(type)
    if (cls) {
      el.setAttribute('class', cls)
    }
    if (parent) {
      parent.appendChild(el)
    }
    return el
  },

  isNode,
  isElectron,
  isMobile,

  throttle: (func: Function, limit: number) => {
    let inThrottle: boolean
    return function () {
      const args = arguments
      const context = this
      if (!inThrottle) {
        func.apply(context, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  },
  debounce: (func: Function, delay: number) => {
    let inDebounce: boolean
    return function () {
      const context = this
      const args = arguments
      clearTimeout(inDebounce)
      inDebounce = setTimeout(() => func.apply(context, args), delay)
    }
  },
  sample: (arr: any[]) => arr[Math.floor(Math.random() * arr.length)],
  sampleSize: (arr: any[], size: number) => {
    const shuffled = arr.slice(0)
    let i = arr.length
    const min = i - size
    let temp
    let index
    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random())
      temp = shuffled[index]
      shuffled[index] = shuffled[i]
      shuffled[i] = temp
    }
    return shuffled.slice(min)
  },
  defer: (func: Function) => setTimeout(func, 0),
  once: (func: Function) => {
    let called = false
    return function () {
      if (called) {
        return
      }
      called = true
      func.apply(this, arguments)
    }
  },
  omit: (obj: any, keys: string[]) => {
    const newObj = {}
    Object.keys(obj).forEach((key) => {
      if (!keys.includes(key)) {
        newObj[key] = obj[key]
      }
    })
    return newObj
  },
}
