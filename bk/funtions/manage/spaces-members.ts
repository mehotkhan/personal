import { badRequest } from "@worker-tools/response-creators";

export async function onRequestGet(context: any) {
  const { request, env } = context;
  const { searchParams } = new URL(request.url);
  const spaceId = searchParams.get("spaceId");
  if (!spaceId) return badRequest();
  const spacesKey = "space-members/" + spaceId;
  const spaceDb = await env.ALIZEMANI.get(spacesKey);

  if (spaceDb) {
    return new Response(spaceDb);
  } else {
    return badRequest();
  }
}
