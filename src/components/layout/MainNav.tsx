"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { useCollections } from "@/modules/collection/CollectionProvider";
import { usePathname } from "next/navigation";
import { CollectionsQuery } from "@/__generated__/graphql";

interface Props extends React.HTMLAttributes<HTMLElement> {
  collections?: CollectionsQuery["collections"]["items"];
}

export function MainNav({ className, ...props }: Props) {
  const pathname = usePathname();
  const { collections } = useCollections();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {collections?.map((collection) => (
        <Link
          href={collection.slug}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname.startsWith(collection.slug)
              ? "text-primary"
              : "text-muted-foreground"
          )}
          key={collection.id}
        >
          {collection.name}
        </Link>
      ))}
    </nav>
  );
}
