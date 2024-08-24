export default class Card {
  constructor(data, cardSelector, handlePreviewPicture, handleDeleteClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handlePreviewPicture = handlePreviewPicture;
    this._cardElement = this._getTemplate();
    this._handleDeleteClick = handleDeleteClick;
    this._id = data._id;
    this._likes = data.likes;
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
      this._handleDeleteClick(this);
    });

    this._cardImageEl.addEventListener("click", () => {
      this._handlePreviewPicture(this._name, this._link);
    });
  }

  handleDeleteCard() {
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

    // const likeCountElement =
    //   this._cardElement.querySelector(".card__like-count");
    // // likeCountElement.textContent = this._likes.length;
    // if (this._likes.some((user) => user._id === currentUserId)) {
    //   this._likeButton.classList.add("card__button-like_active");
    // } else {
    //   this._likeButton.classList.remove("card__button-like_active");
    // }

    return this._cardElement;
  }

  domDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  // _handleDeleteClick(cardId) {
  //   this._deleteButton.disabled = true;
  //   this._deleteButton.textContent = "Deleting...";
  //   this._api
  //     .deleteCard(cardId)
  //     .then(() => {
  //       this.domDeleteCard();
  //     })
  //     .catch(() => {
  //       this._deleteButton.disabled = false;
  //       this._deleteButton.textContent = "Delete";
  //     });
  // }

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
