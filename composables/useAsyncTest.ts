export const useAsyncTest = () => {
  return useAsyncData('static-key', async () => {
    // imagine this is an API call or something
    await (new Promise((resolve) => setTimeout(resolve, 1500)))

    return {
      foo: 'bar'
    }
  })
}