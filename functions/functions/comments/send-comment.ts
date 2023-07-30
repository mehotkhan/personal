import { ok, badRequest } from "@worker-tools/response-creators";
import { WebUUID } from "web-uuid";

export async function onRequestPost(context: any) {
  const { request, env } = context;
  const body = await request.json();
  const incomingHeader = new Map(request.headers);
  const userPub = incomingHeader.get("ownerpub");
  if (
    typeof body.comment === undefined &&
    typeof body.date === undefined &&
    typeof body.path === undefined
  )
    return badRequest();
  const commentId = new WebUUID();
  const dbKey = "comments/pending" + body.path + "/" + commentId;
  const commentBody = {
    comment: body.comment,
    date: body.date,
    user: userPub,
    commentId,
  };
  await env.ALIZEMANI.put(dbKey, JSON.stringify(commentBody));
  return ok();
}
