"use client";
import { Card } from "@/components/ui/card";
import { DeliveryTimeRages } from "@/lib/constants";
import { FoodTypeFilter } from "@/lib/server/getFilters";
import clsx from "clsx";
import Link from "next/link";
import { getAllPriceRanges } from "@/lib/server/getPriceRage";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearchFilters } from "./useSearchFilters";

export function FilterSection({
  foodTypeFilters,
}: {
  foodTypeFilters: FoodTypeFilter[];
}) {
  const searchFilters = useSearchFilters();

  return (
    <Card>
      <h2 className="text-2xl font-bold">Filter</h2>
      <div>
        <h3 className="text-lg pt-4 pb-4">Food Type</h3>
        <div className="flex flex-row flex-wrap gap-4">
          {foodTypeFilters.map((filter) => {
            return (
              <Link
                key={filter.id}
                className={clsx(
                  "text-lg  border border-gray-300 px-2 rounded-md",
                  { "bg-gray-200": filter.id === searchFilters.food_type }
                )}
                href={{
                  pathname: "/",
                  query: JSON.parse(
                    JSON.stringify({
                      ...searchFilters,
                      food_type:
                        filter.id === searchFilters.food_type
                          ? undefined
                          : filter.id,
                    })
                  ),
                }}
              >
                {filter.name}
              </Link>
            );
          })}
        </div>
      </div>
      <div>
        <h3 className="text-lg pt-4 pb-4">Delivery Time</h3>
        <div className="flex flex-row flex-wrap gap-4">
          {DeliveryTimeRages.map(([name, time]) => {
            return (
              <Link
                key={`delivery-time-${time}`}
                className={clsx(
                  "text-lg  border border-gray-300 px-2 rounded-md",
                  { "bg-gray-200": name === searchFilters.delivery_time }
                )}
                href={{
                  pathname: "/",
                  query: JSON.parse(
                    JSON.stringify({
                      ...searchFilters,
                      delivery_time:
                        name === searchFilters.delivery_time ? undefined : name,
                    })
                  ),
                }}
              >
                {name}
              </Link>
            );
          })}
        </div>
      </div>

      <PriceFilter />
    </Card>
  );
}

function PriceFilter() {
  const { data: priceRanges } = useSuspenseQuery({
    queryKey: ["price-ranges"],
    queryFn: getAllPriceRanges,
  });
  const searchFilters = useSearchFilters();
  if (!priceRanges.length) {
    return null;
  }
  return (
    <div>
      <h3 className="text-lg pt-4 pb-4">Price Range</h3>
      <div className="flex flex-row flex-wrap gap-4">
        {priceRanges.map(({ id, range }) => {
          return (
            <Link
              key={`price-range-${id}`}
              className={clsx(
                "text-lg  border border-gray-300 px-2 rounded-md",
                { "bg-gray-200": id === searchFilters.price_range_id }
              )}
              href={{
                pathname: "/",
                query: JSON.parse(
                  JSON.stringify({
                    ...searchFilters,
                    price_range_id:
                      id === searchFilters.price_range_id ? undefined : id,
                  })
                ),
              }}
            >
              {range}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
