import { ok, badRequest } from "@worker-tools/response-creators";
import * as Structured from "@worker-tools/structured-json";

export async function onRequestPost(context: any) {
  const { request, env } = context;
  const body = await request.json();
  if (!body.pub) return badRequest();
  const publicMembers = await env.ALIZEMANI.get("members/public");
  const publicArray: string[] = Structured.toJSON(publicMembers);

  if (publicArray.includes(body.pub)) {
    return ok();
  } else {
    return badRequest("no");
  }
}
