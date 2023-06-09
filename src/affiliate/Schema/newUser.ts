import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const NewUserSchema = new Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    country: {
      type: String,
      require: true,
    },
    state: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: String,
      require: true,
    },
    accountBalance: {
      type: String,
      require: true,
    },
    referralCode: {
      type: String,
      require: true,
    },
    refererCode: {
      type: String,
      require: false,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export const SignUpModel = mongoose.model("aza_user", NewUserSchema);
