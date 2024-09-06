import { eq } from "drizzle-orm";
import { json } from "@sveltejs/kit";
import { z } from "zod";

import { db } from "$lib/drizzle";
import { datasources } from "$lib/drizzle/schema";

const datasource = z.object({
  id: z.number().min(1),
  host: z.string().min(1),
  port: z.string().min(1),
  username: z.string().min(1),
  password: z.string().min(1),
});

export type Datasource = z.infer<typeof datasource>;

export async function POST({ request }) {
  try {
    const data = await request.json();
    const validate = datasource.safeParse(data);

    if (!validate.success) return json(validate.error);

    const { id, ...rest } = validate.data;

    const isUpdated = !!(await db
      .update(datasources)
      .set({
        ...rest,
      })
      .where(eq(datasources.id, id))
      .returning());

    return json(isUpdated);
  } catch (e) {
    return json(e);
  }
}
