import { db } from '$lib/drizzle';

export const load = async () => {
	async function fetchDatasources() {
		return db.query.datasources.findMany();
	}
	return {
		datasources: await fetchDatasources()
	};
};
