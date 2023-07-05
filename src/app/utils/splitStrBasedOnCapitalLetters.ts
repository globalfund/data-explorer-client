export function splitStrBasedOnCapitalLetters(str: string) {
  return (str.match(/[A-Z]+[^A-Z]*|[^A-Z]+/g) || [str]).join(" ");
}
