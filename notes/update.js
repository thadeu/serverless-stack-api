import Db from "@lib/dynamodb";
import { success, failure } from "@lib/response";
import { parse } from "@lib/utils";

export async function main(event, context) {
  const data = parse(event.body);

  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    },

    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET content = :content",
    ExpressionAttributeValues: {
      ":content": data.content || null
    },

    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW"
  };

  try {
    const { Attributes } = await Db.update(params);

    return success({ data: Attributes });
  } catch (error) {
    return failure({ data: [] });
  }
}
