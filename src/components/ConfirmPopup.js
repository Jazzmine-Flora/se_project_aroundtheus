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

  open(card) {
    this._card = card;
    super.open();
  }

  setLoadingConfirm(isLoading, text) {
    const modalButton = this._popup.querySelector(".modal__button_delete");
    modalButton.textContent = isLoading ? text : "Yes";
  }
}
