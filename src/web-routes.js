import { adminController } from "./controllers/admin-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { categoryController } from "./controllers/category-controller.js";

export const webRoutes = [

  { method: "GET", path: "/admin", config: adminController.index },
  { method: "GET", path: "/admin/deleteuser/{userid}", config: adminController.deleteUser },

  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },
  { method: "GET", path: "/deleteuser/{id}", config: accountsController.deleteUser },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addcategory", config: dashboardController.addCategory },
  { method: "GET", path: "/dashboard/deletecategory/{id}", config: dashboardController.deleteCategory },
  { method: "POST", path: "/dashboard/uploadimage/{id}", config: dashboardController.uploadImage },
  { method: "GET", path: "/dashboard/deleteimage/{id}", config: dashboardController.deleteImage },

  { method: "GET", path: "/category/{id}", config: categoryController.index },
  { method: "POST", path: "/category/{id}/addplacemark", config: categoryController.addPlacemark },
  { method: "GET", path: "/category/{id}/deleteplacemark/{placemarkid}", config: categoryController.deletePlacemark },
  { method: "GET", path: "/category/{id}/placemark/{placemarkid}/weather", config: categoryController.getPlacemarkWeather },
  { method: "POST", path: "/category/{id}/uploadimage/{placemarkid}", config: categoryController.uploadImage },
  { method: "GET", path: "/category/{id}/deleteimage/{placemarkid}", config: categoryController.deleteImage },

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },
];
