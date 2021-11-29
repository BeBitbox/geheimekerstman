const AWS = require('aws-sdk');

exports.handler = async (event) => {
  console.log('event', event);

  const params = {
    TableName: "kerstmannen"
  };
  const dynamo = new AWS.DynamoDB();
  const scanResults = [];
  const response = await dynamo.scan(params)
    .promise()
    .catch(console.error);
  response.Items.forEach((item) => scanResults.push(item.naam.S));

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(scanResults)
  };
};

