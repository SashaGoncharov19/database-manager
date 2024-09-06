import { trpc } from '$lib/trpc/client';

export async function load(event) {
	const { queryClient } = await event.parent();
	const api = trpc(event, queryClient);

	return {
		api,
		datasources: await api.datasource.getAll.createServerQuery()
	};
}
