import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImages.js";
import Popup from "../components/Popup.js";
import Api from "../components/Api.js";
import UserInfo from "../components/UserInfo.js";
import ConfirmPopup from "../components/ConfirmPopup.js";
import {
  initialCards,
  profileForm,
  newCardForm,
  avatarEditForm,
  validationConfig,
  profileAddButton,
  addCardModal,
  editProfileModal,
  profileTitle,
  profileDescription,
  profileEditForm,
} from "../utils/constants.js";

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

const avatarFormValidator = new FormValidator(validationConfig, avatarEditForm);
avatarFormValidator.enableValidation();
const profileFormValidator = new FormValidator(validationConfig, profileForm);
profileFormValidator.enableValidation();

const newCardFormValidator = new FormValidator(validationConfig, newCardForm);
newCardFormValidator.enableValidation();

const profileEditButton = document.querySelector("#profile-edit-button");
const avatarImage = document.querySelector(".edit_icon");
const submitButtonSelector = document.querySelector(".modal__button");
const addNewCardButton = document.querySelector(".profile__add-button");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardListEl = document.querySelector(".cards__list");

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "acb9f423-9227-4882-a1e0-a6492f6bb248",
    "Content-Type": "application/json",
  },
});

let section;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardData]) => {
    userInfo.setUserInfo(userData);
    section = new Section(
      {
        items: cardData,
        renderer: (cardData) => {
          renderCard(cardData);
        },
      },
      ".cards__list"
    );
    section.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

let user;

// avatar edit modal

const avatarChangeModal = new PopupWithForm(
  "#avatar-modal",
  handleAvatarChangeSubmit
);
avatarChangeModal.setEventListeners();

// ---------------------------------------
const avatarSubmitButton = document.querySelector("#avatar-submit-button");

function handleAvatarChangeSubmit(inputValues) {
  // event.preventDefault();

  // const avatarForm = event.currentTarget;
  const avatarUrl = inputValues.avatar;
  console.log("avatarUrl:", avatarUrl);
  // const avatarUrl = event.target.avatar.value;

  if (avatarUrl) {
    avatarSubmitButton.textContent = "Saving...";
    api

      .updateAvatar(avatarUrl)
      .then((updatedUser) => {
        userInfo.setUserInfo(updatedUser);
        avatarChangeModal.close();
        // this.popupForm.reset();
      })
      .catch((err) => console.error("Error updating avatar:", err))
      .finally(() => {
        avatarSubmitButton.textContent = "Save";
      });
  } else {
    console.error("Avatar URL is not defined");
  }
}

// Event Listener for opening avatar modal
avatarImage.addEventListener("click", () => {
  avatarChangeModal.open();
  avatarFormValidator.toggleButtonState();
});
console.log("User object:", user);

// ----------------------------

// Delete card modal

const deleteModal = document.querySelector("#delete-modal");
const deleteModalCloseButton = document.querySelector("#delete-close-modal");
const deleteConfirmForm = document.querySelector("#delete-confirm-form");
const deleteConfirmModal = new ConfirmPopup(
  "#delete-modal",
  handleCardDeleteSubmit
);
deleteConfirmModal.setEventListeners();

// ----------------------------

// Add event listeners to open the modal when delete button is clicked

function handleDeleteClick(card) {
  deleteConfirmModal.open(card);
}

const deleteSubmitButton = deleteConfirmForm.querySelector(
  "button[type='submit']"
);

function handleCardDeleteSubmit(card) {
  deleteSubmitButton.textContent = "Deleting...";
  const card_id = card._id;
  console.log("Card ID:", card_id); // Debugging log

  api
    .deleteCard(card_id)
    .then((message) => {
      console.log(message);
      deleteConfirmModal.close();
      card.handleDeleteClick(); // Assuming this method exists to remove the card from the DOM
    })
    .catch((error) => {
      console.error("Error deleting card:", error);
    })
    .finally(() => {
      deleteSubmitButton.textContent = "Yes"; // Reset button text after completion
    });
}

// ----------------------------

// like button
// Function to handle like click

function findCardById(cardId) {
  return initialCards.find((card) => card._id === cardId || card.id === cardId);
}
function handleLikeClick(cardData) {
  if (cardData._isLiked) {
    api
      .removeLike(cardData._id)
      .then((updatedCard) => {
        cardData.setLike(false); // Update local like status
      })
      .catch((err) => console.log(err));
  } else {
    api
      .addLike(cardData._id)
      .then((updatedCard) => {
        cardData.setLike(true); // Update local like status
      })
      .catch((err) => console.log(err));
  }
}

// Function to update card likes in the UI
function updateCardLikes(cardId, likes) {
  const cardElement = document.querySelector(`.card[data-id="${cardId}"]`);
  console.log("cardElement:", cardElement); // Log cardElement

  if (cardElement === null) {
    console.error(`Card element not found for id: ${cardId}`);
    return;
  }
  const likeCountElement = cardElement.querySelector(".card__like-count");

  likeCountElement.textContent = likes.length;

  const likeButton = cardElement.querySelector(".card__button-like");
  if (likes.some((user) => user._id === currentUser._id)) {
    likeButton.classList.add("card__button-like_active");
  } else {
    likeButton.classList.remove("card__button-like_active");
  }
}

// ----------------------------

const profileSubmitButton = document.querySelector("#profile-submit-button");

function handleProfileFormSubmit(data) {
  profileSubmitButton.textContent = "Saving...";

  const formData = new FormData(profileForm);

  const formValues = {
    name: data.title,
    about: data.description,
    avatar: data.avatar,
    // name: formData.get("title"),
    // about: formData.get("description"),
    // avatar: formData.get("avatar"),
  };

  api
    .setUserInfo(formValues)
    .then((data) => {
      userInfo.setUserInfo({
        name: data.name,
        about: data.about,
        avatar: data.avatar,
      });
      editProfilePopup.close();
    })
    .catch((error) => console.error("Error updating profile:", error))
    .finally(() => {
      profileSubmitButton.textContent = "Save";
    });
}

// ----------------------------
const addCardSubmitButton = document.querySelector("#add-card-submit-button");

function handleAddCardFormSubmit(data) {
  addCardSubmitButton.textContent = "Saving...";
  const inputValues = {
    title: data.title,
    url: data.url,
  };

  const addCardForm = document.querySelector("#add-card-form");
  const title = inputValues.title;
  const url = inputValues.url;

  // const cardData = {
  //   title: title,
  //   url: url,
  // };

  api
    .addCard(inputValues)
    .then((card) => {
      renderCard(card);
      newCardPopup.close();
      // this._popupForm.reset();
      newCardFormValidator.toggleButtonState();
    })
    .catch((error) => console.error("Error adding card:", error))
    .finally(() => {
      addCardSubmitButton.textContent = "Create";
    });
}

// ----------------------------

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
  section.addItem(cardElement);
}

/*---*/

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleCardClick,
    handleDeleteClick,
    handleLikeClick
  );
  return card.getView();
}

/*event listeners 1*/

function handleCardClick(name, link) {
  popupWithImage.open({ name, link });
}
