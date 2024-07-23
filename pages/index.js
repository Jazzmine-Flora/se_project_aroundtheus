import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

document.addEventListener("DOMContentLoaded", () => {
  const formElements = document.querySelectorAll(".modal__form");

  formElements.forEach((form) => {
    const formValidator = new FormValidator(
      {
        inputSelector: ".modal__form-input",
        submitButtonSelector: ".modal__button",
        inactiveButtonClass: "modal__button_disabled",
        inputErrorClass: "popup__input_type_error",
        errorClass: "popup__error_visible",
      },
      form
    );

    formValidator.enableValidation();
  });
});

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
};

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#profile-add-modal");
const previewImageModal = document.querySelector("#preview_image_modal");
const previewImage = document.querySelector("#preview-image");
const previewCloseButton = document.querySelector(
  "#preview_image_modal .modal__close"
);
const previewElement = document.getElementById("preview_image_modal");
const previewImageDescription = document.querySelector(
  ".preview_modal_description"
);
const cardSelector = "#card-template";
const profileModalCloseButton = document.querySelector(
  "#profile-edit-modal .modal__close"
);
const addCardModalCloseButton = document.querySelector(
  "#profile-add-modal .modal__close"
);
const popupCloseButton = document.querySelector(
  ".preview__modal_description .modal__close"
);
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
const cardTitleInput = document.querySelector(".modal__form-input_type_title");
const cardUrlInput = document.querySelector(".modal__form-input_type_url");
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
  // const cardSelector = "#card-template";
  const card = new Card(cardData, cardSelector, handlePreviewPicture);
  const cardElement = card.getView();
  cardListEl.prepend(cardElement);
}

/*---*/

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

function handlePreviewPicture(name, link) {
  console.log("handlePreviewPicture called with:", name, link);
  const previewImage = document.querySelector("#preview-image");
  const previewElement = document.getElementById("preview_image_modal");
  const previewImageDescription = document.querySelector(
    ".preview_modal_description"
  );
  previewImage.src = link;
  previewImage.alt = name;

  previewImageDescription.textContent = name;
  previewElement.classList.add("modal_opened");
}
const card = new Card(cardData, cardSelector, handlePreviewPicture);

/*event listeners 1*/

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

profileModalCloseButton.addEventListener("click", () =>
  closePopup(profileEditModal)
);
profileEditModal.addEventListener("submit", handleProfileEditSubmit);
addCardModal.addEventListener("submit", handleAddCardFormSubmit);

/*new code P5*/
addNewCardButton.addEventListener("click", () => openPopup(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  closePopup(addCardModal)
);

/*----*/

initialCards.forEach((item) => renderCard(item, cardListEl));
