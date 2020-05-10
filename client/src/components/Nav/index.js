import React from "react";
import { useStoreContext } from "../../utils/globalState";
import { Registration, Signin, Message } from "../Modal";
import API from "../../utils/api"
import { AUTH } from "../../utils/actions";

function Nav() {
  const [state, dispatch] = useStoreContext();

  function openSigninModal() {
    document.getElementById("signin-modal").classList.add("open");
  }

  function openRegisterModal() {
    document.getElementById("register-modal").classList.add("open");
  }

  function openSignOutModal() {
    document.getElementById("message-modal").classList.add("open");
  }

  function handleSignOut() {
    API
      .signout()
      .then(() => {
        dispatch({
          type: AUTH,
          auth: { authed: false }
        })
        document.getElementById("message-modal").classList.remove("open");
      })
  }

  // check auth state and render appropriate links
  function renderAccountLinks() {
    if (state.user.authed) {
      return (
        <div>
          <li><a href="./favorites" className="link btn">Favorites</a></li>
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
    <div className="container">
      <div className="nav">
        <div className="input-field collections">
          <select id="brand" defaultValue={state.filter.brand}>
            <option value="">All</option>
            <option value="Live Love Polish">Live Love Polish</option>
            <option value="Emily de Molly">Emily de Molly</option>
          </select>
          <label htmlFor="brand">Brand</label>
        </div>

        <div className="input-field type">
          <select id="type" defaultValue={state.filter.type}>
            <option value="">All</option>
            <option value="best-sellers">Best Sellers</option>
            <option value="whats-new">What's New</option>
          </select>
          <label htmlFor="id">Type</label>
        </div>

        <div className="input-field sort">
          <select id="sort" defaultValue={state.filter.sort}>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
          <label htmlFor="sort">Sort by</label>
        </div>

        <div className="input-field order">
          <select id="order" defaultValue={state.filter.order}>
            <option value="1">Ascending</option>
            <option value="-1">Descending</option>
          </select>
          <label htmlFor="order">Order by</label>
        </div>

        <div className="account">
          <ul id="account" className="dropdown-content">
            {renderAccountLinks()}
          </ul>
          <button className="dropdown-button btn" data-beloworigin="true" data-activates="account">Account</button>
        </div>
      </div>
      <Registration />
      <Signin />
      <Message message="You have successfully signed out." onClick={handleSignOut} />
    </div>
  )
};

export default Nav;