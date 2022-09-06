import { GetStaticProps, NextPage } from "next";
import { useAtomValue, useAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { createSSGHelpers } from "@trpc/react/ssg";

import { Button } from "ui";
import { queryAtom, nameAtom } from "lib/store/myStore";
import trpc, { hooks } from "lib/trpc";
import { appRouter } from "pages/api/trpc/[trpc]";

type PageProps = {
	initialName: string;
};

const Web: NextPage<PageProps> = ({ initialName }: PageProps) => {
	useHydrateAtoms([[nameAtom, initialName]] as const);
	const { greeting } = useAtomValue(queryAtom);
	const [name, setName] = useAtom(nameAtom);
	const { data } = hooks.useQuery(["hello", { name }]);
	console.log("i should never be undefined: ", data);

	return (
		<div>
			<h1>Web</h1>
			<div>
				from atom: <b>{name}</b>
			</div>
			<div>
				from query atom: <b>{greeting}</b>
			</div>
			<div>
				from trpc: <b>{data?.greeting}</b>
			</div>
			<button onClick={() => setName("Something")}>change name atom</button>
			<br />
			<Button />
		</div>
	);
};
export default Web;

export const getStaticProps: GetStaticProps<PageProps> = async () => {
	const initialName = "SSG name";
	const ssg = await createSSGHelpers({
		router: appRouter,
		ctx: {},
	});
	await ssg.prefetchQuery("hello", {
		name: initialName,
	});

	return {
		props: {
			initialName,
			dehydratedState: ssg.dehydrate(),
		},
	};
};
