export interface Credentials {
  access: string;
  refresh: string;
}

export interface AuthRequest{
  context: AuthContext;
  username: string;
  password: string;
  remember: boolean;
}

export const enum AuthContext {
  login = 'login',
  signUp = 'sign up'
}
