"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import qs from "qs";

interface PaginationProps {
  canNext?: boolean;
  canPrev?: boolean;
  onNext?: () => void;
  onPrev?: () => void;
  containerClass?: string;
}

function Pagination({
  canNext,
  canPrev,
  onNext,
  onPrev,
  containerClass,
}: PaginationProps) {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const onClickNext = () => {
    if (onNext) {
      return onNext();
    }
    if (canNext) {
      const query = qs.parse(params.toString());
      query["page"] = String((+(query["page"] + "") || 1) + 1);
      router.push(
        pathname +
          "?" +
          qs.stringify(query, {
            encodeValuesOnly: true,
            arrayFormat: "brackets",
          })
      );
    }
  };

  const onClickPrev = () => {
    if (onPrev) {
      return onPrev();
    }
    const query = qs.parse(params.toString());
    const page = +(query["page"] + "");

    if (canPrev && page > 1) {
      query["page"] = String(page - 1);
      router.push(
        pathname +
          "?" +
          qs.stringify(query, {
            encodeValuesOnly: true,
            arrayFormat: "brackets",
          })
      );
    }
  };

  return (
    <div className={twMerge("join grid grid-cols-2", containerClass)}>
      <button
        className={twMerge("join-item btn btn-outline")}
        
        disabled={!canPrev}
        onClick={onClickPrev}
      >
        Trang trước
      </button>
      <button
        className={twMerge("join-item btn btn-outline")}
        disabled={!canNext}
        onClick={onClickNext}
      >
        Trang kế tiếp
      </button>
    </div>
  );
}

export default Pagination;
