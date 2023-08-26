import { useStorage } from "@vueuse/core";
import {
  generatePrivateKey,
  getPublicKey,
  // getEventHash,
  // getSignature,
} from "nostr-tools";

const loggedIn = useStorage("loggedIn", false);

const profile = useStorage("current-user", {
  firstName: "",
  lastName: "",
  displayName: "",
  name: "",
  about: "",
  email: "",
  avatar: null,
  pub: "",
  priv: "",
});

export default () => {
  // const { $publish, $dexieDb, $relaySubscribeUser } = useNuxtApp();
  // const { currentSpace } = useStream();
  // const { uploadAvatar } = useMedia();

  const registerNew = async () => {
    if (!loggedIn.value) {
      const priv = generatePrivateKey(); // `sk` is a hex string
      const pub = getPublicKey(priv); // `pk` is a hex string
      const randomName = SeedNames(pub);
      const guestProfile = "guest";

      const newProfile = {
        firstName: randomName.split(" ")[0],
        lastName: randomName.split(" ")[1],
        displayName: randomName,
        name: guestProfile,
        about: `یک ${randomName} تازه وارد :) `,
        email: "guest@guest.guest",
        avatar: "",
      };
      const user = {
        pub,
        priv,
      };
      // setProfileMetadata(newProfile, user);
      // uploadUserDetails(newProfile, pub);
      loggedIn.value = true;
    }
    console.log("profile", profile.value);
  };

  // const UpdateUserDetails = async (userDetails: any) => {
  //   const { pub, priv } = profile.value;
  //   const user = {
  //     pub,
  //     priv,
  //   };
  //   await uploadAvatar(userDetails.avatar, pub);
  //   await uploadUserDetails(userDetails, pub);
  //   delete userDetails.avatar;
  //   setProfileMetadata(userDetails, user);
  // };

  // const setProfileMetadata = (newProfile: any, user: any) => {
  //   const newEvent: any = {
  //     kind: 0,
  //     content: JSON.stringify(newProfile),
  //     pubkey: user.pub,
  //     created_at: Math.floor(Date.now() / 1000),
  //     tags: [],
  //   };
  //   newEvent.id = getEventHash(newEvent);
  //   newEvent.sig = getSignature(newEvent, user.priv);
  //   $publish(newEvent, defaultRelays);
  //   profile.value = {
  //     ...newProfile,
  //     ...user,
  //   };
  // };
  // const uploadUserDetails = async (details: any, pub: string) => {
  //   const userData = {
  //     displayName: details.displayName,
  //     about: details.about,
  //     pub,
  //   };
  //   await $fetch(baseApiURL() + "social/set-user-details", {
  //     method: "POST",
  //     body: userData,
  //   });
  // };
  const getUserDetails = async (pub: string) => {
    try {
      const api: string = await $fetch(
        baseApiURL() + "social/get-user-details",
        {
          method: "GET",
          params: {
            pub,
          },
        }
      );
      const response: string[] = await JSON.parse(api);

      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  // const logOut = async () => {
  //   await $dexieDb.delete();
  //   profile.value = null;
  //   loggedIn.value = false;
  //   window.location.reload();
  // };
  // const profileStream = (userPub: string) => {
  //   if (!watchedUser.value.includes(userPub)) {
  //     watchedUser.value.push(userPub);
  //   }
  // };
  // watch(watchedUser, async (newIncoming: string[]) => {
  //   if (newIncoming?.length > 0) {
  //     if (unSubscribe !== null) {
  //       await unSubscribe();
  //       unSubscribe = $relaySubscribeUser(
  //         defaultRelays,
  //         newIncoming,
  //         currentSpace.value.spaceId,
  //       );
  //     } else {
  //       unSubscribe = $relaySubscribeUser(
  //         defaultRelays,
  //         newIncoming,
  //         currentSpace.value.spaceId,
  //       );
  //     }
  //   }
  // });
  // onUnmounted(() => {
  //   console.log("unmount user");

  //   if (unSubscribe !== null) unSubscribe();
  // });
  return {
    profile,
    // logOut,
    registerNew,
    // UpdateUserDetails,
    // profileStream,
    getUserDetails,
  };
};
