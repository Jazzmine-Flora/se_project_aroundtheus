import Popup from "./Popup.js";
export default class ConfirmPopup extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._card);
    });
  }

  // document.querySelectorAll(".card__delete-button").forEach((button) => {
  //   button.addEventListener("click", (event) => {
  //     event.preventDefault();
  //     deleteModal.style.display = "block";
  //     cardToDelete = event.target.closest(".card");
  //   });
  // });

  // // Add event listener to close the modal
  // deleteModalCloseButton.addEventListener("click", () => {
  //   deleteModal.style.display = "none";
  //   cardToDelete = null;
  // });

  // deleteConfirmForm.addEventListener("submit", (event) => {
  //   event.preventDefault();

  //   if (cardToDelete) {
  //     deleteSubmitButton.textContent = "Deleting...";

  //     handleDeleteClick(cardToDelete);
  //     deleteModal.style.display = "none";
  //     cardToDelete = null;
  //   }
  // });

  open(card) {
    this._card = card;
    super.open();
  }

  setLoadingConfirm(isLoading, text) {
    const modalButton = this._popup.querySelector(".modal__button_delete");
    modalButton.textContent = isLoading ? text : "Yes";
  }
}
