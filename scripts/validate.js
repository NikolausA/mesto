const setInputValidState = (config, input, errorElement) => {
  input.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
}

const setInputInvalidState = (config, input, errorElement) => {
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = input.validationMessage;
}

const showInputError = (config) => {
  element.classList.add(config.inputErrorClass);
};

const hideInputError = (config) => {
  element.classList.remove(config.inputErrorClass);
};

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

const toggleButtonState = (config, formElement) => {
  const button = formElement.querySelector(config.submitButtonSelector);
  if (formElement.checkValidity()) {
    enableButton(config, button);
  } else {
    disableButton(config, button);
  }
};

const setSubmitListener = (config, formElement) => {
  formElement.addEventListener('submit', (e) => {
    e.preventDefualt();
  });
  
  toggleButtonState(config, formElement);
}

const setEventListeners = (config, formElement) => {
  const inputs = Array.from(formElement.querySelectorAll(config.inputSelector));
  toggleButtonState(config, formElement);

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      isInputValid(config, input, formElement);
      toggleButtonState(config, formElement);
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