export interface IEmailService {
  sendVerificationEmail(email: string, username: string, code: string): void;
  // sendPasswordResetEmail(email: string, username: string, code: string): void;
}
