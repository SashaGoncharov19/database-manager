import { t } from '$lib/trpc/t';

export const database = t.router({
	testdab: t.procedure.query(async () => {
		return 'hi';
	})
});
