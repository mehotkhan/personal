import { badRequest, ok } from "@worker-tools/response-creators";

export async function onRequestPost(context: any) {
  const { request, env } = context;
  const body = await request.json();
  if (!body.title && !body.answer && !body.order && !body.id)
    return badRequest();

  const dbKey = "qa-lists";
  const qaDb = await env.ALIZEMANI.get(dbKey);
  if (qaDb) {
    const joinArray = await JSON.parse(qaDb);
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
