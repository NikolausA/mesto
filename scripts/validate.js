const setInputValidState = (config, input, errorElement) => {
  input.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
}

const setInputInvalidState = (config, input, errorElement) => {
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = input.validationMessage;
}

const isInputValid = (config, inputElement, formElement) => {
  const inputError = formElement.querySelector(`#error-${inputElement.id}`);

  if (inputElement.validity.valid) {
    setInputValidState(config, inputElement, inputError);
  } else {
    setInputInvalidState(config, inputElement, inputError);
  }
};

const enableButton = (config, button) => {
  button.removeAttribute('disabled');
  button.classList.remove(config.inactiveButtonClass);
};

const disableButton = (config, button) => {
  button.setAttribute('disabled', '');
  button.classList.add(config.inactiveButtonClass);
};

export const toggleButtonState = (config, formElement, button) => {
  if (formElement.checkValidity()) {
    enableButton(config, button);
  } else {
    disableButton(config, button);
  }
};

const setEventListeners = (config, formElement) => {
  const button = formElement.querySelector(config.submitButtonSelector);
  const inputs = Array.from(formElement.querySelectorAll(config.inputSelector));
  toggleButtonState(config, formElement, button);

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      isInputValid(config, input, formElement);
      toggleButtonState(config, formElement, button);
    })
  });
}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(config, formElement);
  })
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 