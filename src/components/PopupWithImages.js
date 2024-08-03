import Popup from "./popup.js";

export default class PopupWithImages extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupImage = this._popupElement.querySelector(".modal__image");
    this._popupImageTitle = this._popupElement.querySelector(
      ".preview_modal_description"
    );
  }
  open(data) {
    super.open();
    this._popupImage.src = data.link;
    this._popupImage.alt = data.name;
    this._popupImageTitle.textContent = data.name;
  }
}
