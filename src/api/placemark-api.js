import Boom from "@hapi/boom";
import Path from "path";
import { db } from "../models/db.js";
import { IdSpec, PlacemarkSpec, PlacemarkSpecPlus, PlacemarkArraySpec, WeatherArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";
import { imageStore } from "../models/image-store.js";
import { weatherStore } from "../models/weather-store.js";

export const placemarkApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placemarks = await db.placemarkStore.getAllPlacemarks();
        return placemarks;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: PlacemarkArraySpec, failAction: validationError },
    description: "Get all placemarkApi",
    notes: "Returns all placemarkApi",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
        if (!placemark) {
          return Boom.notFound("No placemark with this id");
        }
        return placemark;
      } catch (err) {
        return Boom.serverUnavailable("No placemark with this id");
      }
    },
    tags: ["api"],
    description: "Find a placemark",
    notes: "Returns a placemark",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: PlacemarkSpecPlus, failAction: validationError },
  },
  
  findByCategory: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const placemarks = await db.placemarkStore.getPlacemarksByCategoryId(request.params.id);
        if (!placemarks) {
          return Boom.notFound("No Placemarks assosiated with this category id");
        }
        return placemarks;
      } catch (err) {
        return Boom.serverUnavailable("No Placemarks assosiated with this category id");
      }
    },
    tags: ["api"],
    description: "Find placemarks associated with a given category",
    notes: "Returns a list of placemarks",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: PlacemarkArraySpec, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placemark = await db.placemarkStore.addPlacemark(request.params.id, request.payload);
        if (placemark) {
          return h.response(placemark).code(201);
        }
        return Boom.badImplementation("error creating placemark");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a placemark",
    notes: "Returns the newly created placemark",
    validate: { payload: PlacemarkSpec },
    response: { schema: PlacemarkSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
      scope: ["admin"],
    },
    handler: async function (request, h) {
      try {
        await db.placemarkStore.deleteAllPlacemarks();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all placemarkApi",
    notes: "Delete all placemarks - Admin access only",
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
        if (!placemark) {
          return Boom.notFound("No Placemark with this id");
        }
        await db.placemarkStore.deletePlacemark(placemark._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Placemark with this id");
      }
    },
    tags: ["api"],
    description: "Delete a placemark",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
  
    updateImageUrl: {
      auth: {
        strategy: "jwt",
      },
      handler: async function (request, h) {
        try {
          const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
          if (!placemark) {
            return Boom.notFound("No Placemark with this id");
          }
          placemark.img = request.payload.url;
          const newPlacemark = await db.placemarkStore.updatePlacemark(placemark);
          console.log(newPlacemark);
          if (newPlacemark) {
            return h.response().code(201);
          }
          return Boom.badImplementation("error updating placemark image url");
        } catch (err) {
          return Boom.serverUnavailable("No Placemark with this id");
        }
      },
      tags: ["api"],
      description: "Update placemark image url",
      notes: "Updates placemark image url",
      validate: { params: { id: IdSpec }, failAction: validationError },
    },
    
    deleteImage: {
      auth: {
        strategy: "jwt",
      },
      handler: async function (request, h) {
        try {
          const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
          const url = placemark.img
          if (url) {
            const filename = Path.parse(url).name 
            await imageStore.deleteImage(filename);
            placemark.img = "https://bulma.io/assets/images/placeholders/480x480.png";
            await db.placemarkStore.updatePlacemark(placemark);
          }
          return h.response().code(204);
        } catch (err) {
          console.log(err);
          return Boom.serverUnavailable("No Placemark with this id");
        }
      },
      tags: ["api"],
      description: "Delete placemark image",
      notes: "Deletes placemark image from cloudinary",
      validate: { params: { id: IdSpec }, failAction: validationError },
    },

  getWeather: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
        if (!placemark) {
          return Boom.notFound("No placemark with this id");
        }
        const weatherData = await weatherStore.getPlacemarkWeather(placemark.latitude, placemark.longitude)
        return weatherData;
      } catch (err) {
        return Boom.serverUnavailable("Failed to access weather data for placemark");
      }
    },
    tags: ["api"],
    description: "Find placemark weather",
    notes: "Returns the openweathermap.org icon and temperature for the next 7 days for a placemark",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: WeatherArraySpec, failAction: validationError },
  },
};
