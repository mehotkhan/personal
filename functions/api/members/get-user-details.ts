import { badRequest } from "@worker-tools/response-creators";

export async function onRequestGet(context: any) {
  console.log("hi");
  const { request, env } = context;
  const { searchParams } = new URL(request.url);
  const pub = searchParams.get("pub");
  if (pub === null) return badRequest();
  const dbKey = "user-details/" + pub;
  const userDetails = await env.DEFAULT_KV_NAMESPACE.get(dbKey);
  if (userDetails) {
    return new Response(userDetails);
  } else {
    return new Response("null");
  }
}
