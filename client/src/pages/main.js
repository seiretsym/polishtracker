import React from "react";
import { useStoreContext } from "../utils/globalState";
import Card from "../components/Card";
import API from "../utils/api";
import { SET_POLISHES } from "../utils/actions";

function Main() {
  const [state, dispatch] = useStoreContext();

  API.
    scrape()
    .then(() => {
      API
        .getAllPolishes()
        .then(({ data }) => {
          dispatch({
            type: SET_POLISHES,
            polishes: data
          })
        })
    })


  return (
    <div className="container content">
      <div className="row">
        {state.polishes.map(polish => {
          return <Card {...polish} key={polish._id} />
        })}
      </div>
    </div>
  )
};

export default Main;