import Loading from "@/components/Loading";
import { ReactNode } from "react";

function CollectionLoadingPage() {
  return (
    <div className="min-w-[620px] flex flex-col justify-center items-center container">
      <Loading className="text-primary"/>
    </div>
  );
}

export default CollectionLoadingPage;
