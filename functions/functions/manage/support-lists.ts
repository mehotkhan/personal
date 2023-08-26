import { badRequest, ok } from "@worker-tools/response-creators";

export async function onRequestGet(context: any) {
  const { env } = context;
  const dbKey = "supports-lists";
  const db = await env.ALIZEMANI.get(dbKey);
  if (!db) return ok("[]");
  return new Response(db);
}
