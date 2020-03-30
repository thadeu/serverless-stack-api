import Db from "@lib/dynamodb";
import { success, failure } from "@lib/response";

export async function main(event, context) {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    }
  };

  try {
    await Db.delete(params);

    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
