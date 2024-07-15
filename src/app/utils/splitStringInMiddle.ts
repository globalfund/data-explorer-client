export function splitStringInMiddle(str: string) {
  const length = str.length;
  const middle = Math.round(length / 2);
  const spaceNearMiddle = str.indexOf(" ", middle);
  const string1 = str.substring(0, spaceNearMiddle);
  const string2 = str.substring(spaceNearMiddle + 1, length);
  return [string1, string2];
}
