import { BadRequestError } from "../errors/bad-request.error";
import { User, UserDocument } from "../models/user.model";

export class UserService {
  async createUser(email: string, password: string): Promise<UserDocument> {
    const user = User.build({ email, password });
    await user.save();
    return user;
  }

  async checkDuplicateEmail(email: string) {
    const duplicateUser = await User.findOne({ email });
    if (duplicateUser) {
      throw new BadRequestError("Email is already being used");
    }
  }
}
