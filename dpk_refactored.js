const crypto = require("crypto");

const createHashString = (data) => {
  return crypto.createHash("sha3-512").update(data).digest("hex");
};

const sanitizeCandidate = (data, maxLength) => {
  const returnVal = typeof data === "string" ? data : JSON.stringify(data);

  return returnVal.length < maxLength || returnVal.length === maxLength
    ? returnVal
    : createHashString(returnVal);
};

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  let candidate;

  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  if (event?.partitionKey) {
    return sanitizeCandidate(event.partitionKey, MAX_PARTITION_KEY_LENGTH);
  }

  const data = JSON.stringify(event);
  candidate = createHashString(data);

  return candidate;
};
