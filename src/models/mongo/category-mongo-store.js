import Mongoose from "mongoose";
import { Category } from "./category.js";
import { placemarkMongoStore } from "./placemark-mongo-store.js";

export const categoryMongoStore = {
  async getAllCategories() {
    const categories = await Category.find().lean();
    for (let i = 0; i < categories.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      categories[i].placemarks = await placemarkMongoStore.getPlacemarksByCategoryId(categories[i]._id);
    }
    return categories;
  },

  async getCategoryById(id) {
    if (Mongoose.isValidObjectId(id)) {
      const category = await Category.findOne({ _id: id }).lean();
      if (category) {
        category.placemarks = await placemarkMongoStore.getPlacemarksByCategoryId(category._id);
      }
      return category;
    }
    return null;
  },

  async addCategory(category) {
    const newCategory = new Category(category);
    const categoryObj = await newCategory.save();
    return this.getCategoryById(categoryObj._id);
  },

  async getUserCategories(id) {
    const category = await Category.find({ userid: id }).lean();
    return category;
  },

  async deleteCategoryById(id) {
    try {
      await Category.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllCategories() {
    await Category.deleteMany({});
  },

  async updateCategory(updatedCategory) {
    const category = await Category.findOne({ _id: updatedCategory._id });
    category.title = updatedCategory.title;
    category.img = updatedCategory.img;
    await category.save();
  },
};
