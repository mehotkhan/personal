import { ok, badRequest } from "@worker-tools/response-creators";

export async function onRequestPost(context: any) {
  const { request, env } = context;
  const body = await request.json();
  if (body.pub === null && body.displayName === null && body.about === null)
    return badRequest();

  const dbKey = "user-details/" + body.pub;
  await env.DEFAULT_KV_NAMESPACE.put(dbKey, JSON.stringify(body));
  return ok(dbKey);
}
