const API_PATHS = {
  // product: "https://.execute-api.eu-west-1.amazonaws.com/dev", // original
  //product: 'https://d7y13um978.execute-api.us-east-1.amazonaws.com', // Serverless created
  product: 'https://qb6966ovig.execute-api.us-east-1.amazonaws.com/prod',
  //
  order: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
  import: 'https://xx44v5lsg3.execute-api.us-east-1.amazonaws.com/prod', // call lambda to get url for uploading a file with ?name=<fileName>
  bff: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
  //cart: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
  cart: 'https://1pixe3aon6.execute-api.us-east-1.amazonaws.com/prod/api', // cart serivce - Nest JS as Lambda

  // AWS Elastic Beanstalk domain
  // http://vasily-mishanin-cart-api-test.us-east-1.elasticbeanstalk.com/api
  //cart: 'https://8n6zt7471d.execute-api.us-east-1.amazonaws.com/api', // AWS Elastic Beanstalk domain proxy with API Gateway
};

export default API_PATHS;
