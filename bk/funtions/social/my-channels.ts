import { badRequest } from "@worker-tools/response-creators";

export async function onRequestPost(context: any) {
  const { request, env } = context;
  const body = await request.json();
  if (!body.pub) return badRequest();

  const dbKey = "user-groups/" + body.pub;
  const groupsArray = await env.ALIZEMANI.get(dbKey);
  if (groupsArray) {
    return new Response(groupsArray);
  } else {
    return badRequest();
  }
}
