"use client";

import { Suspense } from "react";
import "swiper/css";
import { usePreview } from "../PreviewProvider";
import PreviewProductContainer from "./PreviewProductContainer";
import Loading from "@/components/Loading";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductReviewModalProps {}

function ProductReviewModal({}: ProductReviewModalProps) {
  const { productId, visible, togglePreview } = usePreview();

  return (
    <Dialog open={visible} onOpenChange={(v) => togglePreview(v)} modal={true}>
      <DialogContent className=" !w-[860px] max-w-none">
        {productId ? (
          <>
            <Suspense
              fallback={
                <>
                  <Skeleton className="w-11/12 h-8"></Skeleton>
                  <Skeleton className="w-6/12 h-4"></Skeleton>
                  <Skeleton className="w-2/12 h-4"></Skeleton>
                </>
              }
            >
              <PreviewProductContainer key={productId} productId={productId} />
            </Suspense>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

export default ProductReviewModal;
