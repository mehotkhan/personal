export async function onRequest(context) {
  const body = await context.request.json()
  const task = await context.env.ALIZEMANI.get("admin");
  const userPub = body.pub;
  if (task === userPub) {
    return new Response(true);

  } else {
    return new Response(false);

  }

}

