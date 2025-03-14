import { assert } from "chai";
import { where2nextService } from "./where2next-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, maggieCredentials, testUsers } from "../fixtures.js";
import { db } from "../../src/models/db.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
  setup(async () => {
    where2nextService.clearAuth();
    await where2nextService.createUser(maggie);
    await where2nextService.authenticate(maggieCredentials);
    await where2nextService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[i] = await where2nextService.createUser(testUsers[i]);
    }
    await where2nextService.createUser(maggie);
    await where2nextService.authenticate(maggieCredentials);
  });
  teardown(async () => {
  });

  test("create a user", async () => {
    const newUser = await where2nextService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all users", async () => {
    let returnedUsers = await where2nextService.getAllUsers();
    assert.equal(returnedUsers.length, 4);
    await where2nextService.deleteAllUsers();
    await where2nextService.createUser(maggie);
    await where2nextService.authenticate(maggieCredentials);
    returnedUsers = await where2nextService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
  });

  test("get a user - success", async () => {
    const returnedUser = await where2nextService.getUser(users[0]._id);
    assert.deepEqual(users[0], returnedUser);
  });

  test("get a user - bad id", async () => {
    try {
      const returnedUser = await where2nextService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });

  test("get a user - deleted user", async () => {
    await where2nextService.deleteAllUsers();
    await where2nextService.createUser(maggie);
    await where2nextService.authenticate(maggieCredentials);
    try {
      const returnedUser = await where2nextService.getUser(users[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});
