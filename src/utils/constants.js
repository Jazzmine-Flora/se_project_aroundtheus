import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";

export const profileForm = document.querySelector(
  "#profile-edit-modal .modal__form"
);
export const newCardForm = document.querySelector(
  "#profile-add-modal .modal__form"
);

export const validationConfig = {
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
export const avatarEditModal = document.querySelector("#avatar-modal");
export const avatarEditForm = avatarEditModal.querySelector("#avatar-form");

// Create instances of FormValidator for each form
export const profileFormValidator = new FormValidator(
  validationConfig,
  profileForm
);
export const newCardFormValidator = new FormValidator(
  validationConfig,
  newCardForm
);

// Enable validation for both forms
profileFormValidator.enableValidation();
newCardFormValidator.enableValidation();
// avatarFormValidator.enableValidation();

export const profileEditButton = document.querySelector("#profile-edit-button");
//
/*new code p5*/
export const addNewCardButton = document.querySelector(".profile__add-button");
export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
export const cardListEl = document.querySelector(".cards__list");

export const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

export const initialCards = [
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
