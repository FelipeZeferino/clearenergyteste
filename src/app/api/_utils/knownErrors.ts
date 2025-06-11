import type { PrismaClientKnownRequestError } from "@prisma/client/runtime/binary";
import { NextResponse } from "next/server";

export const prismaErrorHandlers: Record<
  string,
  (error: PrismaClientKnownRequestError) => NextResponse
> = {
  P2002: (error: PrismaClientKnownRequestError) =>
    NextResponse.json(
      {
        success: false,
        code: "DUPLICATE_FIELD",
        message: "Valor duplicado em campo único.",
        field: Array.isArray(error.meta?.target)
          ? String(error.meta?.target[0])
          : undefined,
      },
      { status: 409 },
    ),
  P2025: () =>
    NextResponse.json(
      {
        success: false,
        message: "Registro não encontrado.",
      },
      { status: 404 },
    ),
};

export class ValidationError extends Error {
  constructor(
    message: string,
    public field?: string,
  ) {
    super(message);
    this.name = "ValidationError";
  }
}

export class NotFoundError extends Error {
  constructor(resource: string) {
    super(`${resource} not found`);
    this.name = "NotFoundError";
  }
}

export class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
  }
}
export class LoginFailedError extends Error {
  constructor(message = "Login Failed. Try again") {
    super(message);
    this.name = "LoginFailed";
  }
}

