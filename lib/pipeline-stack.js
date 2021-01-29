const codepipeline = require("@aws-cdk/aws-codepipeline");
const codepipelineActions = require("@aws-cdk/aws-codepipeline-actions");
const { SecretValue, Stack } = require("@aws-cdk/core");
const {
  CdkPipeline,
  SimpleSynthAction,
  ShellScriptAction,
} = require("@aws-cdk/pipelines");

const { WebServiceStage } = require("./webservice/stage");
const credentials = require("../credentials.json");

class PipelineStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const sourceArtifact = new codepipeline.Artifact();
    const cloudAssemblyArtifact = new codepipeline.Artifact();

    const oauthToken = SecretValue.secretsManager("github-token");

    const pipeline = new CdkPipeline(this, "Pipeline", {
      pipelineName: "WebServicePipeline",
      cloudAssemblyArtifact,
      sourceAction: new codepipelineActions.GitHubSourceAction({
        actionName: "GitHub",
        oauthToken,
        owner: credentials.github.username,
        repo: credentials.github.repository,
        branch: "main",
        output: sourceArtifact,
      }),
      synthAction: SimpleSynthAction.standardNpmSynth({
        sourceArtifact,
        cloudAssemblyArtifact,
      }),
    });

    const preprod = new WebServiceStage(this, "PreProd", {
      env: {
        account: credentials.aws.account,
        region: credentials.aws.region,
      },
    });

    const preprodStage = pipeline.addApplicationStage(preprod);

    preprodStage.addActions(
      new ShellScriptAction({
        actionName: "Endpoint Test",
        useOutputs: {
          ENDPOINT_URL: pipeline.stackOutput(preprod.urlOutput),
        },
        commands: ["curl -Ssf $ENDPOINT_URL"],
      })
    );
  }
}

module.exports = { PipelineStack };
