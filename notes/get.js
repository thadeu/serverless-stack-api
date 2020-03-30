import { success, failure } from "@lib/response";
import { findOne } from "./repository";

export async function main(event, context) {
  try {
    const data = await findOne({ event });

    if (data) {
      return success(data);
    }

    return failure({ error: "Not found" });
  } catch (error) {
    return failure({ error: "Catch get item" });
  }
}
