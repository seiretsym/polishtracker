import React, { useEffect } from "react";
import { useStoreContext } from "../utils/globalState";
import Card from "../components/Card";
import API from "../utils/api";
import { SET_POLISHES, SET_FILTERED_POLISHES, SET_VIEW, AUTH } from "../utils/actions";

function Main() {
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    if (!state.user.authed) {
      const user = window.sessionStorage.getItem("user");
      if (user === "authed") {
        dispatch({
          type: AUTH,
          auth: { authed: true }
        })
      }
    }

    if (state.view !== "main") {
      dispatch({
        type: SET_VIEW,
        view: "main",
        rendered: false
      })
    }

    if (state.polishes.length < 1 && state.view === "main") {
      API
        .scrape()
        .then(() => {
          API
            .getAllPolishes()
            .then(({ data }) => {
              dispatch({
                type: SET_POLISHES,
                polishes: data,
                rendered: false
              })
              filterPolish();
            })
        })
    }

    if (state.polishes.length > 0 && !state.rendered) {
      filterPolish();
    }

  })

  function filterPolish() {
    const filter = {};
    const sort = state.filters.sort.filter;
    if (state.filters.brand.filter !== "") {
      filter.brand = state.filters.brand.filter;
    }
    if (state.filters.type.filter !== "") {
      filter.type = state.filters.type.filter;
    }
    let filteredPolishes = state.polishes.filter(polish => {
      for (let key in filter) {
        if (polish[key] !== filter[key]) {
          return false
        }
      }
      return true;
    })
    if (state.filters.order.filter === "1") {
      filteredPolishes = filteredPolishes.sort((a, b) => {
        if (a[sort] > b[sort]) {
          return 1;
        } else if (a[sort] < b[sort]) {
          return -1;
        }
        return 0;
      })
    } else {
      filteredPolishes = filteredPolishes.sort((a, b) => {
        if (a[sort] > b[sort]) {
          return -1;
        } else if (a[sort] < b[sort]) {
          return 1;
        }
        return 0;
      })
    }
    dispatch({
      type: SET_FILTERED_POLISHES,
      filteredPolishes: filteredPolishes,
      rendered: true,
    })
  }

  return (
    <div className="container content">
      <div className="row">
        {state.filteredPolishes.map(polish => {
          return <Card key={polish._id} {...polish} />
        })}
      </div>
    </div>
  )
};

export default Main;