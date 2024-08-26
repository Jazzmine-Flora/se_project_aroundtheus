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
  profileFormValidator,
  newCardFormValidator,
  // avatarFormValidator,
  validationConfig,
  profileAddButton,
  addCardModal,
  editProfileModal,
  profileTitle,
  profileDescription,
  profileEditForm,
  userInfo,
} from "../utils/constants.js";

const avatarFormValidator = new FormValidator(validationConfig, avatarEditForm);
avatarFormValidator.enableValidation();

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
        this._popupForm.reset();
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

let cardToDelete = null;

// Add event listeners to open the modal when delete button is clicked

function handleDeleteClick(card) {
  deleteConfirmModal.open(card);
  // cardToDelete = card;
}

const deleteSubmitButton = deleteConfirmForm.querySelector(
  "button[type='submit']"
);

function handleCardDeleteSubmit(card) {
  // deleteSubmitButton.textContent = "Deleting...";
  const card_id = card._id;
  console.log("Card ID:", card_id); // Debugging log

  api
    .deleteCard(card_id)
    .then((message) => {
      console.log(message);
      deleteConfirmModal.close();
      card.handleDeleteClick(); // Assuming this method exists to remove the card from the DOM
      deleteSubmitButton.textContent = "Deleting...";
    })
    .catch((error) => {
      console.error("Error deleting card:", error);
    })
    .finally(() => {
      deleteSubmitButton.textContent = "Yes"; // Reset button text after completion
    });
}

// deleteConfirmForm.addEventListener("submit", (event) => {
//   // event.preventDefault();
//   if (cardToDelete) {
//     handleCardDeleteSubmit(cardToDelete);
//     deleteModal.style.display = "none";
//     cardToDelete = null;
//   }
// });

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
        // updateCardLikes(cardData._id, updatedCard.likes); // Update UI with new like count
        // cardData.renderLikes();
      })
      .catch((err) => console.log(err));
  } else {
    api
      .addLike(cardData._id)
      .then((updatedCard) => {
        cardData.setLike(true); // Update local like status
        // updateCardLikes(cardData._id, updatedCard.likes);
        // cardData.renderLikes(); // Update UI with new like count
      })
      .catch((err) => console.log(err));
  }
  // cardData.renderLikes();
}

// Function to update card likes in the UI
function updateCardLikes(cardId, likes) {
  const cardElement = document.querySelector(`.card[data-id="${cardId}"]`); // Make sure card elements have data-id attribute
  console.log("cardElement:", cardElement); // Log cardElement

  // Check if cardElement is found
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

// // // Attach event listeners to like buttons
// document.addEventListener("click", (event) => {
//   if (event.target.classList.contains(".card__button-like")) {
//     const cardElement = event.target.closest(".card");
//     const cardId = cardElement.dataset.id;
//     console.log("Like button clicked for card ID: ", cardId);
//     const cardData = findCardById(cardId);
//     console.log("Like button clicked for card ID:", cardId); // Debugging log
//     console.log("Card data for like:", cardData);

//     handleLikeClick(cardData);
//   }
// });

// ----------------------------

const profileSubmitButton = document.querySelector("#profile-submit-button");

function handleProfileFormSubmit(event) {
  // event.preventDefault();
  profileSubmitButton.textContent = "Saving...";

  const formData = new FormData(profileForm);

  const formValues = {
    name: formData.get("title"),
    about: formData.get("description"),
  };

  api
    .setUserInfo(formValues)
    .then((data) => {
      userInfo.setUserInfo({ name: data.name, job: data.about });
      editProfilePopup.close();
      this._popupForm.reset();
    })
    .catch((error) => console.error("Error updating profile:", error))
    .finally(() => {
      profileSubmitButton.textContent = "Save";
    });
}

// profileForm.addEventListener("submit", handleProfileFormSubmit);

// ----------------------------
const addCardSubmitButton = document.querySelector("#add-card-submit-button");

function handleAddCardFormSubmit(event) {
  // event.preventDefault();
  addCardSubmitButton.textContent = "Saving...";

  const addCardForm = document.querySelector("#add-card-form");
  const title = addCardForm.elements.title.value;
  const url = addCardForm.elements.url.value;

  const cardData = {
    title: title,
    url: url,
  };

  // const cardData = {
  //   title: event.target.title.value,
  //   url: event.target.url.value,
  // };

  api
    .addCard(cardData)
    .then((card) => {
      renderCard({ name: card.name, link: card.link });
      newCardPopup.close();
      this._popupForm.reset();
    })
    .catch((error) => console.error("Error adding card:", error))
    .finally(() => {
      addCardSubmitButton.textContent = "Create";
    });
}

// document
//   .querySelector("#add-card-form")
//   .addEventListener("submit", handleAddCardFormSubmit);

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

// fetching user info
async function getUserInfo() {
  try {
    const response = await fetch(
      "https://around-api.en.tripleten-services.com/v1/users/me",
      {
        method: "GET",
        headers: {
          Authorization: "acb9f423-9227-4882-a1e0-a6492f6bb248",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();
    console.log(data);

    //     // Update HTML elements based on the received data
    document.querySelector(".name").textContent = data.name;
    document.querySelector(".about").textContent = data.about;
    document.querySelector(".avatar").src = data.avatar;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

getUserInfo();
