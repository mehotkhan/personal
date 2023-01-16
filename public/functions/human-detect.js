export async function onRequest(context) {
  const {
    request, // same as existing Worker API
    env, // same as existing Worker API
    params, // if filename includes [id] or [[path]]
    waitUntil, // same as ctx.waitUntil in existing Worker API
    next, // used for middleware or to fetch assets
    data, // arbitrary space for passing data between middlewares
  } = context
  const body = await request.json()
  const token = body.token;
  const ip = request.headers.get('CF-Connecting-IP');
  const SECRET_KEY = '0x4AAAAAAAB-JGPx3yaSsXw1XaJ8NVdI5jQ'
  // Validate the token by calling the "/siteverify" API.
  let formData = new FormData();
  formData.append('secret', SECRET_KEY);
  formData.append('response', token);
  formData.append('remoteip', ip);

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    body: formData,
    method: 'POST',
  });
  const outcome = await response.json();
  if (!outcome.success) {
    return new Response(JSON.stringify(outcome));
  }
  // The Turnstile token was successfuly validated. Proceed with your application logic.
  // Validate login, redirect user, etc.
  // For this demo, we just echo the "/siteverify" response:
  return new Response(JSON.stringify(outcome));
}

