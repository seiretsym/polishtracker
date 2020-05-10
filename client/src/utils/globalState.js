import React, { createContext, useReducer, useContext } from "react";
import { AUTH, SET_POLISHES } from "./actions";

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
    case AUTH:
      return {
        ...state,
        user: action.auth
      }
    case SET_POLISHES:
      return {
        ...state,
        polishes: action.polishes
      }
    default:
      return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: {
      authed: false,
    },
    polishes: [],
    filter: {
      brand: "",
      type: "",
      sort: "name",
      order: "1"
    }
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };