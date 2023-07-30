// import { badRequest } from "@worker-tools/response-creators";

export async function onRequestGet(context: any) {
  const { request, env } = context;

  const query = await env.ALIZEMANI.list({
    prefix: "comments/pending/",
  });
  const pendingComments = await query.keys.map((item: any) => item.name);
  return new Response(JSON.stringify(pendingComments));
}
