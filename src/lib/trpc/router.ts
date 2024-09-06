import { t } from '$lib/trpc/t';
import { createContext } from '$lib/trpc/context';

import type { RequestEvent } from '@sveltejs/kit';

import { datasource } from '$lib/trpc/routes/datasource';
import { database } from '$lib/trpc/routes/database';

export const router = t.router({
	datasource,
	database
});

const factory = t.createCallerFactory(router);

export const createCaller = async (event: RequestEvent) => {
	return factory(await createContext(event));
};

export type Router = typeof router;
