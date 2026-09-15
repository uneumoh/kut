import { randomBytes } from "crypto";

const ORDER_REFERENCE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

const generateOrderReference = (): string => {
  const bytes = randomBytes(6);

  let code = "";

  for (const byte of bytes) {
    code += ORDER_REFERENCE_CHARS[byte % ORDER_REFERENCE_CHARS.length];
  }

  return `ORD-${code}`;
};

export { generateOrderReference };
