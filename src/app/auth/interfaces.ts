import { AuthContext } from "./enums";

export interface AuthRequest{
  context: AuthContext;
  username: string;
  email?: string;
  password: string;
  remember?: boolean;
}

export interface Tokens {
  access: string;
  refresh: string;
}

export interface DecodedTokenPayload {
  exp: number;
  iat: number;
  username: string;
}
