export default class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formEl;
    this._submitButton = formEl.querySelector(this._submitButtonSelector);
    this._inputEls = [...formEl.querySelectorAll(this._inputSelector)];
  }

  _showInputError(inputEl) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  _toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
    if (hasInvalidInput(this._inputEls)) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
      return;
    }

    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _hasInvalidInput() {
    return this._inputEls.some((inputEl) => !inputEl.validity.valid);
  }

  _checkInputValidity(formEl, inputEl, options) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _setEventListeners(formEl, options) {
    this._inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);

    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(this._form, inputEl, options);
        this._toggleButtonState(this_inputEls, submitButton, options);
      });
    });
  }

  enableValidation(options) {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners(this._form, options);
  }
}

// const settings {
//   formSelector: ".modal__form",
//   inputSelector: ".modal__form-input",
//   submitButtonSelector: ".modal__button",
//   inactiveButtonClass: "modal__button_disabled",
//   inputErrorClass: "popup__input_type_error",
//   errorClass: "popup__error_visible",

// }

// const editFormValidator = new FormValidator();
// editFormValidator.enableValidation();
// const addFormValidator = new FormValidator(settings, addForm);
