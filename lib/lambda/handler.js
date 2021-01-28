async function handler(event, context) {
  return { body: "Hello", statusCode: 200 };
}

module.exports = { handler };
