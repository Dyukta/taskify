import jwt, { SignOptions } from "jsonwebtoken";

const JWT_EXPIRES_IN = "7d";

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("environment variable is required");
  }

  return secret;
}

export interface JwtPayload {
  userId: string;
}

export function signToken(userId: string): string {
  const secret = getJwtSecret();
  const payload: JwtPayload = { userId };
  const options: SignOptions = { expiresIn: JWT_EXPIRES_IN };

  return jwt.sign(payload, secret, options);
}

export function verifyToken(token: string): JwtPayload {
  const secret = getJwtSecret();

  const decoded = jwt.verify(token, secret);
  
  if ( typeof decoded !== "object" || decoded === null || !("userId" in decoded) || typeof decoded.userId !== "string") {
    throw new Error("Invalid token payload");
  }

  return {
    userId: decoded.userId
  };
}