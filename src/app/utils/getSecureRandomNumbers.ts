export function getRandNoBetween0and1() {
  const crypto = window.crypto;
  let array = new Uint32Array(1);
  crypto.getRandomValues(array); // Compliant for security-sensitive use cases
  return array[0] / 4294967295;
}
