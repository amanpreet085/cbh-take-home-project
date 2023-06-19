const { deterministicPartitionKey } = require("./dpk");

const testEvent1 = {
  partitionKey: "test partition key",
};

const testEvent2 = {
  partitionKey: null,
};

const testEvent3 = {
  partitionKey:
    "dsajhdvavdafvajfvjfvasfvfsvf sfvjhafv sgfasfgsafg  sufgasfgasif auifgiasfgasfgdfafgaifgasfsiaugfasfiafaifgfdsgfasfghasfgasfg",
};

const MAX_PARTITION_KEY_LENGTH = 256;

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("should return a string", () => {
    expect(typeof deterministicPartitionKey({})).toBe("string");
  });

  it("should return a string with length less than 256 when partition key is string", () => {
    expect(deterministicPartitionKey(testEvent1).length).toBeLessThanOrEqual(
      MAX_PARTITION_KEY_LENGTH
    );
  });

  it("should return a string with length less than 256 when partition key is null", () => {
    expect(deterministicPartitionKey(testEvent2).length).toBeLessThanOrEqual(
      MAX_PARTITION_KEY_LENGTH
    );
  });

  it("should return a string with length less than 256 when partition key length is greater than 256", () => {
    expect(deterministicPartitionKey(testEvent3).length).toBeLessThanOrEqual(
      MAX_PARTITION_KEY_LENGTH
    );
  });
});
