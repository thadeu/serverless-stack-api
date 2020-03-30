import uuid from "uuid";
import Db from "@lib/dynamodb";
import { success, failure } from "@lib/response";
import { parse, stringify } from "@lib/utils";
import isEmpty from "lodash/isEmpty";

export async function main(event, context) {
  if (isEmpty(event.body)) {
    return failure({ status: "failure" });
  }

  const data = parse(event.body);

  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      content: data.content,
      createdAt: Date.now()
    }
  };

  try {
    await Db.put(params);

    return success({ data: params.Item });
  } catch (error) {
    return failure({ status: "failed" });
  }
}
