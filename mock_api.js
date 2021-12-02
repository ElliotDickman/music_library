export function mockFetchHelper(
  isSuccess = true,
  returnValue,
  timeoutValue = 1000
) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isSuccess) {
        resolve(returnValue);
      } else {
        reject(returnValue);
      }
    }, timeoutValue);
  });
}
