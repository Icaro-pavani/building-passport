import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_KEY;

export type TokenDecrypt = {
  id: number;
};

export type GuestTokenDecrypt = {
  listId: number;
  guestId: number;
};

function generateToken(id: number) {
  return jwt.sign({ id }, secretKey);
}

function generateGuestToken(listId: number, guestId: number) {
  return jwt.sign({ listId, guestId }, secretKey);
}

async function decryptToken(token: string) {
  return jwt.verify(token, secretKey) as TokenDecrypt;
}

async function decryptGuestToken(token: string) {
  return jwt.verify(token, secretKey) as GuestTokenDecrypt;
}

const tokenAPI = {
  generateToken,
  generateGuestToken,
  decryptToken,
  decryptGuestToken,
};

export default tokenAPI;
