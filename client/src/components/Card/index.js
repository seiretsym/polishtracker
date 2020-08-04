import React, { useState } from "react";
import API from "../../utils/api";
import { useStoreContext } from "../../utils/globalState";
import { SET_POLISHES, SET_FILTERED_POLISHES } from "../../utils/actions";

function Card(props) {
  const [state, dispatch] = useStoreContext();
  const [wishMessage, setWishMessage] = useState();

  function sendWishMessage(event) {
    const { value } = event.target;
    const data = {
      message: wishMessage
    }
    API
      .createWish(value, data)
      .then(() => {
        API
          .getAllPolishes()
          .then(({ data }) => {
            dispatch({
              type: SET_POLISHES,
              polishes: data,
              rendered: false
            })
          })
      })
  }

  function handleWishMessageInput(event) {
    const { value } = event.target;
    setWishMessage(value)
  }

  // function to unhide the wish card
  function openWishCard(event) {
    const { value } = event.target;
    let wishCard = document.getElementById(value);
    const parentHeight = wishCard.parentNode.offsetHeight;
    const parentWidth = wishCard.parentNode.offsetWidth;

    wishCard.style.height = "0px";
    wishCard.style.width = "0px";

    wishCard.classList.remove("hidden");
    openWishCardAnimate(wishCard, (parentHeight - 20), (parentWidth - 20))
  }

  // animation for opening wish card
  function openWishCardAnimate(card, maxHeight, maxWidth) {
    let currentHeight = 0;
    let currentWidth = 0;
    const resize = function () {
      if (currentHeight < maxHeight) {
        card.style.height = currentHeight + "px";
        currentHeight += 16;
      } else {
        card.style.height = maxHeight + "px";
      };
      if (currentWidth < maxWidth) {
        card.style.width = currentWidth + "px";
        currentWidth += 16;
      } else {
        card.style.width = maxWidth + "px";
      };
      if (currentHeight >= maxHeight && currentWidth >= maxWidth) {
        card.style.height = maxHeight + "px";
        clearInterval(animation);
        let cardContent = card.children[1];
        cardContent.style.height = maxHeight - 110 + "px";
        cardContent.scrollTop = cardContent.scrollHeight;
        window.addEventListener("resize", function (event) {
          const parentHeight = card.parentNode.offsetHeight;
          const parentWidth = card.parentNode.offsetWidth;
          let cardContent = card.children[1];
          cardContent.style.height = parentHeight - 120 + "px";
          cardContent.scrollTop = cardContent.scrollHeight;
          card.style.height = parentHeight - 20 + "px";
          card.style.width = parentWidth - 20 + "px";
        });
      };
    }
    let animation = setInterval(resize, 5);
  }

  function closeWishCard(event) {
    const { value } = event.target;
    let wishCard = document.getElementById(value);
    closeWishCardAnimate(wishCard)
  }

  // animation for closing wish card
  function closeWishCardAnimate(card) {
    let currentHeight = card.style.height;
    let currentWidth = card.style.width;
    currentHeight = parseInt(currentHeight.slice(0, currentHeight.length - 2));
    currentWidth = parseInt(currentWidth.slice(0, currentWidth.length - 2));
    const resize = function () {
      if (currentHeight > 0) {
        card.style.height = currentHeight + "px";
        currentHeight -= 16;
      } else {
        currentHeight = 0 + "px";
      };
      if (currentWidth > 0) {
        card.style.width = currentWidth + "px";
        currentWidth -= 16;
      } else {
        card.style.width = 0 + "px";
      };
      if (currentHeight <= 0 && currentWidth <= 0) {
        clearInterval(animation);
        card.classList.add("hidden");
      };
    }
    let animation = setInterval(resize, 5);
  }

  function addFavorite(event) {
    const { value } = event.target;
    API
      .addFavorite(value)
      .then((data) => {
        if (data === "redirect") {
          window.sessionStorage.removeItem("user")
          window.location.replace("./")
        } else {
          openAddModal();
        }
      })
  }

  function removeFavorite(event) {
    const { value } = event.target;
    API
      .removeFavorite(value)
      .then((data) => {
        if (data === "redirect") {
          window.sessionStorage.removeItem("user")
          window.location.replace("./")
        } else {
          window.location.reload();
        }
      })
  }

  function openAddModal() {
    document.getElementById("add-favorite-modal").classList.add("open");
  }

  function renderFavoriteBtn() {
    if (state.user.authed) {
      if (state.view === "favorites") {
        return (
          <button className="add-favorite" onClick={removeFavorite} value={props._id}>&times;</button>
        )
      } else {
        return (
          <button className="add-favorite" onClick={addFavorite} value={props._id}>★</button>
        )
      }
    } else {
      return <div />
    }
  }

  function renderWishCardBtn() {
    if (state.user.authed) {
      return (
        <div className="card-action">
          <div className="row chat">
            <div className="col s8">
              <input type="text" value={state.wishMessage} onChange={handleWishMessageInput} placeholder="make a wish" />
            </div>
            <div className="col s4">
              <button className="send-wish" value={props._id} onClick={sendWishMessage}>Wish</button>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="card-action">
          <div className="row chat">
            <div className="col s8">
              <input type="text" value={state.wishMessage} onChange={handleWishMessageInput} placeholder="sign in first" readOnly />
            </div>
            <div className="col s4">
              <button className="send-wish disabled" value={props._id} onClick={sendWishMessage}>Wish</button>
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="col s12 m6 l4 xl4" key={props._id}>
      <div className="card">
        <div className="card-image">
          <a href={props.link} target="_new">
            <img src={props.img} alt={props.name} />
          </a>
          {renderFavoriteBtn()}
        </div>
        <div className="card-content">
          <p>
            <a href={props.link} target="_new">
              {props.name} - ${props.price}
            </a>
          </p>
        </div>
        <div className="card-action">
          <button className="wish" onClick={openWishCard} value={props._id}>Make a Wish</button>
        </div>
      </div>
      <div id={props._id} className="card wishes hidden">
        <button className="close-wishcard" onClick={closeWishCard} value={props._id}>&times;</button>
        <div className="card-content">
          <ul className="wishlist">
            {props.wishes.map(wish => {
              return (
                <li key={wish._id}>
                  <span className="username">{wish.username}:</span>
                  <span className="message"> {wish.message}</span>
                </li>
              )
            })}
          </ul>
        </div>
        {renderWishCardBtn()}
      </div>
    </div>
  )
}

export default Card;