let popupProfileEdit = document.querySelector('.popup_frofile-edit');
let editButton = document.querySelector('.profile__info-edit-button');
let popupClose = document.querySelector('.popup__close');
let popupForm = popupProfileEdit.querySelector('.popup__form');
let popupInputName = popupProfileEdit.querySelector('.popup__input_type_name');
let popupInputProfession = popupProfileEdit.querySelector('.popup__input_type_profession');


editButton.addEventListener('click', () => {
  popupProfileEdit.classList.add('popup-open');
});

popupClose.addEventListener('click', () => {
  popupProfileEdit.classList.remove('popup-open');
  popupInputName.value = "";
  popupInputProfession.value = "";
});

popupForm.addEventListener('submit', (event) => {
  event.preventDefault();
});