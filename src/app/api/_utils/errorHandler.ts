// app/api/_utils/errorHandler.ts
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import {
  ValidationError,
  NotFoundError,
  UnauthorizedError,
  prismaErrorHandlers,
} from "./knownErrors";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/binary";

function handleZodError(error: ZodError) {
  return NextResponse.json(
    {
      message: "Invalid Data",
      errors: error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      })),
    },
    { status: 400 },
  );
}

export function handleDatabaseError(
  error: PrismaClientKnownRequestError,
): NextResponse {
  const handler = prismaErrorHandlers[error.code];
  if (handler) {
    return handler(error);
  }
  return NextResponse.json(
    {
      success: false,
      message: `Database Error: ${error.code}`,
    },
    { status: 500 },
  );
}

function handleValidationError(error: ValidationError) {
  return NextResponse.json(
    {
      message: error.message,
      field: error.field,
    },
    { status: 400 },
  );
}

function handleNotFoundError(error: NotFoundError) {
  return NextResponse.json({ message: error.message }, { status: 404 });
}

function handleUnauthorizedError(error: UnauthorizedError) {
  return NextResponse.json({ message: error.message }, { status: 401 });
}

function handleDefaultError(error: unknown) {
  console.error("Unkown Error:", error);
  return NextResponse.json(
    { message: "Internal Server Error" },
    { status: 500 },
  );
}

export function handleApiError(error: unknown): NextResponse {
  if (error && typeof error === "object" && "code" in error) {
    console.log("entrou no if");
    const response = handleDatabaseError(
      error as PrismaClientKnownRequestError,
    );
    return response;
  }

  if (error instanceof PrismaClientKnownRequestError) {
    return handleDatabaseError(error);
  }

  if (error instanceof ZodError) {
    return handleZodError(error);
  }

  if (error instanceof ValidationError) {
    return handleValidationError(error);
  }

  if (error instanceof NotFoundError) {
    return handleNotFoundError(error);
  }

  if (error instanceof UnauthorizedError) {
    return handleUnauthorizedError(error);
  }

  return handleDefaultError(error);
}