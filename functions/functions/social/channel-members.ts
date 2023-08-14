import { badRequest } from "@worker-tools/response-creators";

export async function onRequestPost(context: any) {
  const { request, env } = context;
  const body = await request.json();
  if (!body.groupId) return badRequest();
  const dbKey = "group-members/" + body.groupId;
  const db = await env.ALIZEMANI.get(dbKey);
  if (!db) return badRequest();
  return new Response(db);
}
