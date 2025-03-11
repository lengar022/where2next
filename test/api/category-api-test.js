import { EventEmitter } from "events";
import { assert } from "chai";
import { where2nextService } from "./where2next-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, mountainHike, testCategories } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Category API tests", () => {

  let user = null;

  setup(async () => {
    await where2nextService.deleteAllCategories();
    await where2nextService.deleteAllUsers();
    user = await where2nextService.createUser(maggie);
    mountainHike.userid = user._id;
  });

  teardown(async () => {});

  test("create category", async () => {
  });

  test("delete a category", async () => {
  });

  test("create multiple categories", async () => {
  });

  test("remove non-existant category", async () => {
  });
});
