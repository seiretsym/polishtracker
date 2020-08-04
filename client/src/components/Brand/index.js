import React from "react";
import { useStoreContext } from "../../utils/globalState";

function Brand() {
  const [state, dispatch] = useStoreContext();

  function openSigninModal() {
    document.getElementById("signin-modal").classList.add("open");
  }

  function openRegisterModal() {
    document.getElementById("register-modal").classList.add("open");
  }

  function openSignOutModal() {
    document.getElementById("signout-modal").classList.add("open");
  }

  // check auth state and render appropriate links
  function renderAccountLinks() {
    let view;
    if (state.view === "favorites") {
      view = <a href="./" className="link btn">Collections</a>
    } else {
      view = <a href="./favorites" className="link btn">Favorites</a>
    }
    if (state.user.authed) {
      return (
        <div>
          <li>{view}</li>
          <li><button className="link" onClick={openSignOutModal}>Sign Out</button></li>
        </div>
      )
    } else {
      return (
        <div>
          <li><button className="link" onClick={openSigninModal}>Sign In</button></li>
          <li><button className="link" onClick={openRegisterModal}>Register</button></li>
        </div>
      )
    }
  }

  return (
    <div className="container brand">
      <h1 className="brand-name">Sparkles</h1>
      <h5 className="brand-text">...because your nails deserve to be fabulous!</h5>
      <div className="row">
        <div className="col s12 l4 offset-l4">
          <div className="account">
            <ul id="account" className="dropdown-content">
              {renderAccountLinks()}
            </ul>
            <button className="dropdown-button btn" data-beloworigin="true" data-activates="account">Navigation</button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Brand;