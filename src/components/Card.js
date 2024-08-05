export default class Card {
  constructor(data, cardSelector, handlePreviewPicture) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handlePreviewPicture = handlePreviewPicture;
    this._cardElement = this._getTemplate();
    this._likeButton = this._cardElement.querySelector(".card__button-like");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardImageEl = this._cardElement.querySelector(".card__image");
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });

    this._cardImageEl.addEventListener("click", () => {
      this._handlePreviewPicture(this._name, this._link);
    });
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__button-like_active");
  }

  getView() {
    this._setEventListeners();
    this._cardElement.querySelector(".card__text").textContent = this._name;
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;

    return this._cardElement;
  }

  _getTemplate() {
    console.log("Template selector:", this._cardSelector); // Added log
    const templateElement = document.querySelector(this._cardSelector);
    console.log("Template element:", templateElement); // Added log

    if (templateElement) {
      const cardElement = templateElement.content
        .querySelector(".card")
        .cloneNode(true);
      return cardElement;
    } else {
      throw new Error(
        `Template element with selector ${this._cardSelector} not found.`
      );
    }
  }
}
