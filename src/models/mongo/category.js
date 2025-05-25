import Mongoose from "mongoose";

const { Schema } = Mongoose;

const categorySchema = new Schema({
  title: String,
  img: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

categorySchema.path("img")
  .default("https://bulma.io/assets/images/placeholders/480x480.png");

export const Category = Mongoose.model("Category", categorySchema);
