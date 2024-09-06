import { z } from 'zod';

import { t } from '$lib/trpc/t';
import { db } from '$lib/drizzle';

export const datasource = t.router({
	getAll: t.procedure.query(() => {
		return ['test'];
	}),
	createDatasource: t.procedure
		.input(
			z.object({
				name: z.string().min(3),
				username: z.string().min(1),
				password: z.string().min(1),
				host: z.string().min(1),
				port: z.number().min(1)
			})
		)
		.mutation(({ input }) => {
			console.log(input);
			return true;
		})
});
