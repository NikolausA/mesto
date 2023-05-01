import {initialCards} from "./cards.js";

const cardTemplate = document.querySelector(".card-template");
const elementsContainer = document.querySelector(".elements__elements-list");
const profilePopup = document.querySelector(".popup_type_profile-edit");
const cardPopup = document.querySelector(".popup_type_add-place");
const imagePopup = document.querySelector(".popup_type_image");

const profilePopupOpenButton = document.querySelector(".profile__info-edit-button");
const cardPopupOpenButton = document.querySelector(".profile__add-new-card-button");
const closeButtons = document.querySelectorAll(".popup__close");

const profilePopupForm = profilePopup.querySelector('form[name="popupForm-profile-edit"]');
const profilePopupInputName = profilePopupForm.querySelector('input[name="name"]');
const profilePopupInputProfession = profilePopupForm.querySelector('input[name="profession"]');
const profileName = document.querySelector(".profile__info-name");
const profileProfession = document.querySelector(".profile__info-profession");
const cardPopupForm = cardPopup.querySelector('form[name="popupForm-add-place"]');
const cardPopupInputName = cardPopupForm.querySelector('input[name="place-name"]');
const cardPopupInputLink = cardPopupForm.querySelector('input[name="link"]');

const popupImage = imagePopup.querySelector('.popup__image');
const popupText = imagePopup.querySelector('.popup__text');

function setDefaultInputValue() {
  profilePopupInputName.value = profileName.textContent;
  profilePopupInputProfession.value = profileProfession.textContent;
}

const handleOpen = (popup) => {
  popup.classList.add('popup_opened');
}

const handleClose = (popup) => {
  popup.classList.remove('popup_opened');
};

const createCardElement = (card) => {
  const cardElement = cardTemplate.content
    .querySelector(".element")
    .cloneNode(true);
  const elementImage = cardElement.querySelector(".element__image");
  const elementTitle = cardElement.querySelector(".element__text");

  elementImage.src = card.link;
  elementImage.alt = card.name;
  elementTitle.textContent = card.name;

  const deleteButton = cardElement.querySelector(".element__trash-sign");
  const likeButton = cardElement.querySelector(".element__heart-sign");

  const handleDelete = () => {
    cardElement.remove();
  };

  const handleLike = () => {
    likeButton.classList.toggle("element__heart-sign_actived");
  };

  elementImage.addEventListener('click', (event) => {
    popupImage.src = event.target.src;
    popupImage.alt = event.target.alt;
    popupText.textContent = event.target.alt;
    handleOpen(imagePopup);
  });
  deleteButton.addEventListener("click", handleDelete);
  likeButton.addEventListener("click", handleLike);

  return cardElement;
};

const renderCard = (cardItem) => {
  elementsContainer.prepend(cardItem);
};

initialCards.forEach((card) => {
  renderCard(createCardElement(card));
});

const handleAddNewPlaceSubmit = (event) => {
  event.preventDefault();
  const name = cardPopupInputName.value;
  const link = cardPopupInputLink.value;
  cardPopupInputName.value = '';
  cardPopupInputLink.value = '';

  const card = {
    name,
    link,
  };

  renderCard(createCardElement(card));

  handleClose(event);
};

const submitProfilePopupForm = (event) => {
  event.preventDefault(event);
  handleClose(profilePopup);
  profileName.textContent = profilePopupInputName.value;
  profileProfession.textContent = profilePopupInputProfession.value;
}

profilePopupOpenButton.addEventListener("click", () => {
  setDefaultInputValue();
  handleOpen(profilePopup);
});
cardPopupOpenButton.addEventListener("click", () => {
  handleOpen(cardPopup);
});
closeButtons.forEach((button) => {
  const buttonsPopup = button.closest('.popup');
  button.addEventListener("click", () => handleClose(buttonsPopup));
});

cardPopupForm.addEventListener("submit", handleAddNewPlaceSubmit);
profilePopupForm.addEventListener("submit", submitProfilePopupForm);
