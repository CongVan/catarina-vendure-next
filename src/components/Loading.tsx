import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface LoadingProps {
  className?: string;
}

function Loading({ className }: LoadingProps) {
  return (
    <div
      className={twMerge(
        "loading loading-ring loading-lg text-primary flex justify-center items-center mx-auto",
        className
      )}
    ></div>
  );
}

export default Loading;
