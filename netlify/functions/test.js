exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'Hello from Netlify Functions!',
      method: event.httpMethod,
      path: event.path
    }),
  };
};
