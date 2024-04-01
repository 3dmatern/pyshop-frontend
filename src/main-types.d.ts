export interface Auth {
  email: string;
  password: string;
}

export interface SignUpAuth extends Auth {
  username: string;
}

interface Tokens {
  accessToken: string;
  expiresIn: string;
  userId: string;
  username: string;
}

export type ParseToken = {
  sub: string;
  username: string;
  iat: number;
  exp: number;
};

export type UserProfile = {
  id: string;
  userId: string;
  name: string;
  tel: string;
  address: string;
  aboutMe: string;
};

export interface ProfileInfo {
  name: string;
  value: string;
}
