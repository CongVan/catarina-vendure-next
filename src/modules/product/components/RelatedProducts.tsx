import { ApolloQueryResult } from "@apollo/client";
import { ReactNode } from "react";

import Link from "next/link";
import Image from "next/image";

import { formatCurrency } from "@/lib/format";
import { twMerge } from "tailwind-merge";
import { Product, SearchQuery, SearchResult } from "@/__generated__/graphql";
import { ImageIcon } from "lucide-react";
import ProductCard from "./ProductCard";

interface RelatedProductsProps {
  promises: Promise<ApolloQueryResult<SearchQuery>>;
  product: Product;
}

async function RelatedProducts({ promises, product }: RelatedProductsProps) {
  const { data } = await promises;
  return (
    <div className="grid lg:grid-cols-4 grid-cols-2 md:grid-cols-3 gap-4">
      {data.search.items
        .filter((p) => p.slug !== product.slug)
        .map((p) => (
          <ProductCard key={p.slug} {...(p as SearchResult)} />
        ))}
    </div>
  );
}

export default RelatedProducts;
