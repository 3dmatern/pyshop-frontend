interface Auth {
  email: string;
  password: string;
}

interface Tokens {
  accessToken: string;
  expiresIn: string;
}

export type GetUserResponseType = {
  name: string;
  tel: string;
  address: string;
  aboutMe: string;
};
