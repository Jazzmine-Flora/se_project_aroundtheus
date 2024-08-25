export default class Card {
  constructor(
    data,
    cardSelector,
    handlePreviewPicture,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handlePreviewPicture = handlePreviewPicture;
    this._cardElement = this._getTemplate();
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
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
      this._handleLikeClick(this);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });

    this._cardImageEl.addEventListener("click", () => {
      this._handlePreviewPicture(this._name, this._link);
    });
  }

  // THE REST OF THE CARD CLASS
  setIsLiked(isLiked) {
    this._isLiked = isLiked;
    this.renderLikes();
  }
  renderLikes() {
    if (this._isLiked) {
      this._likeButton.classList.add("card__button-like_active");
    } else {
      this._likeButton.classList.remove("card__button-like_active");
    }
  }

  handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  handleLikeClick() {
    this._likeButton.classList.toggle("card__button-like_active");
  }

  getView() {
    this._setEventListeners();
    this._cardElement.querySelector(".card__text").textContent = this._name;
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    this.renderLikes();
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

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardElement.setAttribute("data-id", this._id); // Ensure data-id is set

    this._cardElement.querySelector(".card__text").textContent = this._name;
    const cardImage = this._element.querySelector(".card__image");
    cardImage.src = this._link;
    cardImage.alt = this._name;

    this._setEventListeners();

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
