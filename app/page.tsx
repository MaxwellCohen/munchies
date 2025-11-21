import Logo from "@/components/icons/logo";
import { getFilters } from "@/lib/server/getFilters";
import { getRestaurants } from "@/lib/server/getRestaurants";
import { Suspense } from "react";
import { FilterSection } from "@/components/filterSection/filterSection";
import { RestaurantList } from "@/components/restaurantList/restaurantList";
import { FoodTypeFilterCard } from "@/components/foodType/FoodType";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [foodTypeFilters, restaurants] = await Promise.all([
    getFilters(),
    getRestaurants(),
  ]);

  return (
    <div className="pt-10 px-4 lg:px-10 container mx-auto max-w-screen overflow-hidden">
      <nav className="lg:py-10">
        <Logo />
      </nav>
      <div className="grid grid-cols-1 md:grid-cols-[15rem_1fr] gap-4 w-full overflow-hidden">
        <Suspense fallback={<div></div>}>
          <FilterSection foodTypeFilters={foodTypeFilters} />
        </Suspense>
        <main className="w-full">
          <div className="flex flex-row gap-4 py-4 snap-x snap-mandatory scroll-smooth h-30">
            {foodTypeFilters.map((filter) => (
              <FoodTypeFilterCard key={filter.id} filter={filter} />
            ))}
          </div>
          <h2 className="text-2xl font-bold my-10">{"Restaurant's"} </h2>
          <Suspense fallback={<div></div>}>
            <RestaurantList restaurants={restaurants} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
