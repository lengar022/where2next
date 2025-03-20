import Mongoose from "mongoose";
import { Placemark } from "./placemark.js";

export const placemarkMongoStore = {
  async getAllPlacemarks() {
    const placemarks = await Placemark.find().lean();
    return placemarks;
  },

  async addPlacemark(categoryId, placemark) {
    placemark.categoryid = categoryId;
    const newPlacemark = new Placemark(placemark);
    const placemarkObj = await newPlacemark.save();
    return this.getPlacemarkById(placemarkObj._id);
  },

  async getPlacemarksByCategoryId(id) {
    const placemarks = await Placemark.find({ categoryid: id }).lean();
    return placemarks;
  },

  async getPlacemarkById(id) {
    if (Mongoose.isValidObjectId(id)) {
      const placemark = await Placemark.findOne({ _id: id }).lean();
      return placemark;
    }
    return null;
  },

  async deletePlacemark(id) {
    try {
      await Placemark.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPlacemarks() {
    await Placemark.deleteMany({});
  },

  async updatePlacemark(updatedPlacemark) {
    const placemarkDoc = await Placemark.findOne({ _id: updatedPlacemark._id });
    placemarkDoc.name = updatedPlacemark.name;
    placemarkDoc.description = updatedPlacemark.description;
    placemarkDoc.latitude = updatedPlacemark.latitude;
    placemarkDoc.longitude = updatedPlacemark.longitude;
    placemarkDoc.img = updatedPlacemark.img;
    await placemarkDoc.save();
  },
};
