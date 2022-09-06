import type { AppProps } from "next/app";
import { withTRPC } from "@trpc/next";
import { atom, Provider } from "jotai";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import type { AppRouter } from "pages/api/trpc/[trpc]";

const queryClient = new QueryClient();
const queryClientAtom = atom(queryClient);
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<Provider initialValues={[[queryClientAtom, queryClient]] as const}>
				<Hydrate state={pageProps.dehydratedState}>
					<Component {...pageProps} />
				</Hydrate>
			</Provider>
		</QueryClientProvider>
	);
}

export default withTRPC<AppRouter>({
	config({ ctx }) {
		/**
		 * If you want to use SSR, you need to use the server's full URL
		 * @link https://trpc.io/docs/ssr
		 */
		const url = process.env.NEXT_PUBLIC_BASE_DOMAIN
			? `${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/trpc`
			: "http://localhost:3000/api/trpc";
		return {
			url,
			/**
			 * @link https://react-query.tanstack.com/reference/QueryClient
			 */
			// queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
		};
	},
	/**
	 * @link https://trpc.io/docs/ssr
	 */
	ssr: false,
})(MyApp);
