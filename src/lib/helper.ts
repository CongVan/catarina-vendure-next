import qs from "qs";
import isEmpty from "lodash/isEmpty";
import { Collection, ProductVariant } from "@/__generated__/graphql";

export const getCollectionHref = (collection: Collection) => {
  const query = {};

  collection.filters?.map((f) => {
    const facetFilter = f.args.find((arg) => arg.name === "facetValueIds");
    if (facetFilter) {
      query["facets"] = [...(query["facets"] || [])].concat(
        JSON.parse(facetFilter.value)
      );
    }
  });

  return `${
    collection.slug?.startsWith("/") ? collection.slug : "/" + collection.slug
  }${!isEmpty(query) ? "?" + qs.stringify(query) : ""}`;
};

export const findCheapestVariantPrice = (variants: ProductVariant[]) => {
  let variant: ProductVariant | null = null;
  for (let index = 0; index < variants.length; index++) {
    const element = variants[index];
    if (!variant || (variant && element.priceWithTax < variant.priceWithTax)) {
      variant = element;
    }
  }
  return variant;
};

export const inStock = (stockLevel: ProductVariant["stockLevel"]) => {
  return stockLevel === "IN_STOCK";
};
