// import { badRequest } from '@worker-tools/response-creators'
import * as Structured from "@worker-tools/structured-json";
import { JSONResponse } from "@worker-tools/json-fetch";

export async function onRequestGet(context: any) {
  const { env } = context;
  const publicMembers = await env.ALIZEMANI.get("members/public");
  // const publicArray: string[] = Structured.toJSON(publicMembers)
  // const members: any = await env.ALIZEMANI.list({
  //   prefix: 'members',
  // })
  // if (!members?.keys) return badRequest()
  // const membersIds: string[] = members.keys.map((memberId: any) =>
  //   memberId.name.replace('members/', '')
  // )
  return new JSONResponse(Structured.toJSON(publicMembers));
}
