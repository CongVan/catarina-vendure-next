import {
  Collection,
  Product,
  ProductDocument,
  SearchDocument,
} from "@/__generated__/graphql";
import Breadcrumbs from "@/components/Breadcrumbs";
import Loading from "@/components/Loading";
import { getClient } from "@/lib/client";
import BreadcrumbCollections from "@/modules/collection/components/BreadcumbCollection";
import ProductDetails from "@/modules/product/components/ProductDetails";
import RelatedProducts from "@/modules/product/components/RelatedProducts";

import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function ProductPage({ params }) {
  const { productSlug } = params;
  const { data } = await getClient().query({
    query: ProductDocument,
    variables: {
      slug: productSlug,
    },
  });

  if (!data.product) {
    notFound();
  }

  const relatedPromise = getClient().query({
    query: SearchDocument,
    variables: {
      input: {
        groupByProduct: true,
        take: 5,
        collectionSlug: data.product.collections?.[0]?.slug,
      },
    },
  });

  return (
    <div className="container mt-5">
      <BreadcrumbCollections
        collections={
          data.product.collections.concat({
            name: data.product.name,
            slug: "/p/" + data.product.slug,
          } as Collection) as Collection[]
        }
      />

      <ProductDetails
        product={data.product}
        extendSummary={
          <div className="hidden md:block">
            <div className="h3 mb-10 border-b">Mô tả sản phầm</div>
            <div
              className="prose mx-auto max-w-none "
              dangerouslySetInnerHTML={{ __html: data.product.description }}
            ></div>
          </div>
        }
      />
      <div className="block md:hidden">
        <div className="h3 mb-10 border-b">Mô tả sản phầm</div>
        <div
          className="prose mx-auto max-w-none "
          dangerouslySetInnerHTML={{ __html: data.product.description }}
        ></div>
      </div>
      <div className="">
        <div className="h3 border-b mb-10">Liên quan</div>
        <Suspense fallback={<Loading />}>
          <RelatedProducts
            promises={relatedPromise}
            product={data.product as Product}
          />
        </Suspense>
      </div>
    </div>
  );
}
