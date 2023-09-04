"use client";
import { Product } from "@/__generated__/graphql";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
} from "react";


type State = {
  productId: Product["id"];
  visible: boolean;
  togglePreview: (visible: boolean, id?: Product["id"]) => void;
};
const initialState: State = {
  productId: "",
  visible: false,
  togglePreview: () => {},
};
const PreviewContext = createContext<State>(initialState);

type Action = {
  type: "TOGGLE_PREVIEW";
  payload: { id: State["productId"]; visible: boolean };
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "TOGGLE_PREVIEW":
      return {
        ...state,
        productId: action.payload.id,
        visible: action.payload.visible,
      };

    default:
      return state;
  }
}
export const PreviewProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const togglePreview = useCallback((visible, id) => {
    dispatch({ type: "TOGGLE_PREVIEW", payload: { id, visible } });
  }, []);

  const value = useMemo(() => {
    return {
      ...state,
      togglePreview,
    };
  }, [state, togglePreview]);

  return (
    <PreviewContext.Provider value={value}>{children}</PreviewContext.Provider>
  );
};

export const usePreview = () => {
  const state = useContext(PreviewContext);
  return state;
};
