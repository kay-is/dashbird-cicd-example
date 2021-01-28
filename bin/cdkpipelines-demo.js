#!/usr/bin/env node

const cdk = require('@aws-cdk/core');
const { CdkpipelinesDemoStack } = require('../lib/cdkpipelines-demo-stack');

const app = new cdk.App();
new CdkpipelinesDemoStack(app, 'CdkpipelinesDemoStack');
