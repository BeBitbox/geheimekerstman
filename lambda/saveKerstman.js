"use strict";

const AWS = require('aws-sdk');

exports.handler = async (event) => {
  console.log('event', event);

  if (event.httpMethod === 'OPTIONS' || event.requestContext?.http?.method === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
      body: JSON.stringify('Hello from Lambda!'),
    }
  }

  const dynamo = new AWS.DynamoDB({params: {TableName: "kerstmannen"}});
  const body = JSON.parse(event.body);
  const item = {
    Item: {
      naam: {S: body.naam},
      email: {S: body.email},
      adres: {S: body.adres}
    }
  };

  if (body.tip) {
    item.Item.tip = {S: body.tip}
  }

  return new Promise(function (resolve) {
    dynamo.putItem(item, function (err, result) {
      if (err) {
        console.log({
          level: "error",
          message: "putItem() returned error " + JSON.stringify(item),
          error: err,
          stack: err.stack
        })
        resolve(false);
      }
      console.log({
        level: "info",
        message: "putItem() successful.",
        result: result
      });
      resolve(true);
    })
  }).then(response => {
      return {
        statusCode: response ? 200 : 500,
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: JSON.stringify('Hello from Lambda!'),
      }
    }
  );
}
