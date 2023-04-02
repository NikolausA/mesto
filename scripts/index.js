let popupProfileEdit = document.querySelector('.popup');
let editButton = document.querySelector('.profile__info-edit-button');
let popupClose = document.querySelector('.popup__close');
let popupForm = popupProfileEdit.querySelector('.popup__form');
let popupInputName = popupProfileEdit.querySelector('.popup__input_type_name');
let popupInputProfession = popupProfileEdit.querySelector('.popup__input_type_profession');
let profileName = document.querySelector('.profile__info-name');
let profileProfession = document.querySelector('.profile__info-profession');

function addClass() {
  popupProfileEdit.classList.add('popup_opened');
  popupInputName.value = profileName.textContent;
  popupInputProfession.value = profileProfession.textContent;
}

function removeClass() {
  popupProfileEdit.classList.remove('popup_opened');
}

function submitForm(event) {
  event.preventDefault(event);
  removeClass();
  profileName.textContent = popupInputName.value;
  profileProfession.textContent = popupInputProfession.value;
}

editButton.addEventListener('click', addClass);
popupClose.addEventListener('click', removeClass);
popupForm.addEventListener('submit', submitForm);

