
// we can pass any value to this function and it will tell us that the value can not be null.
export function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  if (!val) {
    throw Error('Expected "val" to be defined, but received: ' + val)
  }
}