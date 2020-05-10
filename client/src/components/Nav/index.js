import React, { useEffect } from "react";
import { useStoreContext } from "../../utils/globalState";
import { Registration, Signin, Message } from "../Modal";
import API from "../../utils/api"
import { AUTH, SET_FILTERS } from "../../utils/actions";

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

  function handleChange(event) {
    const { id, name, value } = event.target;
    dispatch({
      type: SET_FILTERS,
      filters: {
        ...state.filters,
        [id]: {
          filter: value,
          name: name
        }
      }
    })
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
          <div className="brand-div">
            <ul id="brand-list" className="dropdown-content">
              <li>
                <button id="brand" name="All" className="link brand-link" value="" onClick={handleChange}>All</button>
              </li>
              <li>
                <button id="brand" name="Live Love Polish" className="link brand-link" value="Live Love Polish" onClick={handleChange}>Live Love Polish</button>
              </li>
              <li>
                <button id="brand" name="Emily de Molly" className="link brand-link" value="Emily de Molly" onClick={handleChange}>Emily de Molly</button>
              </li>
            </ul>
            <input id="brand-button" type="text" className="dropdown-button btn brand-btn" data-beloworigin="true" data-activates="brand-list" value={state.filters.brand.name} readOnly />
            <span className="caret">▼</span>
            <label htmlFor="brand-button">Brand</label>
          </div>
        </div>

        <div className="input-field type">
          <div className="type-div">
            <ul id="type-list" className="dropdown-content">
              <li>
                <button id="type" name="All" className="link type-link" value="" onClick={handleChange}>All</button>
              </li>
              <li>
                <button id="type" name="Best Sellers" className="link type-link" value="best-sellers" onClick={handleChange}>Best Sellers</button>
              </li>
              <li>
                <button id="type" name="New Releases" className="link type-link" value="whats-new" onClick={handleChange}>New Releases</button>
              </li>
            </ul>
            <input id="type-button" type="text" className="dropdown-button btn type-btn" data-beloworigin="true" data-activates="type-list" value={state.filters.type.name} onChange={handleChange} readOnly />
            <span className="caret">▼</span>
            <label htmlFor="type-button">Type</label>
          </div>
        </div>

        <div className="input-field sort">
          <div className="sort-div">
            <ul id="sort-list" className="dropdown-content">
              <li>
                <button id="sort" name="Name" className="link sort-link" value="name" onClick={handleChange}>Name</button>
              </li>
              <li>
                <button id="sort" name="Price" className="link sort-link" value="price" onClick={handleChange}>Price</button>
              </li>
            </ul>
            <input id="sort-button" type="text" className="dropdown-button btn sort-btn" data-beloworigin="true" data-activates="sort-list" value={state.filters.sort.name} onChange={handleChange} readOnly />
            <span className="caret">▼</span>
            <label htmlFor="sort-button">Sort by</label>
          </div>
        </div>

        <div className="input-field order">
          <div className="order-div">
            <ul id="order-list" className="dropdown-content">
              <li>
                <button id="order" name="Ascending" className="link order-link" value="1" onClick={handleChange}>Name</button>
              </li>
              <li>
                <button id="order" name="Descending" className="link order-link" value="-1" onClick={handleChange}>Price</button>
              </li>
            </ul>
            <input id="order-button" type="text" className="dropdown-button btn order-btn" data-beloworigin="true" data-activates="order-list" value={state.filters.order.name} onChange={handleChange} readOnly />
            <span className="caret">▼</span>
            <label htmlFor="order-button">Order by</label>
          </div>
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