import AWS from "aws-sdk";

// AWS.config.update({ region: "us-east-1" });

const db = new AWS.DynamoDB.DocumentClient();

export function call(action, params) {
  return db[action](params).promise();
}

export default {
  put: params => call("put", params),
  update: params => call("update", params),
  get: params => call("get", params),
  query: params => call("query", params),
  delete: params => call("delete", params)
};
