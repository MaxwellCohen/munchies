"use client";
import { FoodTypeFilter } from "@/lib/server/getFilters";
import { Card } from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import { useSearchFilters } from "../filterSection/useSearchFilters";

export function FoodTypeFilterCard({ filter }: { filter: FoodTypeFilter }) {
    const searchFilters = useSearchFilters();
    
  return (
      <Card className="snap-start p-0">
    <Link
      key={`food-type-${filter.id}`}
      className="no-underline p-0 flex flex-row w-40 h-20 items-center justify-between"
      href={{
        pathname: "/",
        query: JSON.parse(
          JSON.stringify({
            ...searchFilters,
            food_type: filter.id,
          })
        ),
      }}
    >
      <p className="text-lg font-bold whitespace-nowrap">{filter.name}</p>
      <Image
        src={`/api/proxy?url=${filter.image_url}`}
        alt={filter.name}
        width={80}
        height={80}
      />
    </Link>
    </Card>
  );
}
