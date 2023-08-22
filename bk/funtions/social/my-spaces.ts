import { badRequest } from "@worker-tools/response-creators";

export async function onRequestPost(context: any) {
  const { request, env } = context;
  const body = await request.json();
  if (!body.pub) return badRequest();

  const dbKey = "member-spaces/" + body.pub;
  const spacesArray = await env.ALIZEMANI.get(dbKey);
  if (spacesArray) {
    return new Response(spacesArray);
  } else {
    return new Response([]);
  }
}
