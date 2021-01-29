const apiGateway = require("@aws-cdk/aws-apigateway");
const lambda = require("@aws-cdk/aws-lambda");
const { CfnOutput, Stack } = require("@aws-cdk/core");
const path = require("path");

class WebServiceStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const code = lambda.Code.fromAsset(path.resolve(__dirname, "lambda"));

    const handler = new lambda.Function(this, "Lambda", {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "handler.handler",
      code,
    });

    const api = new apiGateway.LambdaRestApi(this, "Gateway", { handler });

    this.urlOutput = new CfnOutput(this, "Url", { value: api.url });
  }
}

module.exports = { WebServiceStack };
