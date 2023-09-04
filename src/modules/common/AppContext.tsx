"use client";

import { PreviewProvider } from "@/modules/product/PreviewProvider";
import { ApolloWrapper } from "@/lib/apollo-provider";
import { AuthProvider } from "../auth/context";
import { CollectionsProvider } from "../collection/CollectionProvider";

export const AppProvider = ({ children, session, collections }) => {
  return (
    <ApolloWrapper>
      <AuthProvider session={session}>
        <CollectionsProvider collections={collections}>
          <PreviewProvider>{children}</PreviewProvider>
        </CollectionsProvider>
      </AuthProvider>
    </ApolloWrapper>
  );
};
