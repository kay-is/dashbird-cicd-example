async function handler(event, context) {
  notDefined.throwError;
  return { body: "Hello", statusCode: 200 };
}

module.exports = { handler };
