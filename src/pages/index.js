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
  avatarFormValidator,
  validationConfig,
  profileAddButton,
  addCardModal,
  editProfileModal,
  profileTitle,
  profileDescription,
  profileEditForm,
  userInfo,
} from "../utils/constants.js";

const profileEditButton = document.querySelector("#profile-edit-button");
const avatarImage = document.querySelector(".edit_icon");
const submitButtonSelector = document.querySelector(".modal__button");

const addNewCardButton = document.querySelector(".profile__add-button");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardListEl = document.querySelector(".cards__list");

// const userInfo = new UserInfo({
//   nameSelector: ".profile__title",
//   jobSelector: ".profile__description",
// });

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
      section = new Section(
        {
          items: cardData,
          renderer: renderCard,
        },
        cardListEl
      );
      section.renderItems();
    }
  })
  .catch((err) => console.log("Error loading cards:", err));

let user;

api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo(userData);
  })
  .catch((err) => {
    console.log(err);
  });

// avatar edit modal

const avatarChangeModal = new PopupWithForm(
  "#avatar-modal",
  handleAvatarChangeSubmit
);
avatarChangeModal.setEventListeners();

function handleAvatarChangeSubmit(inputValues) {
  const avatarUrl = inputValues.avatar;
  console.log("Avatar URL:", avatarUrl);

  if (avatarUrl) {
    api
      .updateAvatar(avatarUrl)
      .then((updatedUser) => {
        console.log("Updated user:", updatedUser);
        userInfo.setUserInfo(updatedUser);
        avatarChangeModal.close();
      })
      .catch((err) => {
        console.error("Error updating avatar:", err);
      });
  } else {
    console.error("Avatar URL is not defined");
  }

  submitButtonSelector.textContent = "Saving";
}

// Event Listener for opening avatar modal
avatarImage.addEventListener("click", () => {
  submitButtonSelector.textContent = "Save";
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
document.querySelectorAll(".card__delete-button").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    deleteModal.style.display = "block";
    cardToDelete = event.target.closest(".card");
  });
});

// Add event listener to close the modal
deleteModalCloseButton.addEventListener("click", () => {
  deleteModal.style.display = "none";
  cardToDelete = null;
});

deleteConfirmForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (cardToDelete) {
    const cardId = cardToDelete._data.id;

    handleDeleteClick(cardToDelete);
    deleteModal.style.display = "none";
    cardToDelete = null;
  }
});

function handleDeleteClick(card) {
  deleteConfirmModal.open(card);
}

function handleCardDeleteSubmit(cardId) {
  api.deleteCard(cardId).then((message) => {
    console.log(message);
    deleteConfirmModal.close();
  });
}

// ----------------------------

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
  section.addItem(cardElement);
}

/*---*/

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleCardClick,
    handleDeleteClick
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

    // Update HTML elements based on the received data
    document.querySelector(".name").textContent = data.name;
    document.querySelector(".about").textContent = data.about;
    document.querySelector(".avatar").src = data.avatar;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

getUserInfo();
