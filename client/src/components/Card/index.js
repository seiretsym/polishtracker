import React, { Component } from "react";
import API from "../../utils/api";

class Card extends Component {
  state = {
    wishMessage: ""
  }

  sendWishMessage = event => {
    const { value } = event.target;
    console.log(value)
  }

  handleWishMessageInput = event => {
    const { value } = event.target;
    this.setState({
      wishMessage: value
    })
  }

  // function to unhide the wish card
  openWishCard = event => {
    const { value } = event.target;
    let wishCard = document.getElementById(value);
    const parentHeight = wishCard.parentNode.offsetHeight;
    const parentWidth = wishCard.parentNode.offsetWidth;

    wishCard.style.height = "0px";
    wishCard.style.width = "0px";

    wishCard.classList.remove("hidden");
    this.openWishCardAnimate(wishCard, (parentHeight - 20), (parentWidth - 20))
  }

  // animation for opening wish card
  openWishCardAnimate = (card, maxHeight, maxWidth) => {
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
      };
    }
    let animation = setInterval(resize, 5);
  }

  closeWishCard = event => {
    const { value } = event.target;
    let wishCard = document.getElementById(value);
    this.closeWishCardAnimate(wishCard)
  }

  // animation for closing wish card
  closeWishCardAnimate = card => {
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

  render() {
    return (
      <div className="col s6 m4 l3 flex">
        <div className="card">
          <div className="card-image">
            <a href={this.props.link} target="_new">
              <img src={this.props.img} alt={this.props.name} />
            </a>
          </div>
          <div className="card-action">
            <button className="wish" onClick={this.openWishCard} value={this.props._id}>Make a Wish</button>
          </div>
        </div>
        <div id={this.props._id} className="card wishes hidden">
          <button className="close-wishcard" onClick={this.closeWishCard} value={this.props._id}>&times;</button>
          <div className="card-content">
            <ul className="wishlist">
              {this.props.wishes.map(wish => {
                return (
                  <li key={wish._id}>
                    <span className="username">{wish.username}:</span>
                    <span className="message"> {wish.message}</span>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="card-action">
            <div className="row chat">
              <div className="col s8">
                <input type="text" value={this.state.wishMessage} onChange={this.handleWishMessageInput} placeholder="make a wish" />
              </div>
              <div className="col s4">
                <button className="send-wish" value={this.props._id} onClick={this.sendWishMessage}>Wish</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Card;