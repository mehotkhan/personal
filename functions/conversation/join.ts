import { ok, badRequest } from "@worker-tools/response-creators";

export async function onRequestPost(context: any) {
  const body = await context.request.json();
  const { pub, path } = body;
  const dbKey = "comments" + path.replace(/-|\/|\./gi, ".");
  const joinDb = await context.env.ALIZEMANI.get(dbKey);
  try {
    if (joinDb) {
      const joinArray = await JSON.parse(joinDb);
      await joinArray.push(pub);
      await context.env.ALIZEMANI.put(
        dbKey,
        JSON.stringify([...new Set(joinArray)])
      );
      return ok();
    } else {
      const joinArray = [pub];
      await context.env.ALIZEMANI.put(dbKey, JSON.stringify(joinArray));
      return ok();
    }
  } catch (error) {
    return badRequest();
  }
}
