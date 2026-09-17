import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "mysql" }),
  emailAndPassword: { enabled: true },
  user: {
    additionalFields: {
      firstName: { type: "string", required: true },
      lastName: { type: "string", required: true },
      role: {
        type: ["ADMIN", "CUSTOMER"],
        required: false,
        defaultValue: "CUSTOMER",
        input: false,
      },
    },
  },
});
