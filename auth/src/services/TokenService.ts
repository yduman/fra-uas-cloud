import jwt from "jsonwebtoken";
import { UserDocument } from "../models/user.model";

export class TokenService {
  static createToken(user: UserDocument) {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_KEY!);
  }
}
