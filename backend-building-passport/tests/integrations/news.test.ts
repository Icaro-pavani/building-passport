import supertest from "supertest";

import app from "../../src/app.js";
import { prisma } from "../../src/config/database.js";

const agent = supertest(app);

describe("Residents tests suite", () => {
  it("With building token, should get the last 5 news", async () => {
    const APIKey = {
      key: "lC7j5MGfMh7xvXWDqdMnEFFxtrBpzZq18HBGXXU1dii9NoLL2Ul3XrwCTvoePIOLpJZWPSUDhqIWbW4xb7sLAROdpcjWkbYFVQliTyLCJHkieQPBUUuAzNCCKiKx2Gd5",
    };
    const buildingResponse = await agent.post("/buildings").send(APIKey);

    const response = await agent
      .get("/buildings/news")
      .set("Authorization", `Bearer ${buildingResponse.body.buildingToken}`);

    expect(response.status).toBe(200);
    expect(response.body.news).toHaveLength(1);
  });

  it("With building token, should add one news to the building", async () => {
    const APIKey = {
      key: "lC7j5MGfMh7xvXWDqdMnEFFxtrBpzZq18HBGXXU1dii9NoLL2Ul3XrwCTvoePIOLpJZWPSUDhqIWbW4xb7sLAROdpcjWkbYFVQliTyLCJHkieQPBUUuAzNCCKiKx2Gd5",
    };
    const buildingResponse = await agent.post("/buildings").send(APIKey);

    const news = {
      title: "Test",
      description: "loremipsum loremipsum",
    };

    const response = await agent
      .post("/news")
      .send(news)
      .set("Authorization", `Bearer ${buildingResponse.body.buildingToken}`);

    expect(response.status).toBe(201);
    const registeredNews = await prisma.new.findFirst({
      where: { title: news.title },
    });
    expect(registeredNews?.description).toBe("loremipsum loremipsum");
    await prisma.new.delete({ where: { id: registeredNews?.id } });
  });

  it("With building token and news id, should delete the news from the building", async () => {
    const APIKey = {
      key: "lC7j5MGfMh7xvXWDqdMnEFFxtrBpzZq18HBGXXU1dii9NoLL2Ul3XrwCTvoePIOLpJZWPSUDhqIWbW4xb7sLAROdpcjWkbYFVQliTyLCJHkieQPBUUuAzNCCKiKx2Gd5",
    };
    const buildingResponse = await agent.post("/buildings").send(APIKey);

    const news = await prisma.new.create({
      data: {
        buildingId: 1,
        title: "Test",
        description: "loremipsum loremipsum",
      },
    });

    const response = await agent
      .delete(`/news/${news.id}`)
      .set("Authorization", `Bearer ${buildingResponse.body.buildingToken}`);

    expect(response.status).toBe(200);
    const registeredNews = await prisma.new.findMany({
      where: { buildingId: 1 },
    });
    expect(registeredNews).toHaveLength(1);
  });
});
