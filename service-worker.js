/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v4.3.1"});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "ef0bf2d3d19246d1a5584b7c8cad1a3a"
  },
  {
    "url": "about-me/index.html",
    "revision": "af92094a67b8a1578f858d068c912e5a"
  },
  {
    "url": "assets/css/0.styles.3e130620.css",
    "revision": "09b9d255da042027ceb9d5f5ca4bee15"
  },
  {
    "url": "assets/fonts/GanjNamehSans-Regular.0242b17d.woff",
    "revision": "0242b17d856f3436530a661764eac22f"
  },
  {
    "url": "assets/fonts/GanjNamehSans-Regular.0dacb2cd.woff2",
    "revision": "0dacb2cdbcda95a6988d0c4e50a091a2"
  },
  {
    "url": "assets/fonts/GanjNamehSans-Regular.a6a8d2e5.ttf",
    "revision": "a6a8d2e5b65086c657b470bac8bf9a44"
  },
  {
    "url": "assets/img/Black-Mirror-Bandersnatch-Stefan-and-Monster.71bf4c13.jpg",
    "revision": "71bf4c137139c11a742885ed5c2e5a8f"
  },
  {
    "url": "assets/img/cover.1aa85459.png",
    "revision": "1aa854599d9a85a9d2d84a6208c9ebe5"
  },
  {
    "url": "assets/img/cover.bf5c9cae.png",
    "revision": "bf5c9cae2454536a71ee7c65422aac0e"
  },
  {
    "url": "assets/img/cover.f3f24df5.png",
    "revision": "f3f24df510720c4c8d3ae60ac1ca25cf"
  },
  {
    "url": "assets/img/cv_avatar_512x512.0f3f07c8.jpg",
    "revision": "0f3f07c89cabadb045896d02f8ca89e1"
  },
  {
    "url": "assets/img/full-screen.b4992f64.png",
    "revision": "b4992f64331e4b54debc4ca7d7335cbd"
  },
  {
    "url": "assets/img/non-full-screen.9de24012.png",
    "revision": "9de24012bf332ab861017a68e485b317"
  },
  {
    "url": "assets/img/search.d9fc2039.svg",
    "revision": "d9fc2039e038b57b2b20b5d6ee63ca85"
  },
  {
    "url": "assets/img/web-development.0d39e798.jpg",
    "revision": "0d39e7980e37cb985fbd03c886449ed9"
  },
  {
    "url": "assets/js/1.e996dc68.js",
    "revision": "220a3d2b4d655c9c96eda779303470a5"
  },
  {
    "url": "assets/js/10.9f5cd2b9.js",
    "revision": "c9c730c93134df987c9f733f59ec650b"
  },
  {
    "url": "assets/js/11.eb063230.js",
    "revision": "396f33f9474af8a0949214372fd23de4"
  },
  {
    "url": "assets/js/12.0fe00628.js",
    "revision": "96c68e168bc1fc65804860b2adeb68e9"
  },
  {
    "url": "assets/js/13.eff8c04d.js",
    "revision": "dc73b4017d99fd579a44bf6113c44b71"
  },
  {
    "url": "assets/js/14.857ccacf.js",
    "revision": "31cd0acdb6f98dd5f7fca79a1497b5f6"
  },
  {
    "url": "assets/js/15.b1f5dd86.js",
    "revision": "8e33ba51021f6c34fe953eab8c9c4180"
  },
  {
    "url": "assets/js/16.bbabb175.js",
    "revision": "aec98f716c0442a6d96557974dcdf9b7"
  },
  {
    "url": "assets/js/17.254ed0b8.js",
    "revision": "2d3255af6ab73af525e6586b2967590e"
  },
  {
    "url": "assets/js/18.e6e05063.js",
    "revision": "9f0c58fe55b4e489394b64457e380602"
  },
  {
    "url": "assets/js/19.968b2bee.js",
    "revision": "89c0e09f5cab169243481a4e72578878"
  },
  {
    "url": "assets/js/2.c2bfede8.js",
    "revision": "3514887c938a77aa652dded053489e7e"
  },
  {
    "url": "assets/js/20.73d5fae5.js",
    "revision": "b683634237cac1c29912198dce2fef36"
  },
  {
    "url": "assets/js/21.77fe0d84.js",
    "revision": "bd4505819aebf8c95ee73644f187adb9"
  },
  {
    "url": "assets/js/22.103e04e8.js",
    "revision": "dd94b8ef36d8e529a3b7631090554530"
  },
  {
    "url": "assets/js/23.383e9189.js",
    "revision": "2c729357dff0f85129cd2264429edb88"
  },
  {
    "url": "assets/js/24.b5cb101a.js",
    "revision": "627e843a0993f80cd689b2cd43f394c2"
  },
  {
    "url": "assets/js/25.f707fbfc.js",
    "revision": "e58f8883a472708c7db69009bbb89e78"
  },
  {
    "url": "assets/js/26.85ad5be4.js",
    "revision": "67c1297220149f159f84028e29b4e063"
  },
  {
    "url": "assets/js/27.0b7863c3.js",
    "revision": "c3eab4b090868c52a6da96bd3a6593cd"
  },
  {
    "url": "assets/js/28.e5786ba0.js",
    "revision": "6cd7df3c53de31adbe55eed00347c033"
  },
  {
    "url": "assets/js/29.f2d9d185.js",
    "revision": "76ab3e67ff81a7250cd05f34f102b856"
  },
  {
    "url": "assets/js/30.939a05fe.js",
    "revision": "7301ba354deb9ae000d42049bacacdfc"
  },
  {
    "url": "assets/js/31.b6c2eb81.js",
    "revision": "31d1cb52311dbb2acd812c1cdc5db8ba"
  },
  {
    "url": "assets/js/32.6387e809.js",
    "revision": "2f73b1e1f35c36b96360c236f6938f20"
  },
  {
    "url": "assets/js/33.20217334.js",
    "revision": "6648d0d1fac523388e5f05ab8f51604a"
  },
  {
    "url": "assets/js/34.f320e924.js",
    "revision": "32ac31fda85263f59f5eb075566df699"
  },
  {
    "url": "assets/js/35.6a4e1050.js",
    "revision": "12e1877ff87830f85f8416adcb658077"
  },
  {
    "url": "assets/js/4.c06b2136.js",
    "revision": "26d2c16582f533edf4cf2bf74d802e0a"
  },
  {
    "url": "assets/js/5.475c72ca.js",
    "revision": "1943ae14610b3e19400d8640b61782ea"
  },
  {
    "url": "assets/js/6.d49c9810.js",
    "revision": "875fb347727987c1752c6ba8f8bc9088"
  },
  {
    "url": "assets/js/7.8adcdd76.js",
    "revision": "e305c25bd4503a6212879435529f1ca4"
  },
  {
    "url": "assets/js/8.9de395ad.js",
    "revision": "65623635dadaa97474f69d8dc80e5304"
  },
  {
    "url": "assets/js/9.8da95ae4.js",
    "revision": "cedcea63cf0db2e3674633c5588c3975"
  },
  {
    "url": "assets/js/app.6430d10f.js",
    "revision": "622ff3b1352fce379b7cb466230d2960"
  },
  {
    "url": "books/Building-Progressive-Web-Applications-with-Vuejs/index.html",
    "revision": "48e61ddffc3c138c68c875a831d3d4f9"
  },
  {
    "url": "books/index.html",
    "revision": "a99d0561deabf35075a6dd631ae6494c"
  },
  {
    "url": "books/Modern-Web-Development-on-the-JAMstack/index.html",
    "revision": "8ac6a9c6a08f3a74cff989212fc3facf"
  },
  {
    "url": "books/The-Practitioner’s-Guide-To-Graph-Data/index.html",
    "revision": "893b74793ac2488b22609f782bbd18c4"
  },
  {
    "url": "changelog.html",
    "revision": "4b6c9b584d01f4f1c950c87ae8fd9b40"
  },
  {
    "url": "cload.png",
    "revision": "890c64b1baec33add2cff2082d68949a"
  },
  {
    "url": "contact-me/index.html",
    "revision": "651d19ebfb00e217756200d2ae26e1a2"
  },
  {
    "url": "cooperation-offer/index.html",
    "revision": "ecca70212f47cd808cfbc458acc82a27"
  },
  {
    "url": "front-poster/Charlie-and-H.Keller.jpg",
    "revision": "b3df6a28540aca670d5301dddec2a860"
  },
  {
    "url": "front-poster/gandalf-the-gray.png",
    "revision": "8eeae3da150bb7c42f885093735593bd"
  },
  {
    "url": "front-poster/gandolf2.png",
    "revision": "64a1d4947bf6b818b0d80b21446f4558"
  },
  {
    "url": "front-poster/gnu-in-meditate.png",
    "revision": "149a05c552998e61fe874e1b318c4bee"
  },
  {
    "url": "front-poster/tom-bombadil-and-goldberry.png",
    "revision": "1097f80d9fd318fa0a402d661cb358aa"
  },
  {
    "url": "icons/android-chrome-144x144.png",
    "revision": "cd5b326d9d4e3abd0e6c3b5942e8ea9e"
  },
  {
    "url": "icons/android-chrome-192x192.png",
    "revision": "48e9f779005ceca04394b5274816ecfc"
  },
  {
    "url": "icons/android-chrome-256x256.png",
    "revision": "4ffe00aaa509ad092b44fae166254dc9"
  },
  {
    "url": "icons/android-chrome-36x36.png",
    "revision": "e204b59d3adb101aa3a2dca35c0f9073"
  },
  {
    "url": "icons/android-chrome-384x384.png",
    "revision": "e12febb96cf6bf4f37fefc556ac42b4f"
  },
  {
    "url": "icons/android-chrome-48x48.png",
    "revision": "ce2d5675eb03f9888040226ddb8fcaab"
  },
  {
    "url": "icons/android-chrome-512x512.png",
    "revision": "34019b02af8ea63e2b2692353bd4f15b"
  },
  {
    "url": "icons/android-chrome-72x72.png",
    "revision": "9e5f4decdf926d50206d9ce96b81246a"
  },
  {
    "url": "icons/android-chrome-96x96.png",
    "revision": "5f101ab727132396dadf5061b47644b7"
  },
  {
    "url": "icons/apple-touch-icon.png",
    "revision": "faf7647e12b5bf8db0949bd3096a95ca"
  },
  {
    "url": "icons/favicon-16x16.png",
    "revision": "7eac7f923680dade5ce6dfb3baa5ce5b"
  },
  {
    "url": "icons/favicon-32x32.png",
    "revision": "e4b7c81bec9bed6ebae601282b236271"
  },
  {
    "url": "icons/mstile-144x144.png",
    "revision": "f7c8ce173e8924fc03e4b39110d2de53"
  },
  {
    "url": "icons/mstile-150x150.png",
    "revision": "74c8878bc8e84c7cb473571c50d516e1"
  },
  {
    "url": "icons/mstile-310x150.png",
    "revision": "de808316c175aa2510ce35606ac52af3"
  },
  {
    "url": "icons/mstile-310x310.png",
    "revision": "9488ad9ebd84ba4a3b45525c05eda1be"
  },
  {
    "url": "icons/mstile-70x70.png",
    "revision": "f7ef0c5cdb484514bbe22d56ccec61a7"
  },
  {
    "url": "icons/safari-pinned-tab.svg",
    "revision": "ea71be864447d72b97b03cdd988c62ba"
  },
  {
    "url": "index.html",
    "revision": "475ecf484a2d18776db32e28a336cf4c"
  },
  {
    "url": "notes/etools-tuts-preface.html",
    "revision": "fdebfef8752d2d2019499db4c5ca36e6"
  },
  {
    "url": "notes/index.html",
    "revision": "d360d2bc65473f219fa192e30320dc5c"
  },
  {
    "url": "notes/self-learning-physics.html",
    "revision": "e6be4b3f6f52c3f6f8a825da1563bff2"
  },
  {
    "url": "projects/Bandersnatch-Interactive-Player/index.html",
    "revision": "42ccce6df49554b233d0437486f4fdc6"
  },
  {
    "url": "projects/faPoems/index.html",
    "revision": "ade89926836fb668f3857a3ef4adacbf"
  },
  {
    "url": "projects/index.html",
    "revision": "059605cef35c13ca40b5d360868db62f"
  },
  {
    "url": "projects/p2p-jamstack/index.html",
    "revision": "d4a1152e57c8320e8cc47a4dec135766"
  },
  {
    "url": "projects/pnews/index.html",
    "revision": "e9ef83158c66118bbe1b59a520e0d8de"
  },
  {
    "url": "smoke.png",
    "revision": "40597647d0ca4e4a5f0708fae9376025"
  },
  {
    "url": "smoke2.png",
    "revision": "3ca5691a1562280e2727ded891d08ebf"
  },
  {
    "url": "stars.jpg",
    "revision": "7854ac61985d52a323e1342b81bd1136"
  },
  {
    "url": "tiny-cload.png",
    "revision": "f86e88bbd24a4e46991c3f6545c45ae2"
  },
  {
    "url": "voice-mail/index.html",
    "revision": "d361e89e333b59970826a429834db1de"
  },
  {
    "url": "webdeveloper-teaching/index.html",
    "revision": "d43049bfcfa3d1806377c86d75674070"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
