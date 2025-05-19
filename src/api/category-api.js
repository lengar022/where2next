import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, CategoryArraySpec, CategorySpec, CategorySpecPlus, ImageSpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const categoryApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const categories = await db.categoryStore.getAllCategories();
        return categories;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: CategoryArraySpec, failAction: validationError },
    description: "Get all categories",
    notes: "Returns all categories",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const category = await db.categoryStore.getCategoryById(request.params.id);
        if (!category) {
          return Boom.notFound("No Category with this id");
        }
        return category;
      } catch (err) {
        return Boom.serverUnavailable("No Category with this id");
      }
    },
    tags: ["api"],
    description: "Find a category",
    notes: "Returns a category",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: CategorySpecPlus, failAction: validationError },
  },

  findPersonal: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const categories = await db.categoryStore.getUserCategories(request.params.id);
        if (!categories) {
          return Boom.notFound("No Categories assosiated with this id");
        }
        return categories;
      } catch (err) {
        return Boom.serverUnavailable("No Categories assosiated with this id");
      }
    },
    tags: ["api"],
    description: "Find user's categories",
    notes: "Returns a list of categories",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: CategoryArraySpec, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const category = request.payload;
        const newCategory = await db.categoryStore.addCategory(category);
        if (newCategory) {
          return h.response(newCategory).code(201);
        }
        return Boom.badImplementation("error creating category");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a category",
    notes: "Returns the newly created category",
    validate: { payload: CategorySpec, failAction: validationError },
    response: { schema: CategorySpecPlus, failAction: validationError },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const category = await db.categoryStore.getCategoryById(request.params.id);
        if (!category) {
          return Boom.notFound("No Category with this id");
        }
        await db.categoryStore.deleteCategoryById(category._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Category with this id");
      }
    },
    tags: ["api"],
    description: "Delete a category",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
      scope: ["admin"],
    },
    handler: async function (request, h) {
      try {
        await db.categoryStore.deleteAllCategories();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all categoryApi",
    notes: "Deletes all categories - Admin access only",
  },

  updateImageUrl: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const category = await db.categoryStore.getCategoryById(request.params.id);
        if (!category) {
          return Boom.notFound("No Category with this id");
        }
        category.img = request.payload.url;
        const newCategory = await db.categoryStore.updateCategory(category);
        console.log(newCategory);
        if (newCategory) {
          return h.response().code(201);
        }
        return Boom.badImplementation("error updating category image url");
      } catch (err) {
        return Boom.serverUnavailable("No Category with this id");
      }
    },
    tags: ["api"],
    description: "Update category image url",
    notes: "Updates category image url",
    validate: { params: { id: IdSpec }, failAction: validationError },
    // response: { schema: CategorySpecPlus, failAction: validationError },
  },
};
