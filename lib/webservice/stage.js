const { Stage } = require("@aws-cdk/core");
const { WebServiceStack } = require("./stack");

class WebServiceStage extends Stage {
  constructor(scope, id, props) {
    super(scope, id, props);

    const service = new WebServiceStack(this, "WebService");

    this.urlOutput = service.urlOutput;
  }
}
module.exports = { WebServiceStage };
