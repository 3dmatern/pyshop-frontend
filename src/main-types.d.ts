export type Auth = {
  email: string;
  password: string;
};

interface Tokens {
  accessToken: string;
  expiresIn: string;
  userId: number;
  username: string;
}

export type ParseToken = {
  sub: number | string;
  username: string;
  iat: number;
  exp: number;
};

export type UserProfile = {
  id: number;
  userId: number;
  name: string;
  tel: string;
  address: string;
  aboutMe: string;
};

export interface ProfileInfo {
  name: string;
  value: string;
}
