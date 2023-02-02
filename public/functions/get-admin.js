export async function onRequest(context) {
  const adminPub = await context.env.ALIZEMANI.get("admin");
  if (adminPub) {
    return new Response(JSON.stringify(adminPub));
  } else {
    return new Response(JSON.stringify(""));
  }
}
