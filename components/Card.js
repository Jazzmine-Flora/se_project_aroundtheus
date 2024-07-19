export default class Card {
    constructor(data, cardSelector) {
     this._name = data.name;
     this._link = data.link;
     this._cardSelector = cardSelector;
    }
 
    _setEventListeners() {
     
     // ".card__button-like"
     this._cardElement.querySelector(".card__button-like").addEventListener("click", () => {
         this._handleLikeIcon();
     })
    
     // ".card__delete-button"
     this._cardElement.querySelector(".card__delete-button").addEventListener("click", () => {
       this._handleDeleteCard();
     })
    }
 
    _handleDeleteCard() {
      this._cardElement.remove();
      this._cardElement = null;
    }
 
    _handleLikeIcon() {
     this._cardElement.querySelector(".card__button-like").classList.toggle("card__button-like_active");
    }
 
    _handlePreviewPicture() {
     
    }
 
    getView() {
     this._cardElement = document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(true);
    
     // get card view
     this._setEventListeners();
     // return the card
    }
 } 