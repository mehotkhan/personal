function renderBody(status: any, content: any) {
  const html = `
    <script>
      const receiveMessage = (message) => {
        window.opener.postMessage(
          'authorization:github:${status}:${JSON.stringify(content)}',
          message.origin
        );
        window.removeEventListener("message", receiveMessage, false);
      }
      window.addEventListener("message", receiveMessage, false);
      window.opener.postMessage("authorizing:github", "*");
    </script>
    `;
  const blob = new Blob([html]);
  return blob;
}

export async function onRequest(context: any) {
  const { request, env } = context;

  try {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const response = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "user-agent": "cloudflare-functions-github-oauth-login",
          accept: "application/json",
        },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      }
    );
    const result: any = await response.json();
    if (result.error) {
      return new Response(renderBody("error", result), {
        headers: {
          "content-type": "text/html;charset=UTF-8",
        },
        status: 401,
      });
    }
    const token = result.access_token;
    const provider = "github";
    const responseBody = renderBody("success", {
      token,
      provider,
    });
    return new Response(responseBody, {
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
      status: 200,
    });
  } catch (error) {
    return new Response(error.message, {
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
      status: 500,
    });
  }
}
