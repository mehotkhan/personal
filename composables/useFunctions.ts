import { schnorr } from "@noble/curves/secp256k1";
import { sha256 } from "@noble/hashes/sha256";
import { bytesToHex } from "@noble/hashes/utils";

export function useFunctions<T>(
  request: Parameters<typeof $fetch<T>>[0],
  opts?: Parameters<typeof $fetch<T>>[1]
) {
  const { profile } = useUser();
  let requestString = "";
  if (opts?.method === "GET") {
    requestString = JSON.stringify(opts?.params);
  } else if (opts?.method === "POST") {
    requestString = JSON.stringify(opts.body);
  }
  const sig = bytesToHex(
    schnorr.sign(getEventHash(requestString), profile.value.priv)
  );
  return $fetch<T, R>(request, {
    ...opts,
    headers: {
      ownerPub: profile.value.pub,
      requestSign: sig,
      ...opts?.headers,
    },
  });
}

const getEventHash = (data: any): string => {
  const encoder = new TextEncoder();

  const requestHash = sha256(encoder.encode(data));
  return bytesToHex(requestHash);
};
