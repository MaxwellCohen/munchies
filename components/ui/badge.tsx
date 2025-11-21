import { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <div className=" text-gray-800 border border-gray-800 text-sm font-bold px-2 rounded-full flex h-auto items-center gap-1">
      {children}
    </div>
  );
}


