import { v4 } from "uuid";

let placemarks = [];

export const placemarkMemStore = {
  async getAllPlacemarks() {
    return placemarks;
  },

  async addPlacemark(categoryId, placemark) {
    placemark._id = v4();
    placemark.categoryid = categoryId;
    placemarks.push(placemark);
    return placemark;
  },

  async getPlacemarksByCategoryId(id) {
    let foundPlacemarks = placemarks.filter((placemark) => placemark.categoryid === id);
    if (!foundPlacemarks) {
      foundPlacemarks = null;
    }
    return foundPlacemarks;
  },

  async getPlacemarkById(id) {
    let foundPlacemarks = placemarks.find((placemark) => placemark._id === id);
    if (!foundPlacemarks) {
      foundPlacemarks = null;
    }
    return foundPlacemarks;
  },

  async getCategoryPlacemarks(categoryId) {
    let foundPlacemarks = placemarks.filter((placemark) => placemark.categoryid === categoryId);
    if (!foundPlacemarks) {
      foundPlacemarks = null;
    }
    return foundPlacemarks;
  },

  async deletePlacemark(id) {
    const index = placemarks.findIndex((placemark) => placemark._id === id);
    if (index !== -1) placemarks.splice(index, 1);
  },

  async deleteAllPlacemarks() {
    placemarks = [];
  },

  async updatePlacemark(placemark, updatedPlacemark) {
    placemark.name = updatedPlacemark.name;
    placemark.description = updatedPlacemark.description;
    placemark.latitude = updatedPlacemark.latitude;
    placemark.longitude = updatedPlacemark.longitude;
  },
};
