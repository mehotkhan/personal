import { badRequest } from "@worker-tools/response-creators";

export async function onRequestGet(context: any) {
  const { request, env } = context;
  const { searchParams } = new URL(request.url);
  const dateRange = searchParams.get("range"); // like 10 hr
  if (dateRange === null) return badRequest();

  // date range like : from now to -10hr
  const date = new Date(Date.now() - Number(dateRange) * 60 * 60 * 1000);
  const dateFormat = `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}/`;
  console.log("comments/pending/" + dateFormat);
  console.log("dateRange", dateRange);

  const query = await env.ALIZEMANI.list({
    // prefix: "comments/pending/",
    prefix: "comments/pending/" + dateFormat,
  });
  const pendingComments = await query.keys.map((item: any) => item.name);
  return new Response(JSON.stringify(pendingComments));
}
