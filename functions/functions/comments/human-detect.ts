export async function onRequestPost(context: any) {
  const { request, env } = context;
  const body = await request.json();
  const token = body.token;
  const ip = request.headers.get("CF-Connecting-IP");
  const SECRET_KEY = env.TURNSTILE_SECRET_KEY;
  const formData = new FormData();
  formData.append("secret", SECRET_KEY);
  formData.append("response", token);
  formData.append("remoteip", ip);

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      body: formData,
      method: "POST",
    },
  );
  const outcome: any = await response.json();
  if (!outcome.success) {
    return new Response(JSON.stringify(outcome));
  }
  return new Response(JSON.stringify(outcome));
}
