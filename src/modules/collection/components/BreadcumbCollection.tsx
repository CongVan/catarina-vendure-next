import { Collection } from "@/__generated__/graphql";
import Breadcrumbs from "@/components/Breadcrumbs";

import { getCollectionHref } from "@/lib/helper";
type Props = {
  collections: Collection[];
};
export default function BreadcrumbCollections({ collections }: Props) {
  const breadcrumbs = [{ name: "Trang chủ", slug: "/" }].concat(
    collections.map((c) => {
      return {
        name: c.name,
        slug: getCollectionHref(c),
      };
    })
  );
  return <Breadcrumbs breadcrumbs={breadcrumbs}></Breadcrumbs>;
}
