export default class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._formEl = formElement;
    this._submitButton = this._formEl.querySelector(this._submitButtonSelector);
    this._inputEls = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );
    // this._inputEls = [...this._formEl.querySelectorAll(this._inputSelector)];
  }

  _showInputError(inputEl) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    if (errorMessageEl) {
      inputEl.classList.add(this._inputErrorClass);
      errorMessageEl.textContent = inputEl.validationMessage;
      errorMessageEl.classList.add(this._errorClass);
    } else {
      console.error(`Element with id ${inputEl.id}-error not found`);
    }
  }
  // inputEl.classList.add(this._inputErrorClass);
  // errorMessageEl.textContent = inputEl.validationMessage;
  // errorMessageEl.classList.add(this._errorClass);

  _hideInputError(inputEl) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    if (errorMessageEl) {
      inputEl.classList.remove(this._inputErrorClass);
      errorMessageEl.textContent = "";
      errorMessageEl.classList.remove(this._errorClass);
    } else {
      console.error(`Element with id ${inputEl.id}-error not found`);
    }
  }
  // inputEl.classList.remove(this._inputErrorClass);
  // errorMessageEl.textContent = "";
  // errorMessageEl.classList.remove(this._errorClass);

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  _hasInvalidInput() {
    return this._inputEls.some((inputEl) => !inputEl.validity.valid);
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _setEventListeners() {
    // this._inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    // this._submitButton = this._form.querySelector(this._submitButtonSelector);

    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    // const inputList = Array.from(
    //   this._formEl.querySelectorAll(this._inputSelector)
    // );
    // inputList.forEach((inputEl) => {
    //   inputEl.addEventListener("input", () => {
    //     this._checkInputValidity(inputEl);
    //   });
    // });
    this._toggleButtonState();
    this._setEventListeners();
  }
  //   this._form.addEventListener("submit", (e) => {
  //     e.preventDefault();
  //   });
  //   this._setEventListeners(this._form, options);
  // }
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
