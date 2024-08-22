import Popup from "./Popup.js";
export default class ConfirmPopup extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }

  open(card) {
    this._card = card;
    super.open(this._modal);
  }

  close() {
    super.close(this._modal);
  }

  domDeleteCard() {
    this._card.domDeleteCard();
  }

  setLoadingConfirm(isLoading, text) {
    const modalButton = this._modal.querySelector(".modal__button_delete");
    modalButton.textContent = isLoading ? text : "Save";
  }
}
