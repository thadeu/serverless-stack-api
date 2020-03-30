import { findAll } from "./repository";
import { success, failure } from "@lib/response";
import isEmpty from "lodash/isEmpty";

export async function main(event, context) {
  try {
    const data = await findAll({ event });

    if (!isEmpty(data)) {
      return success({ data: data });
    }

    return failure({ data: [], error: "Data is blank." });
  } catch (error) {
    return failure({ data: [] });
  }
}
