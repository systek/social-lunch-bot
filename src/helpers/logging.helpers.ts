export const Logger = (message: any): void => {
  if (process.env.toString() !== 'production') {
    // console.log(message)
  }
}
