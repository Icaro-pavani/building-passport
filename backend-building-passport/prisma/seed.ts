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

  const building2 = {
    name: "Residencial Two",
    street: "Rua Bertrano de Castro",
    number: "500",
    district: "Vila Jaca",
    city: "Saltinho",
    state: "São Paulo",
  };

  const buildingRegistered = await prisma.building.upsert({
    where: { name: building.name },
    update: {},
    create: building,
  });

  const buildingRegistered2 = await prisma.building.upsert({
    where: { name: building2.name },
    update: {},
    create: building2,
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

  const buildingAPI2 = {
    key: "lC7j5MGfMh7xvXWDqdMnEFFxtrBpzZq18HBDYGM1dii9NoLL2Ul3XrwCTvoePIOLpJZWPSUDhqIWbW4xb7sLAROdpcjWkbYFVQliTyLCJHkieQPBUUuAzNCCKiKx2Gd5",
    buildingId: buildingRegistered2.id,
  };

  await prisma.buildingKey.upsert({
    where: { buildingId: buildingAPI2.buildingId },
    update: {},
    create: buildingAPI2,
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
    {
      name: "Fulano de tal",
      cpf: "444.774.633-99",
      apartment: "44B",
      buildingId: buildingRegistered.id,
      isLiving: false,
    },
  ];

  residents.map(async (resident) => {
    const SALT = 13;
    resident.cpf = bcrypt.hashSync(resident.cpf, SALT);
    await prisma.resident.upsert({
      where: {
        residentIdentifier: {
          cpf: resident.cpf,
          buildingId: resident.buildingId,
        },
      },
      update: {},
      create: resident,
    });
  });

  await prisma.new.create({
    data: {
      title: "test test 1",
      description: "Olha como teste funciona! É para a notícia aparecer aqui",
      buildingId: 1,
    },
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
