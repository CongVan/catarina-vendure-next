import {
  Collection,
  SearchDocument,
  SearchQuery,
  SearchResult,
} from "@/__generated__/graphql";
import { getClient } from "@/lib/client";
import { data } from "autoprefixer";
import { ReactNode, Suspense } from "react";
import ProductList from "./ProductList";
import { ProductHomeSession } from "./ProductHomeSession";

interface ProductListByCollectionProps {
  collection: Collection;
}

export function ProductListByCollection({
  collection,
}: ProductListByCollectionProps) {
  const productPromise = getClient().query<SearchQuery>({
    query: SearchDocument,
    variables: {
      input: {
        groupByProduct: true,
        collectionSlug: collection.slug,
        skip: 0,
        take: 24,
      },
    },
  });

  return (
    <>
      <div className="space-y-1  border-b mt-10 mb-5">
        <h2 className="h2 text-2xl font-semibold tracking-tight">
          {collection.name}
        </h2>
        <p className="text-sm text-muted-foreground">
          {collection.description}
        </p>
      </div>
      <Suspense fallback={<>Loading...</>}>
        <ProductHomeSession productPromise={productPromise} />
      </Suspense>
    </>
  );
}
