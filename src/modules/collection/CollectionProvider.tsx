"use client";

import { CollectionsQuery } from "@/__generated__/graphql";
import { createContext, useReducer, useMemo, useContext } from "react";

type State = {
  collections: CollectionsQuery["collections"]["items"];
};
const initialState: State = {
  collections: [],
};

const CollectionsContext = createContext<State>(initialState);

type Action = {};

function reducer(state: State, action: Action): State {
  return state;
}
export const CollectionsProvider = ({ children, collections }) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    collections,
  });

  const value = useMemo(() => {
    return {
      ...state,
    };
  }, [state]);

  return (
    <CollectionsContext.Provider value={value}>
      {children}
    </CollectionsContext.Provider>
  );
};

export const useCollections = () => {
  const state = useContext(CollectionsContext);
  return state;
};
