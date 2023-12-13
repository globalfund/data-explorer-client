export function emailValidation(email: string): boolean {
  const emailRegexp = /^[\w.-]+@([\w-]+\.)+[\w-]{2,}$/;

  return emailRegexp.test(email);
}
