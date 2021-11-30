import mongoose from "mongoose";
import { HashingService } from "../utils/hashing.service";

interface UserProps {
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserDocument> {
  build(props: UserProps): UserDocument;
}

interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashedPassword = await HashingService.hash(this.get("password"));
    this.set("password", hashedPassword);
  }

  done();
});

userSchema.statics.build = (props: UserProps) => {
  return new User(props);
};

export const User = mongoose.model<UserDocument, UserModel>("User", userSchema);
