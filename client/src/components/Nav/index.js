import React from "react";
import { useStoreContext } from "../../utils/globalState";
import { Registration, Signin, Message } from "../Modal";
import API from "../../utils/api"
import { AUTH } from "../../utils/actions";

function Nav() {
  const [state, dispatch] = useStoreContext();

  function handleSignOut() {
    API
      .signout()
      .then(() => {
        dispatch({
          type: AUTH,
          auth: { authed: false }
        })
      })
  }

  // check auth state and render appropriate links
  function renderAccountLinks() {
    if (state.user.authed) {
      return (
        <div>
          <li><a href="./favorites" className="link btn">Favorites</a></li>
          <li><Message message="You have successfully signed out." onClick={handleSignOut} buttonName="Sign Out" /></li>
        </div>
      )
    } else {
      return (
        <div>
          <li><Signin /></li>
          <li><Registration /></li>
        </div>
      )
    }
  }

  return (
    <div className="container">
      <div className="nav">
        <div className="input-field collections">
          <select id="brand" defaultValue="">
            <option value="">All</option>
            <option value="Live Love Polish">Live Love Polish</option>
            <option value="Emily de Molly">Emily de Molly</option>
          </select>
          <label for="brand">Brand</label>
        </div>

        <div className="input-field type">
          <select id="type" defaultValue="">
            <option value="">All</option>
            <option value="best-sellers">Best Sellers</option>
            <option value="whats-new">What's New</option>
          </select>
          <label for="id">Type</label>
        </div>

        <div className="input-field sort">
          <select id="sort" defaultValue="name">
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
          <label for="sort">Sort by</label>
        </div>

        <div className="input-field order">
          <select id="order" defaultValue="1">
            <option value="1">Ascending</option>
            <option value="-1">Descending</option>
          </select>
          <label for="order">Order by</label>
        </div>

        <div className="account">
          <ul id="account" className="dropdown-content">
            {renderAccountLinks()}
          </ul>
          <button className="dropdown-button btn" data-beloworigin="true" data-activates="account">Account</button>
        </div>
      </div>
    </div>
  )
};

export default Nav;