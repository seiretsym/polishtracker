import React from "react";
import API from "../../utils/api";
import { useStoreContext } from "../../utils/globalState";
import { AUTH } from "../../utils/actions";

function handleCloseModal(event) {
  const { value } = event.target;
  document.getElementById(value).classList.remove("open");
}

function Message(props) {
  return (
    <div id="message-modal" className="modal">
      <div className="modal-content">
        <h4>Message</h4>
        <p>{props.message}</p>
      </div>
      <div className="modal-footer">
        <button className="modal-close btn dropdown-button" onClick={props.onClick}>Close</button>
      </div>
    </div>
  )
}

function Registration() {
  const [state, dispatch] = useStoreContext();

  function handleRegistration() {
    const username = document.getElementById("r-username").value.trim();
    const password = document.getElementById("r-password").value.trim();
    const confirm = document.getElementById("r-confirm").value.trim();
    // validate password
    if (username.length < 1) {
      document.getElementById("r-username").setAttribute("placeholder", "cannot be empty")
      return document.getElementById("r-username").focus();
    }
    if (password.length < 8) {
      document.getElementById("r-password").value = "";
      document.getElementById("r-password").setAttribute("placeholder", "password must be at least 8 characters")
      return document.getElementById("r-password").focus();
    }
    if (password !== confirm) {
      document.getElementById("r-confirm").value = "";
      document.getElementById("r-confirm").setAttribute("placeholder", "password must match")
      return document.getElementById("r-confirm").focus();
    }
    let data = {
      username: username,
      password: password
    }
    API
      .createUser(data)
      .then(({ data }) => {
        dispatch({
          type: AUTH,
          auth: { authed: data }
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div id="register-modal" className="modal">
      <div className="modal-content">
        <h4>Account Registration</h4>
        <div className="row">
          <form className="col s12">
            <div className="input-field col s12">
              <input type="text" id="r-username" autoComplete="off" />
              <label htmlFor="r-username">Username</label>
            </div>
            <div className="input-field col s12">
              <input type="text" id="r-password" autoComplete="off" />
              <label htmlFor="r-password">password</label>
            </div>
            <div className="input-field col s12">
              <input type="text" id="r-confirm" autoComplete="off" />
              <label htmlFor="r-confirm">Confirm Password</label>
            </div>
          </form>
        </div>
      </div>
      <div className="modal-footer">
        <button className="btn dropdown-button" onClick={handleRegistration}>Register</button>
        <button className="modal-close btn dropdown-button" onClick={handleCloseModal} value="register-modal">Close</button>
      </div>
    </div>
  )
}

function Signin() {
  const [state, dispatch] = useStoreContext();

  function handleSignin() {
    const username = document.getElementById("s-username").value.trim();
    const password = document.getElementById("s-password").value.trim();
    // validate password
    if (username.length < 1) {
      document.getElementById("s-username").setAttribute("placeholder", "please enter your username")
      return document.getElementById("s-username").focus();
    }
    if (password.length < 1) {
      document.getElementById("s-password").value = "";
      document.getElementById("s-password").setAttribute("placeholder", "please enter your password")
      return document.getElementById("s-password").focus();
    }
    let data = {
      username: username,
      password: password
    }
    API
      .authUser(data)
      .then(({ data }) => {
        document.getElementById("signin-modal").classList.remove("open");
        dispatch({
          type: AUTH,
          auth: { authed: data }
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div id="signin-modal" className="modal">
      <div className="modal-content">
        <h4>Account Sign In</h4>
        <div className="row">
          <form className="col s12">
            <div className="input-field col s12">
              <input type="text" id="s-username" autoComplete="off" />
              <label htmlFor="s-userrname">Username</label>
            </div>
            <div className="input-field col s12">
              <input type="password" id="s-password" autoComplete="off" />
              <label htmlFor="s-password">Password</label>
            </div>
          </form>
        </div>
      </div>
      <div className="modal-footer">
        <button className="btn dropdown-button" onClick={handleSignin}>Sign In</button>
        <button className="modal-close btn dropdown-button" onClick={handleCloseModal} value="signin-modal">Close</button>
      </div>
    </div>
  )
}


export { Registration, Signin, Message }