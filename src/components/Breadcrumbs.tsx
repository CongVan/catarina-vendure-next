"use client";
import Link from "next/link";
import { Fragment, ReactNode } from "react";
import { Separator } from "./ui/separator";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface BreadcrumbsProps {
  breadcrumbs?: {
    name: string;
    slug: string;
  }[];
}

function Breadcrumbs({ breadcrumbs }: BreadcrumbsProps) {
  const pathname = usePathname();
  return (
    <div className="flex items-center text-sm flex-wrap w-full">
      {breadcrumbs?.map((b, index) => (
        <Fragment key={b.name}>
          {b.slug === "__root_collection__" ? (
            <Link href="/" className="p-1">
              Trang chủ
            </Link>
          ) : (
            <Link
              href={b.slug}
              className={cn(
                "p-1",
                index < breadcrumbs.length - 1 && "text-muted-foreground"
              )}
            >
              {b.name}
            </Link>
          )}

          {index >= 0 && index < breadcrumbs.length - 1 && (
            <Separator orientation="vertical" className="mx-2 h-5" />
          )}
        </Fragment>
      ))}
    </div>
  );
}

export default Breadcrumbs;
