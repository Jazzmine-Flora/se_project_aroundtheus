import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImages.js";
import Popup from "../components/Popup.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  profileForm,
  newCardForm,
  profileFormValidator,
  newCardFormValidator,
  validationConfig,
  profileAddButton,
  addCardModal,
  editProfileModal,
  profileTitle,
  profileDescription,
  profileEditForm,
} from "../utils/constants.js";

const profileEditButton = document.querySelector("#profile-edit-button");
// //
// /*new code p5*/
const addNewCardButton = document.querySelector(".profile__add-button");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardListEl = document.querySelector(".cards__list");
// export const profileForm = document.querySelector(
//   "#profile-edit-modal .modal__form"
// );

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const handleProfileFormSubmit = (formData) => {
  userInfo.setUserInfo({ name: formData.title, job: formData.description });
  editProfilePopup.close();
  profileForm.reset();
};

const handleAddCardFormSubmit = (data) => {
  const cardElement = createCard({ name: data.title, link: data.url });
  section.addItem(cardElement);
  newCardForm.reset();
  newCardPopup.close();
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

const popupWithImage = new PopupWithImage("#preview_image_modal");
popupWithImage.setEventListeners();

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.job;

  editProfilePopup.open();
});

addNewCardButton.addEventListener("click", () => {
  newCardPopup.open();
});

function renderCard(cardData, cardListEl) {
  section.renderItems();
}

/*---*/

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleCardClick);
  return card.getView();
}

/*event listeners 1*/

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

function handleCardClick(name, link) {
  popupWithImage.open({ name, link });
}
