export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  _setInputValidState(config, input, errorElement) {
    input.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
  }

  _setInputInvalidState = (config, input, errorElement) => {
    input.classList.add(config.inputErrorClass);
    errorElement.textContent = input.validationMessage;
  }

  _isInputValid = (config, inputElement, formElement) => {
    const inputError = formElement.querySelector(`#error-${inputElement.id}`);
  
    if (inputElement.validity.valid) {
      this._setInputValidState(config, inputElement, inputError);
    } else {
      this._setInputInvalidState(config, inputElement, inputError);
    }
  };

  _enableButton = (config, button) => {
    button.removeAttribute('disabled');
    button.classList.remove(config.inactiveButtonClass);
  };

  _disableButton = (config, button) => {
    button.setAttribute('disabled', '');
    button.classList.add(config.inactiveButtonClass);
  };

  _toggleButtonState = (config, formElement, button) => {
    if (formElement.checkValidity()) {
      this._enableButton(config, button);
    } else {
      this._disableButton(config, button);
    }
  };

  _setEventListeners() {
    const button = this._formElement.querySelector(this._config.submitButtonSelector);
    const inputs = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._toggleButtonState(this._config, this._formElement, button);

    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._isInputValid(this._config, input, this._formElement);
        this._toggleButtonState(this._config, this._formElement, button);
      })
    });
  }

  enableValidation() {
    this._setEventListeners();
  };

}