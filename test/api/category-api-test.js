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
    const returnedCategory = await where2nextService.createCategory(mountainHike);
    assert.isNotNull(returnedCategory);
    assertSubset(mountainHike, returnedCategory);
  });

  test("delete a category", async () => {
    const category = await where2nextService.createCategory(mountainHike);
    const response = await where2nextService.deleteCategory(category._id);
    assert.equal(response.status, 204);
    try {
      const returnedCategory = await where2nextService.getCategory(category.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Category with this id", "Incorrect Response Message");
    }
  });

  test("create multiple categories", async () => {
    for (let i = 0; i < testCategories.length; i += 1) {
      testCategories[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await where2nextService.createCategory(testCategories[i]);
    }
    let returnedLists = await where2nextService.getAllCategories();
    assert.equal(returnedLists.length, testCategories.length);
    await where2nextService.deleteAllCategories();
    returnedLists = await where2nextService.getAllCategories();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant category", async () => {
    try {
      const response = await where2nextService.deleteCategory("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Category with this id", "Incorrect Response Message");
    }
  });
});
