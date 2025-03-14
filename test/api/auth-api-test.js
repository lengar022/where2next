import { assert } from "chai";
import { where2nextService } from "./where2next-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie, maggieCredentials } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    where2nextService.clearAuth();
    await where2nextService.createUser(maggie);
    await where2nextService.authenticate(maggieCredentials);
    await where2nextService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await where2nextService.createUser(maggie);
    const response = await where2nextService.authenticate(maggieCredentials);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await where2nextService.createUser(maggie);
    const response = await where2nextService.authenticate(maggieCredentials);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });
});
