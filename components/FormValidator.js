export default class FormValidator {

    constructor(settings, formEl) {
      this._inputSelector = settings.inputSelector;
      this._submitButtonSelector = settings.submitButtonSelector;
      this._inactiveButtonClass = settings.inactiveButtonClass;
      this._inputErrorClass = settings.inputErrorClass;
      this._errorClass = settings.errorClass;
      this._form = formEl;

    };

    _showInputError(inputEl) {
    const errorMessageEl = this._.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
    };

    _toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {

        if (hasInvalidInput(this._inputEls)) {
          this._submitButton.classList.add(this._inactiveButtonClass);
          this._submitButton.disabled = true;
          return;
        }
      
        this._submitButton.classList.remove(this._inactiveButtonClass);
        this._submitButton.disabled = false;
      };
    
    _hasInvalidInput() {
     

    };

    _checkInputValidity() {

    };


    _setEventListeners() {
     this._inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);

    inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(this._form, inputEl, options);
      toggleButtonState(inputEls, submitButton, options);
    });
  });
    };

    enableValidation() {
     
        this._form.addEventListener("submit", (e) => {
            e.preventDefault();
          });
          setEventListeners(formEl, options);
    };

};

// const settings {
//   formSelector: ".modal__form",
//   inputSelector: ".modal__form-input",
//   submitButtonSelector: ".modal__button",
//   inactiveButtonClass: "modal__button_disabled",
//   inputErrorClass: "popup__input_type_error",
//   errorClass: "popup__error_visible",
    
// }

const editFormValidator = new FormValidator();
editFormValidator.enableValidation();
// const addFormValidator = new FormValidator(settings, addForm);