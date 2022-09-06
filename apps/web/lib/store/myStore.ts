import { atom } from "jotai";
import { atomWithQuery } from "jotai/query";
import trpc from "lib/trpc";

export const nameAtom = atom("");
export const queryAtom = atomWithQuery((get) => ({
	queryKey: ["query-atom", get(nameAtom)],
	queryFn: async ({ queryKey }) => {
		if (!queryKey) return { greeting: "no query key" };
		const name = queryKey[1];
		if (!name) return { greeting: "none" };
		try {
			return trpc.query("hello", { name: String(name) });
		} catch (err) {
			return { greeting: "TRPC error" };
		}
	},
}));
