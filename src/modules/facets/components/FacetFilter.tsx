"use client";
import { ReactNode } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "qs";

import { twMerge } from "tailwind-merge";
import { Facet } from "@/__generated__/graphql";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";

interface FacetFilterProps {
  facet: Facet;
}

function FacetFilter({ facet }: FacetFilterProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const facets = (qs.parse(searchParams.toString()).facets as string[]) || [];

  const isActive = !!facets.find((f) => !!facet.values.find((s) => s.id === f));

  const onSelectFacet = (id) => {
    const query = qs.parse(searchParams.toString()) as any;

    if (query?.facets?.includes(id)) {
      query.facets = (query.facets || []).filter((s) => s !== id);
    } else {
      query.facets = (query.facets || []).concat(id);
    }
    query.page = 1;

    router.push(
      pathname +
        "?" +
        qs.stringify(query, { arrayFormat: "brackets", encodeValuesOnly: true })
    );
  };

  return (
    <AccordionItem value={facet.name} className="w-full mb-1">
      <AccordionTrigger className="w-full">{facet.name}</AccordionTrigger>

      <AccordionContent className="h-full relative">
        <ScrollArea className="max-h-56 overflow-auto">
          {facet.values.map((f) => (
            <div key={f.id} className="flex items-center space-x-2 w-full pb-1">
              <Checkbox id={f.name} defaultChecked={facets.includes(f.id)} />
              <label
                htmlFor={f.name}
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 grow"
                onClick={() => onSelectFacet(f.id)}
              >
                {f.name}
              </label>
            </div>
          ))}
        </ScrollArea>
      </AccordionContent>
    </AccordionItem>
  );
}

export default FacetFilter;
