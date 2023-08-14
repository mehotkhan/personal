import { ok, badRequest } from "@worker-tools/response-creators";

export async function onRequestPost(context: any) {
  const { request, env } = context;
  const body = await request.json();
  if (!body.groupId) return badRequest();
  const { groupId } = body;
  const dbKey = "public-group/";
  const groupArray = await env.ALIZEMANI.get(dbKey);
  try {
    if (groupArray) {
      const joinArray = await JSON.parse(groupArray);
      await joinArray.push(groupId);
      await context.env.ALIZEMANI.put(
        dbKey,
        JSON.stringify([...new Set(joinArray)]),
      );
      return ok();
    } else {
      const joinArray = [groupId];
      await context.env.ALIZEMANI.put(dbKey, JSON.stringify(joinArray));
      return ok();
    }
  } catch (error) {
    return badRequest(JSON.stringify(error));
  }
}
