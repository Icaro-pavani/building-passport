import bcrypt from "bcrypt";

import { prisma } from "../src/config/database.js";

async function main() {
  const building = {
    name: "Residencial One",
    street: "Rua Fulano de Castro",
    number: "400",
    district: "Vila Nostra",
    city: "Salto",
    state: "São Paulo",
  };

  const buildingRegistered = await prisma.building.upsert({
    where: { name: building.name },
    update: {},
    create: building,
  });

  const buildingAPI = {
    key: "lC7j5MGfMh7xvXWDqdMnEFFxtrBpzZq18HBGXXU1dii9NoLL2Ul3XrwCTvoePIOLpJZWPSUDhqIWbW4xb7sLAROdpcjWkbYFVQliTyLCJHkieQPBUUuAzNCCKiKx2Gd5",
    buildingId: buildingRegistered.id,
  };

  await prisma.buildingKey.upsert({
    where: { buildingId: buildingAPI.buildingId },
    update: {},
    create: buildingAPI,
  });

  const residents = [
    {
      name: "Fulano",
      cpf: "444.555.333-99",
      apartment: "33C",
      buildingId: buildingRegistered.id,
      isLiving: true,
    },
    {
      name: "Fulana",
      cpf: "444.554.633-99",
      apartment: "12C",
      buildingId: buildingRegistered.id,
      isLiving: true,
    },
  ];

  residents.map(async (resident) => {
    const SALT = 13;
    resident.cpf = bcrypt.hashSync(resident.cpf, SALT);
    await prisma.resident.upsert({
      where: { cpf: resident.cpf },
      update: {},
      create: resident,
    });
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
