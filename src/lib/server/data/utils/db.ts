import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

const prisma = new PrismaClient();
const prismaAdapter = PrismaAdapter(prisma);

export {
    prisma,
    prismaAdapter,
}
