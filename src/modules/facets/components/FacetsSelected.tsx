"use client";
import { ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "qs";

import { Facet, FacetValue } from "@/__generated__/graphql";
import { Badge } from "@/components/ui/badge";
import { XIcon } from "lucide-react";

interface FacetsSelectedProps {
  facets: Facet[];
}

function FacetsSelected({ facets }: FacetsSelectedProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const facetIds = (qs.parse(searchParams.toString()).facets as string[]) || [];

  const onSelectFacet = (id) => {
    const query = qs.parse(searchParams.toString()) as any;
    if (!query?.facets?.includes(id)) return;
    query.facets = (query.facets || []).filter((s) => s !== id);
    query.page = 1;
    router.push(
      pathname +
        "?" +
        qs.stringify(query, { arrayFormat: "brackets", encodeValuesOnly: true })
    );
  };

  const getFacetValue = (id) => {
    let f: FacetValue | undefined;
    for (const facet of facets) {
      const value = facet.values.find((v) => v.id === id);
      if (value) {
        f = value;
      }
    }
    return f;
  };
  return (
    <>
      {facetIds.map((id) => (
        <Badge
          key={id}
          onClick={() => onSelectFacet(id)}
          variant="outline"
          className="cursor-pointer px-4 py-2"
        >
          {getFacetValue(id)?.name} <XIcon className="w-5 h-5 ml-1" />{" "}
        </Badge>
      ))}
    </>
  );
}

export default FacetsSelected;
