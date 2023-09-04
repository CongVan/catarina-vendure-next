import { SearchQuery, SearchResult } from "@/__generated__/graphql";
import { ApolloQueryResult } from "@apollo/client";
import { ReactNode } from "react";
import ProductCard from "./ProductCard";

interface ProductHomeSessionProps {
  productPromise: Promise<ApolloQueryResult<SearchQuery>>;
}

export async function ProductHomeSession({
  productPromise,
}: ProductHomeSessionProps) {
  const products = await productPromise;
  const items = products.data.search.items as SearchResult[];

  return (
    <div className="grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {items.map((product) => (
        <ProductCard key={product.slug} {...product} />
      ))}
    </div>
  );
}
