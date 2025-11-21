"use client";
import { getIsOpen } from "@/lib/server/getIsOpen";
import { Badge } from "./badge";
import { useSuspenseQuery } from "@tanstack/react-query";

export function OpenBadge({ id }: { id: string }) {
  const { data: openStatus } = useSuspenseQuery({
    queryKey: ["open", id],
    queryFn: () => getIsOpen(id),
  });

  return (
    <Badge>
      <div
        className={
          openStatus.is_open
            ? "bg-green-500 rounded-full size-2"
            : "bg-red-500 rounded-full size-2"
        }
      />
      {openStatus.is_open ? "Open" : "Closed"}
    </Badge>
  );
}
