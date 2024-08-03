import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import PopupWithImages from "../components/PopupWithImages.js";
import Popup from "../components/popup.js";
import UserInfo from "../components/UserInfo.js";

const profileForm = document.querySelector("#profile-edit-modal .modal__form");
const newCardForm = document.querySelector("#profile-add-modal .modal__form");

const validationConfig = {
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// Create instances of FormValidator for each form
const profileFormValidator = new FormValidator(validationConfig, profileForm);
const newCardFormValidator = new FormValidator(validationConfig, newCardForm);

// Enable validation for both forms
profileFormValidator.enableValidation();
newCardFormValidator.enableValidation();

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

const closeAllModals = () => {
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    modal.classList.remove("modal_opened");
  });
};

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const handleProfileFormSubmit = (formData) => {
  userInfo.setUserInfo({ name: formData.title, job: formData.description });
};

const handleAddCardFormSubmit = (data) => {
  const cardElement = createCard({ name: data.title, link: data.url });
  section.addItem(cardElement);
};

const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileFormSubmit
);
editProfilePopup.setEventListeners();

const newCardPopup = new PopupWithForm(
  "#profile-add-modal",
  handleAddCardFormSubmit
);
newCardPopup.setEventListeners();

const popupWithImage = new PopupWithImages("#preview_image_modal");
popupWithImage.setEventListeners();

const modals = [addCardModal, profileEditModal, previewImageModal];
modals.forEach((modal) => {
  modal.addEventListener("click", closePopupByOverlay);
});

profileEditButton.addEventListener("click", () => {
  closeAllModals();
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.job;
  editProfilePopup.open();
});

addNewCardButton.addEventListener("click", () => {
  closeAllModals(); // Ensure all other modals are closed
  newCardPopup.open();
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

// profileEditButton.addEventListener("click", () => {
//   const userData = userInfo.getUserInfo();
//   profileTitleInput.value = userData.name;
//   profileDescriptionInput.value = userData.job;
//   editProfilePopup.open();
// });

function closePopupByPressingESC(evt) {
  if (evt.key === "Escape" || evt.keyCode === 27) {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) {
      closePopup(openedModal);
    }
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
  const cardElement = createCard(cardData);
  cardListEl.prepend(cardElement);
  const cardImageElement = cardElement.querySelector(".card__image");
  cardImageElement.addEventListener("click", () => {
    handleCardClick(cardData.name, cardData.link);
  });
}

/*---*/

previewCloseButton.addEventListener("click", () => {
  closePopup(previewImageModal);
});
/*event handlers*/

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
  openPopup(previewElement);
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleCardClick);
  return card.getView();
}

/*event listeners 1*/

profileModalCloseButton.addEventListener("click", () =>
  closePopup(profileEditModal)
);
profileEditModal.addEventListener("", handleProfileFormSubmit);
addCardModal.addEventListener("", handleAddCardFormSubmit);

profileEditButton.addEventListener("click", () => newCardPopup.open());

/*new code P5*/
addNewCardButton.addEventListener("click", () => openPopup(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  closePopup(addCardModal)
);

const renderer = (cardData) => {
  const cardElement = createCard(cardData);
  section.addItem(cardElement);
};

const section = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      section.addItem(cardElement);
    },
  },
  ".cards__list"
);
section.renderItems();

const userData = userInfo.getUserInfo();
console.log(userData);

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}
/*----*/

initialCards.forEach((item) => renderCard(item, cardListEl));
