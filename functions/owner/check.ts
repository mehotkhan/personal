import { ok, badRequest } from "@worker-tools/response-creators";

export async function onRequestPost(context: any) {
  const body = await context.request.json();
  const adminPub = await context.env.ALIZEMANI.get("admin");
  try {
    if (adminPub === body.pub) {
      return ok();
    } else {
      return badRequest();
    }
  } catch (error) {
    return badRequest();
  }
}
