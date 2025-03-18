import { db } from "../models/db.js";

export const adminController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const allUsers = await db.userStore.getAllUsers();
      const viewData = {
        title: "Admin Dashboard",
        user: loggedInUser,
        allUsers: allUsers,
      };
      return h.view("admin-view", viewData);
    },
  },

  deleteUser: {
    handler: async function (request, h) {
      await db.userStore.deleteUserById(request.params.userid);
      return h.redirect("/admin");
    },
  },
}