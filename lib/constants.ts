export const DeliveryTimeRages = [
  ["0-10 min", 10, [0, 10]],
  ["10-30 min", 30, [10, 30]],
  ["30-60 min", 60, [30, 60]],
  ["1 hour+", Infinity, [60, Infinity]],
] as const;

export const baseUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  `http://localhost:${process.env.PORT || 3000}`;
