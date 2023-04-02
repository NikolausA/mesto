let popupProfileEdit = document.querySelector('.popup');
let editButton = document.querySelector('.profile__info-edit-button');
let popupClose = document.querySelector('.popup__close');
let popupForm = popupProfileEdit.querySelector('.popup__form');
let popupInputName = popupProfileEdit.querySelector('.popup__input_type_name');
let popupInputProfession = popupProfileEdit.querySelector('.popup__input_type_profession');

editButton.addEventListener('click', addClass)

popupClose.addEventListener('click', removeClass);

popupForm.addEventListener('submit', submitForm);

function addClass() {
  popupProfileEdit.classList.add('popup_opened');
  popupInputName.value = document.querySelector('.profile__info-name').textContent;
  popupInputProfession.value = document.querySelector('.profile__info-profession').textContent;
}

function removeClass() {
  popupProfileEdit.classList.remove('popup_opened');
}

function submitForm(event) {
  event.preventDefault(event);
  popupProfileEdit.classList.remove('popup_opened');
  document.querySelector('.profile__info-name').textContent = popupInputName.value;
  document.querySelector('.profile__info-profession').textContent = popupInputProfession.value;
}