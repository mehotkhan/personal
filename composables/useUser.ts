import { useStorage } from "@vueuse/core";
import { secp256k1 } from "@noble/curves/secp256k1";
import { bytesToHex } from "@noble/hashes/utils";

const loggedIn = useStorage("loggedIn", false);
const profile = useStorage("current-user", {
  userName: "",
  firstName: "",
  lastName: "",
  displayName: "",
  about: "",
  email: "",
  avatar: null,
  pub: "",
  priv: "",
});

export default () => {
  const registerNew = async () => {
    if (!loggedIn.value) {
      const priv = secp256k1.utils.randomPrivateKey();
      const privHash = bytesToHex(priv);
      const pub = secp256k1.getPublicKey(priv);
      const pubHash = bytesToHex(pub);
      const randomName = SeedNames(pub);
      const guestProfile = "guest";
      const newProfile = {
        firstName: randomName.split(" ")[0],
        lastName: randomName.split(" ")[1],
        displayName: randomName,
        userName: guestProfile,
        about: `یک ${randomName} تازه وارد :) `,
        email: "guest@guest.guest",
        avatar: null,
        pub: pubHash,
        priv: privHash,
      };
      profile.value = newProfile;
      uploadUserDetails(newProfile);
      loggedIn.value = true;
    }
    await getUserDetails(profile.value.pub);
  };
  const uploadUserDetails = async (details: any) => {
    console.log(details);

    await $fetch(baseApiURL() + "members/set-user-details", {
      method: "POST",
      body: details,
    });
  };
  const getUserDetails = async (pub: string) => {
    try {
      const api: string = await $fetch(
        baseApiURL() + "members/get-user-details",
        {
          method: "GET",
          params: {
            pub,
          },
        },
      );
      const response: string[] = await JSON.parse(api);
      console.log("server", response);

      // return response;
    } catch (error) {
      console.log(error);
      return null;
    }
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

  // const getUserDetails = async (pub: string) => {
  //   try {
  //     const api: string = await $fetch(
  //       baseApiURL() + "social/get-user-details",
  //       {
  //         method: "GET",
  //         params: {
  //           pub,
  //         },
  //       }
  //     );
  //     const response: string[] = await JSON.parse(api);

  //     return response;
  //   } catch (error) {
  //     console.log(error);
  //     return null;
  //   }
  // };
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
  //         currentSpace.value.spaceId
  //       );
  //     } else {
  //       unSubscribe = $relaySubscribeUser(
  //         defaultRelays,
  //         newIncoming,
  //         currentSpace.value.spaceId
  //       );
  //     }
  //   }
  // });
  // onUnmounted(() => {
  //   console.log("unmount user");

  //   if (unSubscribe !== null) unSubscribe();
  // });
  return {
    registerNew,
    profile,
    // logOut,
    // UpdateUserDetails,
    // profileStream,
    // getUserDetails,
  };
};
