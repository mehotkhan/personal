import { ok, badRequest } from "@worker-tools/response-creators";
export async function onRequestPost(context: any) {
  const body = await context.request.json();
  const { pub, path } = body;
  const dbKey = "comments" + path.replace(/-|\/|\./gi, ".");

  const joinDb = await context.env.ALIZEMANI.get(dbKey);
  if (joinDb) {
    const joinArray = JSON.parse(joinDb);
    if (joinArray.includes(pub)) {
      return ok();
    } else {
      return badRequest();
    }
  } else {
    return badRequest();
  }
}
