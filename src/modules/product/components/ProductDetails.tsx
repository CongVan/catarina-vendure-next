"use client";
import { ReactNode, useState } from "react";

import { formatCurrency } from "@/lib/format";

import { SwiperSlide, Swiper } from "swiper/react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

import groupBy from "lodash/groupBy";
import { findCheapestVariantPrice, inStock } from "@/lib/helper";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import Link from "next/link";
import ProductActions from "./ProductActions";
import { ProductQuery, ProductVariant } from "@/__generated__/graphql";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface ProductDetailsProps {
  product: ProductQuery["product"];
  isPreview?: boolean;
  extendSummary?: ReactNode;
}

function ProductDetails({
  product,
  isPreview,
  extendSummary,
}: ProductDetailsProps) {
  const [variant, setVariant] = useState<ProductVariant | null | undefined>(
    findCheapestVariantPrice(product?.variants as any)
  );

  return (
    <>
      <div className="flex flex-wrap items-start">
        <div className=" w-full lg:w-6/12 lg:pr-10 mb-10 lg:mb-0 ">
          <div className="relative">
            <Swiper
              navigation={{
                enabled: true,
                nextEl: ".next-slide",
                prevEl: ".prev-slide",
              }}
              loop={true}
              modules={[Navigation]}
            >
              {product?.assets?.map((img) => (
                <SwiperSlide key={img.source} className="pt-[80%] relative">
                  <Image
                    src={img.source}
                    alt=""
                    width={356}
                    height={356}
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="z-[1] next-slide btn btn-square btn-ghost absolute top-1/2 -translate-y-1/2 right-2 ">
              <ChevronRightIcon className="w-7 h-7" />
            </div>
            <div className="z-[1] prev-slide btn btn-square btn-ghost absolute top-1/2 -translate-y-1/2 left-2 ">
              <ChevronLeftIcon className="w-7 h-7" />
            </div>
          </div>
          {extendSummary && extendSummary}
        </div>
        <div className="w-full lg:w-6/12 sticky top-2 left-0">
          <Link href={"/p/" + product?.slug} className="h2 font-semibold">
            {product?.name}
          </Link>
          {variant && (
            <p className="h2 mt-4">
              {formatCurrency(
                variant?.priceWithTax || 0,
                variant?.currencyCode
              )}
            </p>
          )}
          {variant && (
            <Badge className=" badge badge-neutral badge-lg">
              {inStock(variant?.stockLevel) ? "Còn hàng" : "Hết hàng"}{" "}
            </Badge>
          )}

          <ul className="mt-4">
            {Object.entries(
              groupBy(
                product?.facetValues.map((s) => ({
                  name: s.name,
                  facet: s.facet.name,
                })),
                "facet"
              )
            ).map(([facet, value]) => (
              <li key={facet} className="flex items-center">
                <span className="min-w-[110px] font-semibold">{facet}:</span>
                <span>{(value as any).map((s) => s.name).join(", ")}</span>
              </li>
            ))}
          </ul>

          <div>
            {(product?.optionGroups?.length || 0) > 0 ? (
              <>
                {product?.optionGroups.map((group) => (
                  <div key={group.id} className="mb-4">
                    <Label className=" label font-semibold capitalize block my-4">
                      {group.name}
                    </Label>
                    <div className="flex gap-1 flex-wrap">
                      {group.options.map((option) => (
                        <Button
                          size="sm"
                          variant={
                            variant?.options.find(
                              (s) =>
                                s.id === option.id && s.groupId === group.id
                            )
                              ? "secondary"
                              : "outline"
                          }
                          key={option.id}
                          onClick={() =>
                            setVariant(
                              product?.variants?.find((p) =>
                                p.options.find(
                                  (op) =>
                                    op.id === option.id &&
                                    op.groupId === group.id
                                )
                              ) as any
                            )
                          }
                        >
                          {option.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            ) : null}
          </div>
          {variant && (
            <ProductActions variant={variant} isPreview={isPreview} />
          )}
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
