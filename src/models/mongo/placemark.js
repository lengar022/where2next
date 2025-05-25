import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placemarkSchema = new Schema({
  name: String,
  description: String,
  latitude: Number,
  longitude: Number,
  img: String,
  categoryid: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

placemarkSchema.path("img")
  .default("https://bulma.io/assets/images/placeholders/480x480.png");

export const Placemark = Mongoose.model("Placemark", placemarkSchema);
