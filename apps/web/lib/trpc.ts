import { createTRPCClient } from "@trpc/client";
import { createReactQueryHooks } from "@trpc/react";
import { NEXT_PUBLIC_BASE_DOMAIN } from "lib/env";
import type { AppRouter } from "pages/api/trpc/[trpc]";

const agrosClient = createTRPCClient<AppRouter>({
	url: `${NEXT_PUBLIC_BASE_DOMAIN}/api/trpc`,
});
export default agrosClient;

type AgrosReactQueryHooks = ReturnType<typeof createReactQueryHooks<AppRouter>>;
export const hooks: AgrosReactQueryHooks = createReactQueryHooks<AppRouter>();
