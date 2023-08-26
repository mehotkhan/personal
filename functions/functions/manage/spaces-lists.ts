import { badRequest } from "@worker-tools/response-creators";

export async function onRequestGet(context: any) {
  const { env } = context;
  const dbKey = "spaces-lists";
  const db = await env.ALIZEMANI.get(dbKey);
  if (!db) return badRequest();
  return new Response(db);
}
