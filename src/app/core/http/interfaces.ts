export interface Tokens {
  access: string;
  refresh: string;
}

export interface DecodedTokenPayload {
  exp: number,
  iat: number,
  username: string
}
