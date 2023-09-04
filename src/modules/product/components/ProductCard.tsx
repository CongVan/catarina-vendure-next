"use client";

import { formatCurrency } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";

import { SearchResult } from "@/__generated__/graphql";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ImageIcon, SearchIcon, ShoppingCart } from "lucide-react";
import { usePreview } from "../PreviewProvider";

interface ProductCardProps extends SearchResult {}

function ProductCard({
  productName,
  price,
  productAsset,
  currencyCode,
  productId,
  slug,
}: ProductCardProps) {
  const { togglePreview } = usePreview();

  return (
    <Card className="p-0 transition-all duration-300 ease-in-out flex flex-col">
      <Link href={"/p/" + slug}>
        <figure className="pt-[79%] relative py-5">
          {productAsset?.preview ? (
            <Image
              src={productAsset?.preview}
              width={156}
              height={156}
              className="absolute  w-[156px] mx-auto h-full inset-0 object-contain"
              alt={productName}
            />
          ) : (
            <div className="bg-base-200 w-full absolute inset-0 flex justify-center items-center">
              <ImageIcon className="w-12 h-12 text-neutral" />
            </div>
          )}
        </figure>
      </Link>
      <CardHeader className=" pb-0">
        <CardTitle className="font-medium line-clamp-2 text-sm hover:underline py-0">
          <Link
            href={"/p/" + slug}
            dangerouslySetInnerHTML={{ __html: productName }}
          ></Link>
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="font-bold text-sm">
        {price.__typename === "SinglePrice" && (
          <span>{formatCurrency(price.value, currencyCode)}</span>
        )}
        {price.__typename === "PriceRange" && (
          <>
            <span>{formatCurrency(price.min, currencyCode)}</span> {" - "}
            <span>{formatCurrency(price.max, currencyCode)}</span>
          </>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 flex-none mt-auto">
        <Button
          variant="secondary"
          className="w-full relative"
          onClick={() => {
            togglePreview(true, productId);
          }}
        >
          <SearchIcon
            className="absolute top-1/2 left-4 -translate-y-1/2"
            size={18}
          />
          Xem nhanh
        </Button>

        <Button className="w-full relative">
          <ShoppingCart
            className="absolute top-1/2 left-4 -translate-y-1/2"
            size={18}
          />
          Thêm vào giỏ
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
