export interface Tokens {
  access: string;
  refresh: string;
}

export interface AuthRequest{
  context: AuthContext;
  username: string;
  email?: string;
  password: string;
  remember?: boolean;
}

export const enum AuthContext {
  signIn = 'sign in',
  signUp = 'sign up'
}
