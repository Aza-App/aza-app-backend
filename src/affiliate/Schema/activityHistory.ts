import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ActivityHistorySchema = new Schema(
  {
    email: {
      type: String,
      require: true,
    },
    activity: {
      type: String,
      require: true,
    },
    cost: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
