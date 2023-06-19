# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

- I always feel embedded if blocks make the code difficult to understand. So I've tried to rephrase the conditions into simpler if blocks

- added early returns wherever applicable. This will make the code easier to read and improve performance

- Used `.?` instead of `.` for reading key in object to make the code resilient

- Organized the code into smaller logical functions. Ideally I would keep reusable functions in a separate utils.js file

- removed code duplication by creating a `createHashString` function as the same logic was being called twice in the code

- We can break down sanitizeCandidate further into 2 functions. 1 that validates type and the other that validates length. But it seemed uneccessary for this code

- per my understanding of the existing logic, the code `crypto.createHash("sha3-512").update(candidate).digest("hex")` always returns a hex string less than 256. Otherwise, we would need to validate the length at the end before the return as well
