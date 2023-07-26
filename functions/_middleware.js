// Set CORS to all /api responses
export const onRequest = async ({ next }) => {
  const response = await next()
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Headers', '*')
  response.headers.set('Access-Control-Allow-Methods', '*')
  response.headers.set('Access-Control-Max-Age', '86400')
  return response
}
