export const createString = (string: TemplateStringsArray): string => {
  console.log(string)
  return string.toString()
}

const welcomeString = createString`Something goes here`
