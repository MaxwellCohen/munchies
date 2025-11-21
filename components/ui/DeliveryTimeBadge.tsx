import { DeliveryTimeRages } from "@/lib/constants";
import { Badge } from "./badge";


export function DeliveryTimeBadge({ time }: { time: number; }) {
    const label = DeliveryTimeRages.find((r) => r[1] <= time)?.[0] || "1 hour+";

    return <Badge>{label}</Badge>;
}
