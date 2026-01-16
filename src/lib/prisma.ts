/**
 * @file Prisma Client Configuration
 * @module lib/prisma
 * @description This file configures and exports a singleton instance of the PrismaClient.
 *              It ensures that a single instance of PrismaClient is used across the application,
 *              especially during development with hot-reloading, to prevent multiple connections
 *              to the database.
 *              It does not define the database schema, perform specific database queries,
 *              or contain application-specific business logic.
 */
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

/**
 * Global PrismaClient instance.
 * @type {PrismaClient}
 * @description This instance is used to interact with the database. It is initialized once
 *              and reused across the application to manage database connections efficiently.
 *              In development, it's attached to the global object to prevent re-instantiation
 *              during hot-reloads.
 */
const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query", "error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;
