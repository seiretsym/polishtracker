import React from "react";
import { useStoreContext } from "../utils/globalState";

function Main() {
  const [state, dispatch] = useStoreContext();

  return (
    <div className="container content">
      <div className="row">
      </div>
    </div>
  )
};

export default Main;