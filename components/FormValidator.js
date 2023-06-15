export class FormValidator {
  
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._button = this._formElement.querySelector(this._config.submitButtonSelector);
    this._inputs = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
  }
  

  _setInputValidState(input) {
    input.classList.remove(this._config.inputErrorClass);
    this._inputError.textContent = '';
  }

  _setInputInvalidState = (input) => {
    input.classList.add(this._config.inputErrorClass);
    this._inputError.textContent = input.validationMessage;
  }

  _isInputValid = (input) => {
    this._inputError = this._formElement.querySelector(`#error-${input.id}`);
  
    if (input.validity.valid) {
      this._setInputValidState(input);
    } else {
      this._setInputInvalidState(input);
    }
  };

  _enableButton = () => {
    this._button.removeAttribute('disabled');
    this._button.classList.remove(this._config.inactiveButtonClass);
  };

  _disableButton = () => {
    this._button.setAttribute('disabled', '');
    this._button.classList.add(this._config.inactiveButtonClass);
  };

  _toggleButtonState = () => {
    if (this._formElement.checkValidity()) {
      this._enableButton();
    } else {
      this._disableButton();
    }
  };

  _setEventListeners() {
    this._toggleButtonState();

    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._isInputValid(input);
        this._toggleButtonState();
      })
    });
  }

  _hideInputError(input) {
    input.value = '';
    input.classList.remove(this._config.inputErrorClass);
    this._formElement.querySelector(`#error-${input.id}`).textContent = '';
  }

  enableValidation() {
    this._setEventListeners();
  };

  resetValidation() {
    this._toggleButtonState();

    this._inputs.forEach((input) => {
      this._hideInputError(input)
    });

  }

}