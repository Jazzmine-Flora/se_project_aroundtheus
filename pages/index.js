import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js"
//new from git
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  // name: "Lake Louise",
  // link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  // name: "Bald Mountains",
  // link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  // name: "Latemar",
  // link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  // name: "Vanoise National Park",
  // link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  // name: "Lago di Braies",
  // link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
}

const card = new Card (cardData, "#card-template");
card.getView();

// console.log(initialCards);

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#profile-add-modal");
const previewImageModal = document.querySelector("#preview_image_modal");
const previewImage = document.querySelector("#preview-image");
const previewCloseButton = previewImageModal.querySelector(".modal__close");
const previewImageDescription = document.querySelector(
  ".preview_modal_description"
);

const profileModalCloseButton = profileEditModal.querySelector(".modal__close");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
/*new code p5*/
const addNewCardButton = document.querySelector(".profile__add-button");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const profileAddForm = addCardModal.querySelector(".modal__form");
const cardTitleInput = profileAddForm.querySelector(
  ".modal__form-input_type_title"
);
const cardUrlInput = profileAddForm.querySelector(
  ".modal__form-input_type_url"
);
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const modals = [addCardModal, profileEditModal, previewImageModal];
modals.forEach((modal) => {
  modal.addEventListener("click", closePopupByOverlay);
});

function closePopupByPressingESC(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    closePopup(modal);
  }
}

function closePopupByOverlay(evt) {
  if (evt.target.classList.contains("modal")) {
    closePopup(evt.target);
  }
}

/*functions*/

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closePopupByPressingESC);
}
/*new code p5*/
function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closePopupByPressingESC);
}

function renderCard(cardData, cardListEl) {
  // const card = new Card(data, cardSelector);
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
}

// const cardSelector = "#card-template";

/*---*/
const validationSettings = {
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const editFormElement = profileEditForm.querySelector(".modal__form");
const addFormElement = profileAddForm.querySelector(".modal__form");
// console.log(profileEditForm);
// console.log(profileAddForm);
const editFormValidator = new FormValidator(validationSettings, profileEditForm);
const addFormValidator = new FormValidator(validationSettings, profileAddForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__text");
  const likeButton = cardElement.querySelector(".card__button-like");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__button-like_active");
  });
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImageEl.addEventListener("click", () => {
    previewImage.src = cardData.link;
    previewImage.alt = cardData.name;
    previewImageDescription.textContent = cardData.name;

    openPopup(previewImageModal);
    console.log("clicks");
  });
  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;

  return cardElement;
  // code goes here
}
previewCloseButton.addEventListener("click", () => {
  closePopup(previewImageModal);
});
/*event handlers*/

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  e.target.reset();
  closePopup(addCardModal);
}

/*event listeners 1*/

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

profileModalCloseButton.addEventListener("click", () =>
  closePopup(profileEditModal)
);
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
profileAddForm.addEventListener("submit", handleAddCardFormSubmit);

/*new code P5*/
addNewCardButton.addEventListener("click", () => openPopup(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  closePopup(addCardModal)
);

/*----*/

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));