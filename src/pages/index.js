import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImages.js";
import Popup from "../components/Popup.js";
import Api from "../components/Api.js";
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

// /*new code p5*/
const addNewCardButton = document.querySelector(".profile__add-button");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardListEl = document.querySelector(".cards__list");

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "dd59f422-ba26-4124-9867-97b1d68768e4",
    "Content-Type": "application/json",
  },
});

let Section;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardData]) => {
    userInfo.setUserInfo(userData);
    Section = new Section(
      {
        items: cardData,
        renderer: (cardData) => {
          renderCard(cardData);
        },
      },
      ".cards__list"
    );
    Section.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

// const cardSection = new Section(
//   {
//     items: initialCards,
//     renderer: (cardData) => {
//       renderCard(cardData);
//     },
//   },
//   ".cards__list"
// );
// cardSection.renderItems();

api
  .getInitialCards()
  .then((cardData) => {
    if (cardData) {
      Section = new Section(
        {
          items: cardData,
          renderer: renderCard,
        },
        cardListEl
      );
      Section.renderItems();
    }
  })
  .catch((err) => console.log("Error loading cards:", err));

const handleProfileFormSubmit = (formData) => {
  userInfo.setUserInfo({ name: formData.title, job: formData.description });
  profileForm.reset();
  editProfilePopup.close();
};

const handleAddCardFormSubmit = (data) => {
  renderCard({ name: data.title, link: data.url });
  newCardForm.reset();
  newCardPopup.close();
  newCardFormValidator.toggleButtonState();
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
  const cardElement = createCard(cardData);
  Section.addItem(cardElement);
}

/*---*/

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleCardClick);
  return card.getView();
}

/*event listeners 1*/

// const section = new Section(
//   {
//     items: initialCards,
//     renderer: (cardData) => {
//       renderCard(cardData);
//     },
//   },
//   ".cards__list"
// );
// section.renderItems();

function handleCardClick(name, link) {
  popupWithImage.open({ name, link });
}
