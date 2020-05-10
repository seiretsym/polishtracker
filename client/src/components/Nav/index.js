import React, { Component } from "react";

class Nav extends Component {
  render() {
    return (
      <div className="container">
        <div className="nav">
          <div className="input-field collections">
            <select defaultValue="0">
              <option value="0" disabled>Brand</option>
              <option value="Live Love Polish">Live Love Polish</option>
              <option value="Emily de Molly">Emily de Molly</option>
              <option value="">All</option>
            </select>
          </div>

          <div className="input-field type">
            <select defaultValue="0">
              <option value="0" disabled>Type</option>
              <option value="best-sellers">Best Sellers</option>
              <option value="whats-new">What's New</option>
              <option value="">All</option>
            </select>
          </div>

          <div className="input-field sort">
            <select defaultValue="0">
              <option value="0" disabled>Sort by</option>
              <option value="name">Name</option>
              <option value="price">Price</option>
            </select>
          </div>

          <div className="input-field order">
            <select defaultValue="0">
              <option value="0" disabled>Order by</option>
              <option value="1">Ascending</option>
              <option value="-1">Descending</option>
            </select>
          </div>

          <div className="account">
            <ul id="account" className="dropdown-content">
              <li><button className="link">Register</button></li>
              <li><button className="link">Sign In</button></li>
              <li><button className="link">Sign Out</button></li>
            </ul>
            <button className="dropdown-button btn" data-beloworigin="true" data-activates="account">Account</button>
          </div>
        </div>
      </div>
    )
  };
}

export default Nav;