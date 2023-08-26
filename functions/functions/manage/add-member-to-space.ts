import { badRequest, ok } from "@worker-tools/response-creators";

export async function onRequestPost(context: any) {
  const { request, env } = context;
  const body = await request.json();
  if (
    !body.spaceId &&
    !body.title &&
    !body.about &&
    !body.relay &&
    !body.picture &&
    !body.userPub
  )
    return badRequest();
  const userPub = body.userPub;
  delete body.userPub;
  const memberSpacesKey = "member-spaces/" + userPub;
  const memberSpacesDb = await env.ALIZEMANI.get(memberSpacesKey);
  if (memberSpacesDb) {
    const joinArray = await JSON.parse(memberSpacesDb);
    await joinArray.push(body);
    await context.env.ALIZEMANI.put(
      memberSpacesKey,
      JSON.stringify([...new Set(joinArray)]),
    );
  } else {
    const joinArray = [body];
    await context.env.ALIZEMANI.put(memberSpacesKey, JSON.stringify(joinArray));
  }

  // add member to space array
  const spacesKey = "space-members/" + body.spaceId;
  const spacesDb = await env.ALIZEMANI.get(spacesKey);
  if (spacesDb) {
    const joinArray = await JSON.parse(spacesDb);
    await joinArray.push(userPub);
    await context.env.ALIZEMANI.put(
      spacesKey,
      JSON.stringify([...new Set(joinArray)]),
    );
  } else {
    const joinArray = [userPub];
    await context.env.ALIZEMANI.put(spacesKey, JSON.stringify(joinArray));
  }
  return ok();
}
