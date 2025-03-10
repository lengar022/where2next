import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const placemarkJsonStore = {
  async getAllPlacemarks() {
    await db.read();
    return db.data.placemarks;
  },

  async addPlacemark(categoryId, placemark) {
    await db.read();
    placemark._id = v4();
    placemark.categoryid = categoryId;
    db.data.placemarks.push(placemark);
    await db.write();
    return placemark;
  },

  async getPlacemarksByCategoryId(id) {
    await db.read();
    let foundPlacemarks = db.data.placemarks.filter((placemark) => placemark.categoryid === id);
    if (!foundPlacemarks) {
      foundPlacemarks = null;
    }
    return foundPlacemarks;
  },

  async getPlacemarkById(id) {
    await db.read();
    let foundPlacemarks = db.data.placemarks.find((placemark) => placemark._id === id);
    if (!foundPlacemarks) {
      foundPlacemarks = null;
    }
    return foundPlacemarks;
  },

  async getCategoryPlacemarks(categoryId) {
    await db.read();
    let foundPlacemarks = db.data.placemarks.filter((placemark) => track.categoryid === categoryId);
    if (!foundPlacemarks) {
      foundPlacemarks = null;
    }
    return foundPlacemarks;
  },

  async deletePlacemark(id) {
    await db.read();
    const index = db.data.placemarks.findIndex((placemark) => placemark._id === id);
    if (index !== -1) db.data.placemarks.splice(index, 1);
    await db.write();
  },

  async deleteAllPlacemarks() {
    db.data.placemarks = [];
    await db.write();
  },

  async updatePlacemark(placemark, updatedPlacemark) {
    placemark.name = updatedPlacemark.name;
    placemark.description = updatedPlacemark.description;
    placemark.latitude = updatedPlacemark.latitude;
    placemark.longitude = updatedPlacemark.longitude;
    await db.write();
  },
};
