import { getClient } from "@/lib/client";

import { ReactNode } from "react";

import FacetFilter from "@/modules/facets/components/FacetFilter";
import FacetsSelected from "@/modules/facets/components/FacetsSelected";
import { FacetsDocument, SortOrder } from "@/__generated__/graphql";
import { Accordion } from "@/components/ui/accordion";

interface ProductFilterProps {}

async function ProductFilter({}: ProductFilterProps) {
  const { data } = await getClient().query({
    query: FacetsDocument,
    variables: {
      options: {
        take: 100,
        sort: {
          name: SortOrder.Asc,
        },
      },
    },
  });

  return (
    <>
      {data.facets && (
        <div className="flex gap-1 flex-wrap mb-2">
          <FacetsSelected facets={data.facets.items as any} />
        </div>
      )}
      <Accordion type="single" collapsible className="w-full -mt-2">
        {data.facets.items.map((facet) => (
          <FacetFilter key={facet.code} facet={facet as any} />
        ))}
      </Accordion>
    </>
  );
}

export default ProductFilter;
