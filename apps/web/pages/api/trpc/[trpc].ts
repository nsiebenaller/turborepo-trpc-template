import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";

export const appRouter = trpc
	.router()
	// Create procedure at path 'hello'
	.query("hello", {
		input: z
			.object({
				name: z.string().nullish(),
			})
			.nullish(),
		resolve({ input }) {
			const name = input?.name || "world!";
			return {
				greeting: `hello ${name}`,
			};
		},
	});

export type AppRouter = typeof appRouter;
export default trpcNext.createNextApiHandler({
	router: appRouter,
	createContext: () => null,
});
