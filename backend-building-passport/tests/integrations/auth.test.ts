import supertest from "supertest";
import bcrypt from "bcrypt";

import app from "../../src/app.js";
import { prisma } from "../../src/config/database.js";

const agent = supertest(app);

describe("Authorization tests suite", () => {
  it("With right resident information, should sign up resident", async () => {
    const newResident = await prisma.resident.create({
      data: {
        buildingId: 1,
        name: "Acacia Leal",
        cpf: bcrypt.hashSync("444.512.398-44", 13),
        apartment: "21A",
        isLiving: true,
      },
    });

    const response = await agent.post("/sign-up").send({
      id: newResident.id,
      cpf: "444.512.398-44",
      email: "test@tt.cc",
      password: "1234",
      confirmPassword: "1234",
    });

    expect(response.status).toBe(201);
    const registeredResident = await prisma.resident.findUnique({
      where: { id: newResident.id },
    });
    expect(registeredResident?.email).toBe("test@tt.cc");

    await prisma.resident.delete({ where: { id: newResident.id } });
  });

  it("With right resident information, should login resident", async () => {
    const newResident = await prisma.resident.create({
      data: {
        buildingId: 1,
        name: "Acacia Leal",
        cpf: bcrypt.hashSync("444.512.398-44", 13),
        email: "test@tt.cc",
        password: bcrypt.hashSync("1234", 13),
        apartment: "21A",
        isLiving: true,
      },
    });

    const response = await agent.post("/login").send({
      buildingId: 1,
      email: "test@tt.cc",
      password: "1234",
    });

    expect(response.status).toBe(200);
    expect(response.body.token).not.toBeUndefined();

    await prisma.resident.delete({ where: { id: newResident.id } });
  });

  it("With wrong password, should not login resident", async () => {
    const newResident = await prisma.resident.create({
      data: {
        buildingId: 1,
        name: "Acacia Leal",
        cpf: bcrypt.hashSync("444.512.398-44", 13),
        email: "test@tt.cc",
        password: bcrypt.hashSync("1234", 13),
        apartment: "21A",
        isLiving: true,
      },
    });

    const response = await agent.post("/login").send({
      buildingId: 1,
      email: "test@tt.cc",
      password: "1334",
    });

    expect(response.status).toBe(401);

    await prisma.resident.delete({ where: { id: newResident.id } });
  });
});
