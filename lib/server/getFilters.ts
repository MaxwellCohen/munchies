import { cacheLife } from "next/cache";
import { z } from "zod";
import { baseUrl } from "../constants";

const filterObjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  image_url: z.string(),
});

export async function getFilters() {
  "use cache";
  cacheLife({ stale: 10 });
  const res = await fetch(`${baseUrl}/api/proxy?url=filter`);
  const data = await res.json();
  return filterObjectSchema.array().parse(data.filters || []);
}

export type FoodTypeFilter = Awaited<ReturnType<typeof getFilters>>[number];
