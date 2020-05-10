import React, { createContext, useReducer, useContext } from "react";
import { AUTH, SET_POLISHES, SET_FILTERS, SET_FILTERED_POLISHES, SET_RENDERED, SET_VIEW } from "./actions";

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
        polishes: action.polishes,
        rendered: action.rendered,
      }
    case SET_FILTERS:
      return {
        ...state,
        filters: action.filters,
        rendered: action.rendered
      }
    case SET_FILTERED_POLISHES:
      return {
        ...state,
        filteredPolishes: action.filteredPolishes,
        rendered: action.rendered
      }
    case SET_RENDERED:
      return {
        ...state,
        rendered: action.rendered,
      }
    case SET_VIEW:
      return {
        ...state,
        view: action.view,
        rendered: action.rendered
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
    filteredPolishes: [],
    rendered: false,
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