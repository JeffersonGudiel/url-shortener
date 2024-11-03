import { PrismaClient } from "@prisma/client";

declare global {
  // Evita que se redefina en un entorno donde no hay recarga de módulos
  var prismaGlobal: PrismaClient | undefined;
}

const prisma = global.prismaGlobal || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prismaGlobal = prisma;
}

export default prisma;
