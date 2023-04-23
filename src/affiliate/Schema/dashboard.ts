import mongoose from "mongoose";

const Schema = mongoose.Schema;

const DashboardSchema = new Schema({
  uid: {
    type: String,
    require: true,
  },
});

export const DashboardModel = mongoose.model("aza_user", DashboardSchema);
