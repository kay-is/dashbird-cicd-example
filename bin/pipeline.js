#!/usr/bin/env node
const { App } = require("@aws-cdk/core");
const { PipelineStack } = require("../lib/pipeline-stack");
const credentials = require("../credentials.json");

const app = new App();

new PipelineStack(app, "PipelineStack", {
  env: {
    account: credentials.aws.account,
    region: credentials.aws.region,
  },
});

app.synth();
