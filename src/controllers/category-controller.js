import Path from "path";
import { PlacemarkSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { imageStore } from "../models/image-store.js";

export const categoryController = {
  index: {
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const viewData = {
        title: "Category",
        category: category,
        breadcrumb: `${category.title}`,
      };
      return h.view("category-view", viewData);
    },
  },

  addPlacemark: {
    validate: {
      payload: PlacemarkSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const currentCategory = await db.categoryStore.getCategoryById(request.params.id);
        return h.view("category-view", { title: "Add placemark error", category:currentCategory, errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const newPlacemark = {
        name: request.payload.name,
        description: request.payload.description,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
      };
      await db.placemarkStore.addPlacemark(category._id, newPlacemark);
      return h.redirect(`/category/${category._id}`);
    },
  },

  deletePlacemark: {
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      await db.placemarkStore.deletePlacemark(request.params.placemarkid);
      return h.redirect(`/category/${category._id}`);
    },
  },

  uploadImage: {
    handler: async function (request, h) {
      try {
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.placemarkid);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          placemark.img = url;
          await db.placemarkStore.updatePlacemark(placemark);
        }
        return h.redirect(`/category/${request.params.id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/category/${request.params.id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },

  deleteImage: {
    handler: async function (request, h) {
      try {
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.placemarkid);
        const url = placemark.img
        if (url) {
          const filename = Path.parse(url).name 
          await imageStore.deleteImage(filename);
          placemark.img = null;
          await db.placemarkStore.updatePlacemark(placemark);
        }
        return h.redirect(`/category/${request.params.id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/category/${request.params.id}`);
      }
    },
  },

  getPlacemarkWeather: {
    async handler(request) {
      try {
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
        const weatherData = await weatherStore.getPlacemarkWeather(placemark.latitude, placemark.longitude)
        return weatherData;
      } catch (err) {
        console.log(err);
        return h.redirect(`/category/${request.params.id}`);
      }
    },
  }
};
