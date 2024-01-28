import { type JwtPayload, sign, type SignOptions, verify } from "jsonwebtoken";

export interface JwtValue extends JwtPayload {
  _id: string;
}

class JWT {
  private readonly SECRET = process.env.TOKEN_SECRET;

  public createToken = (_id: string, options?: SignOptions) =>
    sign({ _id }, this.SECRET, options);

  public verifyToken = (token: string) =>
    verify(token, this.SECRET) as JwtValue;
}

export default new JWT();
