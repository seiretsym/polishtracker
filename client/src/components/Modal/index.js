import React from "react";
import "materialize-css";
import { Modal, Button, TextInput } from "react-materialize";
import API from "../../utils/api";
import { useStoreContext } from "../../utils/globalState";
import { AUTH } from "../../utils/actions";

function Message(props) {
  let trigger;
  if (props.buttonName === "Sign Out") {
    trigger = <Button className="link">{props.buttonName}</Button>
  } else {
    trigger = <Button className="btn dropdown-button" modal="close">{props.buttonName}</Button>
  }
  const actions = <Button className="btn dropdown-button" modal="close" onClick={props.onClick}>Close</Button>;

  return (
    <Modal header="Message" trigger={trigger} actions={actions}>
      <p>{props.message}</p>
    </Modal>
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

  const trigger = <Button className="link">Register</Button>
  const actions = (
    <div>
      <Button className="btn dropdown-button" modal="close">Close</Button>
      <Button className="btn dropdown-button" onClick={handleRegistration}>Register</Button>
    </div>
  )
  return (
    <Modal header="Account Registration" trigger={trigger} actions={actions}>
      <form>
        <TextInput id="r-username" label="Username" autoComplete="off" />
        <TextInput id="r-password" type="password" label="Password" autoComplete="off" />
        <TextInput id="r-confirm" type="password" label="Confirm Password" autoComplete="off" />
      </form>
    </Modal>
  )
}

function Signin() {
  const [state, dispatch] = useStoreContext();

  function handleSignin() {
    const username = document.getElementById("s-username").value.trim();
    const password = document.getElementById("s-password").value.trim();
    // validate password
    if (username.length < 1) {
      document.getElementById("r-username").setAttribute("placeholder", "please enter your username")
      return document.getElementById("r-username").focus();
    }
    if (password.length < 1) {
      document.getElementById("r-password").value = "";
      document.getElementById("r-password").setAttribute("placeholder", "please enter your password")
      return document.getElementById("r-password").focus();
    }
    let data = {
      username: username,
      password: password
    }
    API
      .authUser(data)
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

  const trigger = <Button className="link">Sign In</Button>
  const actions = (
    <div>
      <Button className="btn dropdown-button" modal="close">Close</Button>
      <Button className="btn dropdown-button" onClick={handleSignin}>Sign In</Button>
    </div>
  )

  return (
    <Modal header="Account Registration" trigger={trigger} actions={actions}>
      <form>
        <TextInput id="s-username" label="Username" autoComplete="off" />
        <TextInput id="s-password" type="password" label="Password" autoComplete="off" />
      </form>
    </Modal>
  )
}


export { Registration, Signin, Message }