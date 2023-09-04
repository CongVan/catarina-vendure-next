import { useSuspenseQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import {
  Product,
  ProductDocument,
  ProductQuery,
  ProductVariant,
} from "@/__generated__/graphql";
import "swiper/css";
import ProductDetails from "./ProductDetails";

interface PreviewProductContainerProps {
  productId: Product["id"];
}
function PreviewProductContainer({ productId }: PreviewProductContainerProps) {
  const [variant, setVariant] = useState<ProductVariant | null | undefined>(
    null
  );
  const { data, refetch } = useSuspenseQuery<ProductQuery>(ProductDocument, {
    variables: {
      id: productId,
    },
    errorPolicy: "none",
  });
  useEffect(() => {
    if (data) {
      setVariant(data.product?.variants?.[0] as ProductVariant);
    }
  }, [data]);

  return (
    <div className="w-full overflow-auto">
      <ProductDetails product={data.product} isPreview={true} />
    </div>
  );
}

export default PreviewProductContainer;
