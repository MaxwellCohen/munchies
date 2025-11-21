import { z } from "zod";
import { baseUrl } from "../constants";
const filterObjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  rating: z.number(),
  filter_ids: z.array(z.string()),
  image_url: z.string(),
  delivery_time_minutes: z.number(),
  price_range_id: z.string(),
});

export async function getRestaurants() {
  const res = await fetch(`${baseUrl}/api/proxy?url=restaurants`);
  const data = await res.json();
  return filterObjectSchema.array().parse(data.restaurants || []);
}

export type Restaurant = Awaited<ReturnType<typeof getRestaurants>>[number]