import { getClient } from "@/lib/client";
import { ReactNode } from "react";

import ProductCard from "./ProductCard";

import Pagination from "@/components/Pagination";
import { SearchInput, SearchDocument } from "@/__generated__/graphql";

interface ProductListProps {
  input: SearchInput;
}

async function ProductList({ input }: ProductListProps) {
  const { data, loading } = await getClient().query({
    query: SearchDocument,
    variables: {
      input: input,
    },
    fetchPolicy: "cache-first",
    errorPolicy: "none",
  });
  const skip = input.skip || 0;
  const take = input.take || 0;

  const canNext = skip + take < data.search.totalItems;
  const canPrev = skip > take;

  return (
    <div>
      {data.search.items.length === 0 ? (
        <>No data</>
      ) : (
        <div>
          <div className="grid lg:grid-cols-4 grid-cols-2 md:grid-cols-3 gap-4">
            {data.search.items.map((p: any) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>

          <Pagination
            containerClass="max-w-sm mx-auto mt-20"
            canNext={canNext}
            canPrev={canPrev}
          />
        </div>
      )}
    </div>
  );
}

export default ProductList;
