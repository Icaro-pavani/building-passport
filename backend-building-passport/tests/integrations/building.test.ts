import supertest from "supertest";

import app from "../../src/app.js";
import { prisma } from "../../src/config/database.js";

const agent = supertest(app);

describe("Building session suite", () => {
  it("With building API key, login at building session", async () => {
    const APIKey = {
      key: "lC7j5MGfMh7xvXWDqdMnEFFxtrBpzZq18HBGXXU1dii9NoLL2Ul3XrwCTvoePIOLpJZWPSUDhqIWbW4xb7sLAROdpcjWkbYFVQliTyLCJHkieQPBUUuAzNCCKiKx2Gd5",
    };

    const response = await agent.post("/buildings").send(APIKey);
    expect(response.status).toBe(200);
    expect(response.body.buildingToken).not.toBeUndefined();
  });

  it("With wrong building API key, fail to login at building session", async () => {
    const APIKey = {
      key: "lC7j5MGfMh7xvXWDqdMnggFxtrBpzZq18HBGXXU1dii9NoLL2Ul3XrwCTvoePIOLpJZWPSUDhqIWbW4xb7sLAROdpcjWkbYFVQliTyLCJHkieQPBUUuAzNCCKiKx2Gd5",
    };

    const response = await agent.post("/buildings").send(APIKey);
    expect(response.statusCode).toBe(422);
  });

  it("Should return a list of buildings", async () => {
    const response = await agent.get("/buildings");
    expect(response.status).toBe(200);
    expect(response.body.buildings).toHaveLength(2);
  });
});
