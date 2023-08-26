import { badRequest, ok } from "@worker-tools/response-creators";

export async function onRequestPost(context: any) {
  const { request, env } = context;
  const body = await request.json();
  if (!body.pub && !body.name && !body.about) return badRequest();

  const dbKey = "supports-lists";
  const supportDb = await env.ALIZEMANI.get(dbKey);
  if (supportDb) {
    const joinArray = await JSON.parse(supportDb);
    await joinArray.push(body);
    await context.env.ALIZEMANI.put(
      dbKey,
      JSON.stringify([...new Set(joinArray)]),
    );
  } else {
    const joinArray = [body];
    await context.env.ALIZEMANI.put(dbKey, JSON.stringify(joinArray));
  }
  return ok();
}
