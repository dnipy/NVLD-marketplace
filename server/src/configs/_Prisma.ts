import { PrismaClient } from "@prisma/client";

export const _prisma = new PrismaClient({
    errorFormat : 'pretty',
})
