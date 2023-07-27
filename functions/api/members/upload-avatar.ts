import { ok, badRequest } from "@worker-tools/response-creators";

export async function onRequestPost(context: any) {
  const { request, env } = context;
  const body = await request.json();
  if (body.pub === null && body.image === null) return badRequest();

  const dbKey = "user-avatar/" + body.pub;
  await env.DEFAULT_KV_NAMESPACE.put(dbKey, body.image);
  return ok();
}
