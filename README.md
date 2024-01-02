#### This is main directory

This is frontend repo for this backend: https://github.com/vasily-mishanin/backend-rss-aws-developer

- /webApp - all files related to React + Vite web app

- /webApp/dist - build files for static web site  
   `npm run build` -> new 'dist' content
  then you need to redeploy cdk app

- /cdk - all files for configuring AWS CDK Constructs and Stacks  
   `cdk bootstrap` -> only first time  
   `npm run build`  
   `cdk deploy`

  Backend:
  Product Service API - https://qb6966ovig.execute-api.us-east-1.amazonaws.com/prod
  Swagger - https://app.swaggerhub.com/apis/VASILYMISHANIN_1/products-service-api/1.0.0-oas3

  Frontend:
  Cloudfront Distribution - https://d38xygjrrazjb0.cloudfront.net/

#### Task - 2 - Serving SPA in AWS

https://github.com/rolling-scopes-school/aws/tree/main/aws-developer/02_serving_spa  
What was done?
1.1 Manually via AWS Console:
S3 Bucket with uploaded app files
CloudFront distribution with invalidations
1.2 Programmatically via AWS CDK v2

app architecture was adjusted for AWS CDK v2 (two folders: 'cdk' and 'webApp')
S3 Bucket with uploaded app files
CloudFront distribution with invalidations
App rebuilded and redeployed with changes in background in order to test CloudFront Invalidation
Links are provided in root README.md
for direct S3 - Access Denied - https://ts-react-shop-cdk-s3.s3.amazonaws.com/index.html

for CloudFront Distribution - is available - https://d1ta9wgqox65lg.cloudfront.net/

task-2 branch with work done - https://github.com/vasily-mishanin/nodejs-aws-shop-react/tree/task-2

link for PR (MY OWN Repo) - Task 2 (Serve SPA in AWS S3 and Cloudfront Services) with CDK #1

React App is working but no products. This will be fixed in further development during the course.

#### Task - 3 - Serverless API

Paths adjusted for API Gateway

Frontend Deploy - https://d38xygjrrazjb0.cloudfront.net/

https://github.com/rolling-scopes-school/aws/tree/main/aws-developer/03_serverless_api

S3 bucket creation, website deployment, CloudFront Distribution and Invalidation added and configured by using AWS CDK

CloudFront URL: https://d38xygjrrazjb0.cloudfront.net/ - works - adjusted for API Gateway Products Service

S3-website: https://ts-react-shop-cdk-s3.s3.amazonaws.com/index.html - <Message>Access Denied</Message>

#### Task - 4 - Integration with DynamoDB

https://github.com/rolling-scopes-school/aws/blob/main/aws-developer/04_integration_with_nosql_database/README.md
DynamoDB Integration

#### Taks - 5 - import service

Import products via CSV upload and parse
added to API paths:
`import: 'https://xx44v5lsg3.execute-api.us-east-1.amazonaws.com/prod'` - for calling lambda to create Signed Upload URL for CSV file of products' data

#### Task - 6 (SQS & SNS, Async Microservices Communication)

All done on backend

#### Task 7 (Authorization)

https://github.com/rolling-scopes-school/aws/blob/main/aws-developer/07_authorization/task.md

#### Task 9 (Docker and AWS Elastic Beanstalk)

added  
 // AWS Elastic Beanstalk domain
// http://vasily-mishanin-cart-api-test.us-east-1.elasticbeanstalk.com/api
cart: 'https://8n6zt7471d.execute-api.us-east-1.amazonaws.com/api', // AWS Elastic Beanstalk domain proxy with API Gateway
