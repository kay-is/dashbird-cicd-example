const apiGateway = require("@aws-cdk/aws-apigateway");
const lambda = require("@aws-cdk/aws-lambda");
const { CfnOutput, Stack } = require("@aws-cdk/core");
const path = require("path");

class CdkpipelinesDemoStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const handler = new lambda.Function(this, "Lambda", {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "handler.handler",
      code: lambda.Code.fromAsset(path.resolve(__dirname, "lambda")),
    });

    const api = new apiGateway.LambdaRestApi(this, "Gateway", { handler });

    this.urlOutput = new CfnOutput(this, "Url", { value: api.url });
  }
}

module.exports = { CdkpipelinesDemoStack };
