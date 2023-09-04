import { useState } from "react";

import { ProductVariant } from "@/__generated__/graphql";
import { Button } from "@/components/ui/button";
import { inStock } from "@/lib/helper";
import { HeartIcon, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";

interface ProductActionsProps {
  variant: ProductVariant;
  isPreview?: boolean;
}

function ProductActions({ variant, isPreview }: ProductActionsProps) {
  const sizeClass = isPreview ? "btn-md" : "btn-lg";
  const inputClass = isPreview
    ? "input-md w-full md:w-8"
    : "input-lg w-full md:w-12";

  const [quantity, setQuantity] = useState(1);
  return (
    <div className="py-4 flex items-center gap-2 flex-wrap md:flex-nowrap">
      <Select onValueChange={(v) => setQuantity(+v)} value={quantity + ""}>
        <SelectTrigger className="flex-0 w-auto h-14 min-w-[60px]">
          <SelectValue placeholder="Số lượng" defaultValue={1} />
        </SelectTrigger>
        <SelectContent>
          {Array.from(new Array(10)).map((_, index) => (
            <SelectItem value={index + 1 + ""} key={index}>
              {index + 1}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button className={cn(" flex-1 h-14", sizeClass)}>
        <ShoppingCart className="w-7 h-7 mr-1" />{" "}
        {inStock(variant.stockLevel) ? "Thêm vào giỏ hàng" : "Hết hàng"}
      </Button>
      <Button
        variant="outline"
        className={cn("flex-none h-14 w-full md:w-auto", sizeClass)}
      >
        <HeartIcon className="w-7 h-7 mr-2 text-destructive" />
        Thêm vào yêu thích
      </Button>
    </div>
  );
}

export default ProductActions;
