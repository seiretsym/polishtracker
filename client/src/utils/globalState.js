import React, { createContext, useReducer, useContext } from "react";
import { AUTH, SET_POLISHES, SET_FILTERS } from "./actions";

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
    case SET_FILTERS:
      return {
        ...state,
        filters: action.filters
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
    filters: {
      brand: {
        filter: "",
        name: "All"
      },
      type: {
        filter: "",
        name: "All",
      },
      sort: {
        filter: "name",
        name: "Name",
      },
      order: {
        filter: "1",
        name: "Ascending"
      }
    }
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };