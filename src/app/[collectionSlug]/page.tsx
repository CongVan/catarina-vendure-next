import { getClient } from "@/lib/client";

import { CollectionDocument } from "@/__generated__/graphql";
import Loading from "@/components/Loading";
import BreadcrumbCollections from "@/modules/collection/components/BreadcumbCollection";
import ProductFilter from "@/modules/product/components/ProductFilter";
import ProductList from "@/modules/product/components/ProductList";
import { notFound } from "next/navigation";
import qs from "qs";
import { Suspense } from "react";
const PER_PAGE = 32;
export default async function CollectionPage({ params, searchParams }) {
  const { collectionSlug } = params;

  const { data } = await getClient().query({
    query: CollectionDocument,
    variables: {
      slug: collectionSlug,
    },
  });
  if (!data.collection) {
    return notFound();
  }
  return (
    <div className="container mt-5">
      <BreadcrumbCollections collections={[data.collection] as any} />

      <h1 className="h2 my-8">{data.collection?.name}</h1>
      <div className="flex items-start gap-4 flex-wrap lg:flex-nowrap">
        <div className="w-full lg:w-3/12 sticky top-0">
          <Suspense fallback={<Loading />}>
            <ProductFilter />
          </Suspense>
        </div>
        <div className="w-full lg:w-9/12">
          <Suspense fallback={<Loading />}>
            <ProductList
              input={{
                groupByProduct: true,
                take: PER_PAGE,
                skip: ((+searchParams["page"] || 1) - 1) * PER_PAGE,
                facetValueFilters: (
                  qs.parse(searchParams).facets || ([] as any)
                ).map((f) => ({
                  and: f,
                })),
              }}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
