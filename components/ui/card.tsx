import { cn } from "@/lib/util/cn";


export function Card({ children, ...props }: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}  className={cn("bg-white p-4 rounded-md shadow-md", props.className)}>
      {children}
    </div>
  );
}