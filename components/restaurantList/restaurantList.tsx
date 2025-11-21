"use client";
import { DeliveryTimeRages } from "@/lib/constants";
import { Restaurant } from "@/lib/server/getRestaurants";
import { useSearchFilters } from "@/components/filterSection/useSearchFilters";
import { Card } from "../ui/card";
import { Suspense, ViewTransition } from "react";
import { OpenBadge } from "../ui/OpenBadge";
import { DeliveryTimeBadge } from "../ui/DeliveryTimeBadge";
import Image from "next/image";
import ArrowIcon from "../icons/arrow";

export function RestaurantList({ restaurants }: { restaurants: Restaurant[] }) {
  const searchFilters = useSearchFilters();


  const filterRestaurants = restaurants.filter((r) => {
    console.log(
      "searchFilters.food_type",
      searchFilters.food_type,
      r.filter_ids
    );
    if (
      searchFilters.food_type &&
      !r.filter_ids.includes(searchFilters.food_type)
    ) {
      return false;
    }
    if (
      searchFilters.price_range_id &&
      r.price_range_id !== searchFilters.price_range_id
    ) {
      return false;
    }
    if (searchFilters.delivery_time) {
      const range = DeliveryTimeRages.find(
        ([name]) => name === searchFilters.delivery_time
      ) || [0, 0, [0, 0]];
      if (
        r.delivery_time_minutes < range[2][0] ||
        r.delivery_time_minutes > range[2][1]
      ) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(clamp(14rem,20vw,20rem),1fr))] w-[calc(100vw-30rem)]">
      <ViewTransition>
        {filterRestaurants.map((restaurant) => (
          <Card
            key={restaurant.id}
            className="grid grid-cols-[auto_auto] grid-rows-[auto_auto] gap-4 relative h-50 max-w-full overflow-hidden flex-1 w-max-1/3"
          >
            <div className="flex flex-row gap-2 h-8 items-center">
              <Suspense
                fallback={
                  <div className="w-16 h-4 bg-gray-200 rounded-full "></div>
                }
              >
                <OpenBadge id={restaurant.id} />
              </Suspense>
              <DeliveryTimeBadge time={restaurant.delivery_time_minutes} />
            </div>
            <Image
              className="absolute top-[-25px] right-[-25px]"
              src={`/api/proxy?url=${restaurant.image_url}`}
              alt={restaurant.name}
              width={140}
              height={140}
            />
            <p className="text-lg font-bold col-start-1 row-start-2 self-end">
              {restaurant.name}
            </p>
            <a className="text-lg font-bold col-start-2 row-start-2 bg-green-500 text-white px-2 rounded-full flex size-16 self-end justify-self-end items-center justify-center">
              <ArrowIcon className="size-6" />
              <span className="sr-only">View Details</span>
            </a>
          </Card>
        ))}
        {filterRestaurants.length === 0 && (
          <p className="text-center text-lg font-bold text-gray-500">
            No restaurants found
          </p>
        )}
      </ViewTransition>
    </div>
  );
}
