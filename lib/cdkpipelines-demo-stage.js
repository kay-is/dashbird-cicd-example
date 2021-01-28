const { Stage } = require("@aws-cdk/core");
const { CdkpipelinesDemoStack } = require("./cdkpipelines-demo-stack");

class CdkpipelinesDemoStage extends Stage {
  urlOutput = null;

  constructor(scope, id, props) {
    super(scope, id, props);

    const service = new CdkpipelinesDemoStack(this, "WebService");

    this.urlOutput = service.urlOutput;
  }
}
module.exports = { CdkpipelinesDemoStage };
