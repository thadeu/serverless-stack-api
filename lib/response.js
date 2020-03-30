import { parse, stringify } from "@lib/utils";

export function success(body) {
  return build(200, body);
}

export function failure(body) {
  return build(500, body);
}

/**
 *
 * Private Functions
 *
 */

function build(statusCode, body) {
  return {
    statusCode,
    body: stringify(body),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    }
  };
}

export default {
  success,
  failure
};
