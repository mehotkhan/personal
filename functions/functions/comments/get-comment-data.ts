import { badRequest } from "@worker-tools/response-creators";

export async function onRequestGet(context: any) {
  const { request, env } = context;
  const { searchParams } = new URL(request.url);

  const commentKey = searchParams.get("commentKey");
  if (commentKey === null) return badRequest();
  const commentData = await env.ALIZEMANI.get(commentKey);
  if (commentData) {
    return new Response(commentData);
  } else {
    return badRequest();
  }
}
