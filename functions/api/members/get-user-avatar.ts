import { badRequest } from "@worker-tools/response-creators";

export async function onRequestGet(context: any) {
  const { request, env } = context;
  const { searchParams } = new URL(request.url);
  const pub = searchParams.get("pub");
  if (pub === null) return badRequest();
  const dbKey = "user-avatar/" + pub;
  const userAvatar = await env.DEFAULT_KV_NAMESPACE.get(dbKey);
  if (userAvatar) {
    return new Response(userAvatar);
  } else {
    return new Response(null);
  }
}
