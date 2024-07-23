export default class Card {
  constructor(data, cardSelector, handlePreviewPicture) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handlePreviewPicture = handlePreviewPicture;
    // this._cardElement = this._cardElement(data);
    // this._setEventListeners();

    // this.previewImage = document.querySelector("#preview-image");
    // this._previewElement = document.getElementById("preview_image_modal");
    // this._previewImageDescription = document.querySelector(
    //   ".preview_modal_description"
    // );
    // console.log("Preview title:", this._previewImageDescription);
  }

  _setEventListeners() {
    // ".card__button-like"
    this._cardElement
      .querySelector(".card__button-like")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    // ".card__delete-button"
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handlePreviewPicture(this._name, this._link);
      });
  }

  // _handlePreviewPicture() {
  //   if (typeof this._handlePreviewPicture === "function") {
  //     this._handlePreviewPicture(this.link);
  //   }
  // }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__button-like")
      .classList.toggle("card__button-like_active");
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._setEventListeners();
    this._cardElement.querySelector(".card__text").textContent = this._name;
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__image").alt = this._name;

    // this._cardImageEl = this._cardElement.querySelector(".card__image");
    // this._cardTitleEl = this._cardElement.querySelector(".card__text");
    this._likeButton = this._cardElement.querySelector(".card__button-like");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    // this._cardTitleEl.textContent = this._name;
    // this._cardImageEl.src = this._link;
    // this._cardImageEl.alt = this._name;
    // get card view

    return this._cardElement;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }
}
