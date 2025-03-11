import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testUsers, testCategories, testPlacemarks, greenway, mountainHike, saunaAndSwim } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Placemark Model tests", () => {

  let greenwayList = null;

  setup(async () => {
    db.init("mongo");
    await db.categoryStore.deleteAllCategories();
    await db.placemarkStore.deleteAllPlacemarks();
    greenwayList = await db.categoryStore.addCategory(greenway);
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPlacemarks[i] = await db.placemarkStore.addPlacemark(greenwayList._id, testPlacemarks[i]);
    }
  });

  test("create single placemark", async () => {
    const mountainHikeList = await db.categoryStore.addCategory(mountainHike);
    const placemark = await db.placemarkStore.addPlacemark(mountainHikeList._id, saunaAndSwim)
    assert.isNotNull(placemark._id);
    assertSubset (mountainHike, placemark);
  });

  test("get multiple placemarks", async () => {
    const placemarks = await db.placemarkStore.getPlacemarksByCategoryId(greenwayList._id);
    assert.equal(placemarks.length, testPlacemarks.length)
  });

  test("delete all placemarks", async () => {
    const placemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(testPlacemarks.length, placemarks.length);
    await db.placemarkStore.deleteAllPlacemarks();
    const newPlacemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(0, newPlacemarks.length);
  });

  test("get a placemark - success", async () => {
    const mountainHikeList = await db.categoryStore.addCategory(mountainHike);
    const placemark = await db.placemarkStore.addPlacemark(mountainHikeList._id, saunaAndSwim)
    const newPlacemark = await db.placemarkStore.getPlacemarkById(placemark._id);
    assertSubset (saunaAndSwim, newPlacemark);
  });

  test("delete One Placemark - success", async () => {
    await db.placemarkStore.deletePlacemark(testPlacemarks[0]._id);
    const placemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(placemarks.length, testCategories.length - 1);
    const deletedPlacemark = await db.placemarkStore.getPlacemarkById(testPlacemarks[0]._id);
    assert.isNull(deletedPlacemark);
  });

  test("get a placemark - bad params", async () => {
    assert.isNull(await db.placemarkStore.getPlacemarkById(""));
    assert.isNull(await db.placemarkStore.getPlacemarkById());
  });

  test("delete one placemark - fail", async () => {
    await db.placemarkStore.deletePlacemark("bad-id");
    const placemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(placemarks.length, testCategories.length);
  });
});
