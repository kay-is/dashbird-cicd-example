const codepipeline = require("@aws-cdk/aws-codepipeline");
const codepipelineActions = require("@aws-cdk/aws-codepipeline-actions");
const { SecretValue, Stack } = require("@aws-cdk/core");
const { CdkPipeline, SimpleSynthAction } = require("@aws-cdk/pipelines");
const credentials = require("../credentials.json");

class CdkpipelinesDemoPipelineStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const sourceArtifact = new codepipeline.Artifact();
    const cloudAssemblyArtifact = new codepipeline.Artifact();

    new CdkPipeline(this, "Pipeline", {
      pipelineName: "MyServicePipeline",
      cloudAssemblyArtifact,
      sourceAction: new codepipelineActions.GitHubSourceAction({
        actionName: "GitHub",
        output: sourceArtifact,
        oauthToken: SecretValue.secretsManager("github-token"),
        owner: credentials.github.username,
        repo: credentials.github.repository,
      }),
      synthAction: SimpleSynthAction.standardNpmSynth({
        sourceArtifact,
        cloudAssemblyArtifact,
        buildCommand: "npm run build",
      }),
    });
  }
}

module.exports = { CdkpipelinesDemoPipelineStack };