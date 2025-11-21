"use client";
import { useSearchParams } from "next/navigation";

export function useSearchFilters() {
    const searchParams = useSearchParams();
    const foodType = searchParams.get("food_type") || null;
    const deliveryTime = searchParams.get("delivery_time") || null;
    const priceRangeId = searchParams.get("price_range_id") || null;
    return {
        food_type: foodType,
        price_range_id: priceRangeId,
        delivery_time: deliveryTime,
    };
}
