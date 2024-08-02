import Popup from "./popup.js";

class PopupWithImages extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
  }
  open(data) {
    super.open();
  }
}
