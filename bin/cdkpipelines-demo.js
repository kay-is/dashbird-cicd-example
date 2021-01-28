#!/usr/bin/env node
const { App } = require("@aws-cdk/core");
const {
  CdkpipelinesDemoPipelineStack,
} = require("../lib/cdkpipelines-demo-pipeline-stack");
const credentials = require("../credentials.json");

const app = new App();

new CdkpipelinesDemoPipelineStack(app, "CdkpipelinesDemoPipelineStack", {
  env: {
    account: credentials.aws.account,
    region: credentials.aws.region,
  },
});

app.synth();
