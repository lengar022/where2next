// import { userMemStore } from "./mem/user-mem-store.ts";
// import { categoryMemStore } from "./mem/category-mem-store.ts";
// import { placemarkMemStore } from "./mem/placemark-mem-store.ts";

import { userJsonStore } from "./json/user-json-store.js";
import { categoryJsonStore } from "./json/category-json-store.js";
import { placemarkJsonStore } from "./json/placemark-json-store.js";

export const db = {
  userStore: null,
  categoryStore: null,
  placemarkStore: null,

  init() {
    this.userStore = userJsonStore;
    this.categoryStore = categoryJsonStore;
    this.placemarkStore = placemarkJsonStore;
  },
};
