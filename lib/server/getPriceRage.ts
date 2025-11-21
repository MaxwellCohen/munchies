import { z } from "zod";
import { getRestaurants } from "./getRestaurants";
import { baseUrl } from "../constants";


const isOpenSchema = z.object({
  id: z.string(),
  range: z.string(),
});

export async function getPriceRange(id: string) {
  try {
    const res = await fetch(`${baseUrl}/api/proxy?url=price-range/${id}`);
    const data = await res.json();
    return isOpenSchema.parse(
      data || {
        id: id,
        range: "",
      }
    );
  } catch (error) {
    console.error(error);
    return {
      id: id,
      range: "",
    };
  }
}


export async function getAllPriceRanges() {
  try {
    const restaurants = await getRestaurants();
      const priceIDs = [...new Set(restaurants.map((r) => r.price_range_id))];
    const priceRanges = await Promise.all(priceIDs.map(getPriceRange));
    
    return priceRanges;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export type PriceRange = Awaited<ReturnType<typeof getAllPriceRanges>>[number]