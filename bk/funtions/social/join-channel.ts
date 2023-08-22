import { ok, badRequest } from "@worker-tools/response-creators";

export async function onRequestPost(context: any) {
  const { request, env } = context;
  const body = await request.json();
  if (!body.groupId && !body.pub) return badRequest();

  const dbKey = "user-groups/" + body.pub;
  const groupsArray = await env.ALIZEMANI.get(dbKey);
  try {
    if (groupsArray) {
      const joinArray = await JSON.parse(groupsArray);
      await joinArray.push(body.groupId);
      await context.env.ALIZEMANI.put(
        dbKey,
        JSON.stringify([...new Set(joinArray)]),
      );
      return ok();
    } else {
      const joinArray = [body.groupId];
      await context.env.ALIZEMANI.put(dbKey, JSON.stringify(joinArray));
      return ok();
    }
  } catch (error) {
    return badRequest(JSON.stringify(error));
  }
}
