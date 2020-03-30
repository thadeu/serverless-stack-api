import Db from "@lib/dynamodb";
import isEmpty from "lodash/isEmpty";

export async function findOne({ event }) {
  return new Promise(async (resolve, reject) => {
    const params = {
      TableName: process.env.TABLE_NAME,
      Key: {
        userId: event.requestContext.identity.cognitoIdentityId,
        noteId: event.pathParameters.id
      }
    };

    try {
      const { Item } = await Db.get(params);
      console.log(Item);
      resolve(Item);
    } catch {
      return reject("Not Found Item");
    }
  });
}

export async function findAll({ event }) {
  return new Promise(async (resolve, reject) => {
    const params = {
      TableName: process.env.TABLE_NAME,
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": event.requestContext.identity.cognitoIdentityId
      }
    };

    try {
      const { Items } = await Db.query(params);

      if (!isEmpty(Items)) {
        return resolve(Items);
      } else {
        return reject({ error: "Items is blank." });
      }
    } catch {
      return reject({ error: "Error in find all items" });
    }
  });
}
