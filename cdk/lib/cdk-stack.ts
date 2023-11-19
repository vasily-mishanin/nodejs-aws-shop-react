import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import {
  aws_iam as iam,
  aws_s3 as s3,
  aws_cloudfront as cloudfront,
  aws_s3_deployment as s3deploy,
} from 'aws-cdk-lib';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const myBucket = new s3.Bucket(this, 'TSReactShopStaticBucket', {
      bucketName: 'ts-react-shop-cdk-s3',
      websiteIndexDocument: 'index.html',
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    });

    const cloudfrontOAI = new cloudfront.OriginAccessIdentity(
      this,
      'TSReact-OAI'
    );

    myBucket.addToResourcePolicy(
      new iam.PolicyStatement({
        actions: ['S3:GetObject'],
        resources: [myBucket.arnForObjects('*')],
        principals: [
          new iam.CanonicalUserPrincipal(
            cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId
          ),
        ],
      })
    );

    const cloudFrontDistribution = new cloudfront.CloudFrontWebDistribution(
      this,
      'TSReact-distribution',
      {
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: myBucket,
              originAccessIdentity: cloudfrontOAI,
            },
            behaviors: [{ isDefaultBehavior: true }],
          },
        ],
      }
    );

    new s3deploy.BucketDeployment(this, 'TSReact-Bucket-Deployment', {
      sources: [s3deploy.Source.asset('../webApp/dist')],
      destinationBucket: myBucket,
      distribution: cloudFrontDistribution,
      distributionPaths: ['/*'],
    });
  }
}
