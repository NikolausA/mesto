import {initialCards} from "./cards.js";

const cardTemplate = document.querySelector(".card-template");
const card = document.querySelector(".element");
const elementsContainer = document.querySelector(".elements__elements-list");
const popupProfileEdit = document.querySelector(".popup-profile-edit");
const popupAddNewCard = document.querySelector(".popup-add-place");
const editButton = document.querySelector(".profile__info-edit-button");
const addNewCardButton = document.querySelector(".profile__add-new-card-button");
const popupProfileEditClose = document.querySelector(".popup-profile-edit__close");
const popupAddNewCardClose = document.querySelector(".popup-add-place__close");
const popupImageClose = document.querySelector(".popup-image__close");
const popupProfileEditForm = popupProfileEdit.querySelector(".popup-profile-edit__form");
const addNewCardForm = popupAddNewCard.querySelector(".popup-add-place__form");
const popupInputName = popupProfileEdit.querySelector('input[name="name"]');
const popupInputProfession = popupProfileEdit.querySelector('input[name="profession"]');
const profileName = document.querySelector(".profile__info-name");
const profileProfession = document.querySelector(".profile__info-profession");


function setDefaultInputValue() {
  popupInputName.value = profileName.textContent;
  popupInputProfession.value = profileProfession.textContent;
}

const handleOpen = (event, src = '', text = '') => {
  let elementClass = event.target.className;
  if (elementClass === "element__image") {
    let popup = document.querySelector('.popup-image');
    let popupImage = popup.querySelector('.popup-image__image');
    let popupText = popup.querySelector('.popup-image__text');
    popupImage.src = src;
    popupImage.alt = text;
    popupText.textContent = text;
    popup.classList.add('popup-image_opened');
  } else {
    let attributeData = event.target.getAttribute("data-modal");
    let popup = document.querySelector(`.${attributeData}`);
    popup.classList.add(`${attributeData}_opened`);
    if (attributeData === "popup-profile-edit") setDefaultInputValue();
  }
};

const handleClose = (event) => {
  let popupClass = event.target.className.split("__", 1)[0];
  let popup = document.querySelector(`.${popupClass}`);
  popup.classList.remove(`${popupClass}_opened`);
};

const createCardElement = (card) => {
  const cardElement = cardTemplate.content
    .querySelector(".element")
    .cloneNode(true);
  const elementImage = cardElement.querySelector(".element__image");
  const elementTitle = cardElement.querySelector(".element__text");

  elementImage.src = card.link;
  elementTitle.textContent = card.name;

  const deleteButton = cardElement.querySelector(".element__trash-sign");
  const likeButton = cardElement.querySelector(".element__heart-sign");

  const handleDelete = () => {
    cardElement.remove();
  };

  const handleLike = () => {
    likeButton.classList.toggle("element__heart-sign_actived");
  };

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

  const nameInput = addNewCardForm.querySelector('input[name="place-name"]');
  const linkInput = addNewCardForm.querySelector('input[name="link"]');
  const name = nameInput.value;
  const link = linkInput.value;

  const card = {
    name,
    link,
  };

  renderCard(createCardElement(card));

  handleClose(event);
};

function submitForm(event) {
  event.preventDefault(event);
  handleClose(event);
  profileName.textContent = popupInputName.value;
  profileProfession.textContent = popupInputProfession.value;
}

const images = document.querySelectorAll(".element__image");
images.forEach((image) => {
  image.addEventListener('click', (event) => {
    let src = event.target.src;
    let text = event.target.nextElementSibling.childNodes[1].textContent;
    handleOpen(event, src, text);
  });
});

editButton.addEventListener("click", handleOpen);
addNewCardButton.addEventListener("click", handleOpen);
popupProfileEditClose.addEventListener("click", handleClose);
popupAddNewCardClose.addEventListener("click", handleClose);
popupImageClose.addEventListener('click', handleClose);
addNewCardForm.addEventListener("submit", handleAddNewPlaceSubmit);
popupProfileEditForm.addEventListener("submit", submitForm);
