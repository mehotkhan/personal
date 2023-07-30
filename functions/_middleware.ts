import { forbidden } from "@worker-tools/response-creators";
import { schnorr } from "@noble/curves/secp256k1";
import { sha256 } from "@noble/hashes/sha256";
import { bytesToHex } from "@noble/hashes/utils";

// Respond to OPTIONS method
export const onRequestOptions = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Max-Age": "86400",
    },
  });
};

// Set CORS to all /api responses
export const onRequestGet = async ({ next, request }) => {
  const incomingHeader = new Map(request.headers);
  const ownerPub = incomingHeader.get("ownerpub");
  const requestSign = incomingHeader.get("requestsign");
  if (ownerPub === undefined || requestSign === undefined) return forbidden();
  const payload = JSON.stringify(
    URLSearchParamsToJson(new URL(request.url).searchParams)
  );

  const isValid = schnorr.verify(
    String(requestSign),
    getEventHash(payload),
    String(ownerPub)
  );

  if (!isValid) return forbidden();
  const response = await next();
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Max-Age", "86400");
  return response;
};

export const onRequestPost = async ({ next, request }) => {
  const incomingHeader = new Map(request.headers);
  const ownerPub = incomingHeader.get("ownerpub");
  const requestSign = incomingHeader.get("requestsign");
  if (ownerPub === undefined || requestSign === undefined) return forbidden();
  const payload = JSON.stringify(await request.json());
  const isValid = schnorr.verify(
    String(requestSign),
    getEventHash(payload),
    String(ownerPub)
  );
  if (!isValid) return forbidden();
  const response = await next();
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Max-Age", "86400");
  return response;
};

const URLSearchParamsToJson = (input: any) => {
  const searchParams = new URLSearchParams(input);
  return Object.fromEntries([...searchParams]);
};
const getEventHash = (data: any): string => {
  const encoder = new TextEncoder();

  const requestHash = sha256(encoder.encode(data));
  return bytesToHex(requestHash);
};
