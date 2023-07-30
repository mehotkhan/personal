import { useStorage } from "@vueuse/core";
import { secp256k1, schnorr } from "@noble/curves/secp256k1";
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
    if (typeof window === undefined) return;

    if (!loggedIn.value) {
      const priv = generatePrivateKey();
      const pub = getPublicKey(priv);
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
        pub,
        priv,
      };
      profile.value = newProfile;
      uploadUserDetails(newProfile);
      loggedIn.value = true;
    }
  };
  const uploadUserDetails = async (details: any) => {
    if (typeof window === undefined) return;

    try {
      await useFunctions(baseApiURL() + "members/set-user-details", {
        method: "POST",
        body: details,
      });
    } catch (error) {}
  };

  const getUserDetails = async (pub: string) => {
    try {
      const api: string = await useFunctions(
        baseApiURL() + "members/get-user-details",
        {
          method: "GET",
          params: {
            pub,
          },
        }
      );
      const response: any = await JSON.parse(api);
      return response;
    } catch (error) {}
  };

  return {
    registerNew,
    profile,
    getUserDetails,
  };
};

const generatePrivateKey = (): string => {
  return bytesToHex(schnorr.utils.randomPrivateKey());
};

const getPublicKey = (privateKey: string): string => {
  return bytesToHex(schnorr.getPublicKey(privateKey));
};
