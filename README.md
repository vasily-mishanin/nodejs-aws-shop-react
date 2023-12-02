#### This is main directory

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

#### Task - 2 - Done

#### Task - 3 - Done

S3 bucket creation, website deployment, CloudFront Distribution and Invalidation added and configured by using AWS CDK

CloudFront URL: https://d38xygjrrazjb0.cloudfront.net/ - works - adjusted for API Gateway Products Service

S3-website: https://ts-react-shop-cdk-s3.s3.amazonaws.com/index.html - <Message>Access Denied</Message>

#### Task - 4 - Done

DynamoDB Integration

#### Taks - 5

Import products via CSV upload and parse
added to API paths:
`import: 'https://xx44v5lsg3.execute-api.us-east-1.amazonaws.com/prod'` - for calling lambda to create Signed Upload URL for CSV file of products' data
