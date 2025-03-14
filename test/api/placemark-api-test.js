import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { where2nextService } from "./where2next-service.js";
import { maggie, maggieCredentials, mountainHike, testCategories, testPlacemarks, saunaAndSwim } from "../fixtures.js";

suite("Placemark API tests", () => {
  let user = null;
  let mountainHikes = null;

  setup(async () => {
    where2nextService.clearAuth();
    user = await where2nextService.createUser(maggie);
    await where2nextService.authenticate(maggieCredentials);
    await where2nextService.deleteAllCategories();
    await where2nextService.deleteAllPlacemarks();
    await where2nextService.deleteAllUsers();
    user = await where2nextService.createUser(maggie);
    await where2nextService.authenticate(maggieCredentials);
    mountainHike.userid = user._id;
    mountainHikes = await where2nextService.createCategory(mountainHike);
  });

  teardown(async () => {});

  test("create placemark", async () => {
    const returnedPlacemark = await where2nextService.createPlacemark(mountainHikes._id, saunaAndSwim);
    assertSubset(saunaAndSwim, returnedPlacemark);
  });

  test("create Multiple placemarks", async () => {
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await where2nextService.createPlacemark(mountainHikes._id, testPlacemarks[i]);
    }
    const returnedPlacemarks = await where2nextService.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, testPlacemarks.length);
    for (let i = 0; i < returnedPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const placemark = await where2nextService.getPlacemark(returnedPlacemarks[i]._id);
      assertSubset(placemark, returnedPlacemarks[i]);
    }
  });

  test("Delete PlacemarkApi", async () => {
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await where2nextService.createPlacemark(mountainHikes._id, testPlacemarks[i]);
    }
    let returnedPlacemarks = await where2nextService.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, testPlacemarks.length);
    for (let i = 0; i < returnedPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const placemark = await where2nextService.deletePlacemark(returnedPlacemarks[i]._id);
    }
    returnedPlacemarks = await where2nextService.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, 0);
  });

  test("denormalised category", async () => {
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await where2nextService.createPlacemark(mountainHikes._id, testPlacemarks[i]);
    }
    const returnedCategory = await where2nextService.getCategory(mountainHikes._id);
    assert.equal(returnedCategory.placemarks.length, testPlacemarks.length);
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      assertSubset(testPlacemarks[i], returnedCategory.placemarks[i]);
    }
  });
});
