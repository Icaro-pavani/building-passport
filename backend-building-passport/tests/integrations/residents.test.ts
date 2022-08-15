import supertest from "supertest";

import app from "../../src/app.js";
import { prisma } from "../../src/config/database.js";

const agent = supertest(app);

describe("Residents tests suite", () => {
  it("With building token, should get all residents registered", async () => {
    const APIKey = {
      key: "lC7j5MGfMh7xvXWDqdMnEFFxtrBpzZq18HBGXXU1dii9NoLL2Ul3XrwCTvoePIOLpJZWPSUDhqIWbW4xb7sLAROdpcjWkbYFVQliTyLCJHkieQPBUUuAzNCCKiKx2Gd5",
    };
    const buildingResponse = await agent.post("/buildings").send(APIKey);

    const response = await agent
      .get("/residents")
      .set("Authorization", `Bearer ${buildingResponse.body.buildingToken}`);

    expect(response.status).toBe(200);
    expect(response.body.residents).toHaveLength(3);
  });

  it("With building token, should add one resident to the building", async () => {
    const APIKey = {
      key: "lC7j5MGfMh7xvXWDqdMnEFFxtrBpzZq18HBGXXU1dii9NoLL2Ul3XrwCTvoePIOLpJZWPSUDhqIWbW4xb7sLAROdpcjWkbYFVQliTyLCJHkieQPBUUuAzNCCKiKx2Gd5",
    };
    const buildingResponse = await agent.post("/buildings").send(APIKey);

    const resident = {
      name: "Acacia Leal",
      cpf: "444.512.398-44",
      apartment: "21A",
    };

    const response = await agent
      .post("/residents")
      .send(resident)
      .set("Authorization", `Bearer ${buildingResponse.body.buildingToken}`);

    expect(response.status).toBe(201);
    const registeredResident = await prisma.resident.findFirst({
      where: { name: resident.name },
    });
    expect(registeredResident?.apartment).toBe("21A");
    await prisma.resident.delete({ where: { id: registeredResident?.id } });
  });

  it("With building token and wrong resident format, should not add one resident to the building", async () => {
    const APIKey = {
      key: "lC7j5MGfMh7xvXWDqdMnEFFxtrBpzZq18HBGXXU1dii9NoLL2Ul3XrwCTvoePIOLpJZWPSUDhqIWbW4xb7sLAROdpcjWkbYFVQliTyLCJHkieQPBUUuAzNCCKiKx2Gd5",
    };
    const buildingResponse = await agent.post("/buildings").send(APIKey);

    const resident = {
      name: "Acacia Leal",
      cpf: "444.512.39-44",
      apartment: "21A",
    };

    const response = await agent
      .post("/residents")
      .send(resident)
      .set("Authorization", `Bearer ${buildingResponse.body.buildingToken}`);

    expect(response.status).toBe(422);
  });

  it("With building token, should update living status of one resident to the building", async () => {
    const APIKey = {
      key: "lC7j5MGfMh7xvXWDqdMnEFFxtrBpzZq18HBGXXU1dii9NoLL2Ul3XrwCTvoePIOLpJZWPSUDhqIWbW4xb7sLAROdpcjWkbYFVQliTyLCJHkieQPBUUuAzNCCKiKx2Gd5",
    };
    const buildingResponse = await agent.post("/buildings").send(APIKey);

    const newResident = await prisma.resident.create({
      data: {
        buildingId: 1,
        name: "Acacia Leal",
        cpf: "444.512.398-44",
        apartment: "21A",
      },
    });

    const response = await agent
      .post(`/status/residents/${newResident.id}`)
      .send({ isLiving: true })
      .set("Authorization", `Bearer ${buildingResponse.body.buildingToken}`);

    expect(response.status).toBe(200);
    const updatedResident = await prisma.resident.findUnique({
      where: { id: newResident.id },
    });
    expect(updatedResident?.isLiving).toBe(true);

    await prisma.resident.delete({ where: { id: newResident.id } });
  });

  it("With building token, should delete one resident to the building", async () => {
    const APIKey = {
      key: "lC7j5MGfMh7xvXWDqdMnEFFxtrBpzZq18HBGXXU1dii9NoLL2Ul3XrwCTvoePIOLpJZWPSUDhqIWbW4xb7sLAROdpcjWkbYFVQliTyLCJHkieQPBUUuAzNCCKiKx2Gd5",
    };
    const buildingResponse = await agent.post("/buildings").send(APIKey);

    const newResident = await prisma.resident.create({
      data: {
        buildingId: 1,
        name: "Acacia Leal",
        cpf: "444.512.398-44",
        apartment: "21A",
      },
    });

    const response = await agent
      .delete(`/delete/residents/${newResident.id}`)
      .set("Authorization", `Bearer ${buildingResponse.body.buildingToken}`);

    expect(response.status).toBe(200);
    const residents = await prisma.resident.findMany({});
    expect(residents).toHaveLength(3);
  });

  it("Should obtain all living residents from a specific building with a valid id", async () => {
    const response = await agent.get("/residents/1");
    expect(response.status).toBe(200);
    expect(response.body.residents).toHaveLength(2);
  });

  it("Should fail to obtain all living residents from a specific building with an invalid id", async () => {
    const response = await agent.get("/residents/a");
    expect(response.status).toBe(422);
  });
});
