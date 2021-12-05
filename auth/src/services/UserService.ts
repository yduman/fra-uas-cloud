import jwt from "jsonwebtoken";

import { HashingService } from ".";
import { BadRequestError } from "../errors/bad-request.error";
import { User, UserDocument } from "../models/user.model";

export class UserService {
  async checkDuplicateEmail(email: string) {
    const duplicateUser = await User.findOne({ email });
    if (duplicateUser) {
      throw new BadRequestError("Email is already being used");
    }
  }

  async createUser(email: string, password: string): Promise<UserDocument> {
    const user = User.build({ email, password });
    await user.save();
    return user;
  }

  async loginUser(email: string, password: string): Promise<UserDocument> {
    const user = await User.findOne({ email });
    if (!user) {
      throw new BadRequestError("Invalid login credentials");
    }

    const isPasswordMatch = await HashingService.compare(
      password,
      user.password
    );

    if (!isPasswordMatch) {
      throw new BadRequestError("Invalid login credentials");
    }

    return user;
  }

  getCurrentUser(token: string) {
    try {
      const payload = jwt.verify(token, process.env.JWT_KEY!);
      return { currentUser: payload };
    } catch (err) {
      return { currentUser: null };
    }
  }
}
