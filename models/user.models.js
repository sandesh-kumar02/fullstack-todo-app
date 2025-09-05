import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
const toDoSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

toDoSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", toDoSchema);

export default User;
