import { z } from "zod";
import { baseUrl } from "../constants";

const isOpenSchema = z.object({
  restaurant_id: z.string(),
  is_open: z.boolean().optional().default(false),
});

export async function getIsOpen(id: string) {

  try {
    const res = await fetch(`${baseUrl}/api/proxy?url=open/${id}`);
    const data = await res.json();
    return isOpenSchema.parse(
      data || {
        restaurant_id: id,
        is_open: false,
      }
    );
  } catch (error) {
    console.error(error);
    return {
      restaurant_id: id,
      is_open: false,
    };
  }
}
