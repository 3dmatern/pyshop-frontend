import { ParseToken } from 'src/main-types';

export const parseToken = async (token: string): Promise<ParseToken> => {
  const parse = await JSON.parse(atob(token.split('.')[1]));

  return parse;
};
