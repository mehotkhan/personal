import { ok, badRequest } from "@worker-tools/response-creators";

export async function onRequestGet(context: any) {
  const { request, env } = context;
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  if (!name) return badRequest();
  const dbKey = "members/" + name;
  const userProfile = await env.ALIZEMANI.get(dbKey);

  if (!userProfile) {
    return ok();
  } else {
    return badRequest();
  }
}
