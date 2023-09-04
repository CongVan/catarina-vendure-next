import { getClient } from "@/lib/client";
import ProductCard from "@/modules/product/components/ProductCard";

import Image from "next/image";

import { useCollections } from "@/modules/collection/CollectionProvider";
import {
  CollectionsQuery,
  CollectionsDocument,
  SearchQuery,
  SearchDocument,
  SearchResult,
  Collection,
} from "@/__generated__/graphql";
import { ProductListByCollection } from "@/modules/product/components";

export default async function Home() {
  const { data } = await getClient().query<CollectionsQuery>({
    query: CollectionsDocument,
    variables: {
      options: {
        filter: {
          parentId: { eq: "1" },
        },
      },
    },
  });

  const collections = data.collections.items;

  return (
    <div className="container mx-auto mt-5">
      {collections.map((collection) => (
        <ProductListByCollection
          key={collection.id}
          collection={collection as Collection}
        />
      ))}
    </div>
  );
}
