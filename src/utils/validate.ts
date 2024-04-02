export function validateEmail(email: string): boolean {
  const emailTrim = email.toString().trim();
  const isNotEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    emailTrim
  );

  return isNotEmail;
}
