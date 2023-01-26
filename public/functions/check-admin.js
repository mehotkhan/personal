export async function onRequest(context) {
  const body = await context.request.json()
  const adminPub = await context.env.ALIZEMANI.get("admin");
  const userPub = body.pub;
  if (adminPub === userPub) {
    return new Response(true);

  } else {
    return new Response(false);

  }

}

