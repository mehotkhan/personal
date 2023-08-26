import { badRequest, ok } from "@worker-tools/response-creators";

export async function onRequestDelete(context: any) {
  const { request, env } = context;
  const { searchParams } = new URL(request.url);
  const supportId = searchParams.get("supportId");
  if (supportId === null) return badRequest();

  const dbKey = "supports-lists";
  const supportDb = await env.ALIZEMANI.get(dbKey);
  if (supportDb) {
    const allArray = await JSON.parse(supportDb);
    const newArray = await allArray.filter(
      (item: any) => item.id !== supportId,
    );
    await context.env.ALIZEMANI.put(dbKey, JSON.stringify(newArray));
    return ok();
  } else {
    return badRequest();
  }
}
