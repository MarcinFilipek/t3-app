import { prisma } from "../db/client";
import { z } from "zod";
import { createRouter } from "./context";
import { TRPCError } from "@trpc/server";

export const postRouter = createRouter()
  .query("all", {
    async resolve() {
      return prisma.post.findMany();
    },
  })
  .query("byId", {
    input: z.object({ id: z.string() }),
    async resolve({ input }) {
      const { id } = input;
      const post = await prisma.post.findUnique({
        where: { id },
      });
      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No post with id '${id}'`,
        });
      }
      return post;
    },
  });
