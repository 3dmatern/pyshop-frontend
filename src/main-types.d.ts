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
  name: string;
  tel: string | undefined;
  address: string | undefined;
  aboutMe: string | undefined;
};

export interface ProfileInfo {
  name: string;
  value: string;
}
