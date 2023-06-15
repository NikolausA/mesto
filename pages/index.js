import {initialCards} from "../utils/initialCards.js";
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import Section from '../components/Section.js';
import {enableValidation as config} from "../utils/configValidation.js";


const cardTemplate = document.querySelector(".card-template");
const elementsContainer = document.querySelector(".elements__elements-list");
const profilePopup = document.querySelector(".popup_type_profile-edit");
const cardPopup = document.querySelector(".popup_type_add-place");
const imagePopup = document.querySelector(".popup_type_image");
const popupList = document.querySelectorAll(".popup");

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

const setPopupImageAttributes = (link, name, popup) => {
  popupImage.src = link;
  popupImage.alt = name;
  popupText.textContent = name;
  openPopup(popup);
};

const profileFormvalidator = new FormValidator(config, profilePopupForm);
profileFormvalidator.enableValidation();

const cardFormvalidator = new FormValidator(config, cardPopupForm);
cardFormvalidator.enableValidation();

const openPopup = (popup) => {
  cardFormvalidator.resetValidation();

  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc)
};

const handleClose = (popup) => {
  document.removeEventListener('keydown', closeByEsc)
  popup.classList.remove('popup_opened');
  cardFormvalidator.resetValidation();
  profileFormvalidator.resetValidation();
};

const closeByEsc = (e) => {
  if (e.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    handleClose(openedPopup);
  }
};

// const renderCard = (cardItem) => {
//   elementsContainer.prepend(cardItem);
// };

// const createCard = (object, el, popup, func) => {
//   const cardObj = new Card(object, el, popup, func);
//   return cardObj.generateCard();
// };

// initialCards.forEach((item) => {
//     renderCard(createCard(item, '.element', imagePopup, setPopupImageAttributes));
//   });

const cardList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const card = new Card(cardItem, '.element');
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, elementsContainer);  

cardList.renderItems();


const handleAddNewPlaceSubmit = (e) => {
  e.preventDefault();
  const name = cardPopupInputName.value;
  const link = cardPopupInputLink.value;
  cardPopupInputName.value = '';
  cardPopupInputLink.value = '';

  const card = {
    name,
    link,
  };

  const createdCard = new Card(card, '.element');
    const cardElement = createdCard.generateCard();
    cardList.addItem(cardElement);

  // renderCard(createCard(card, '.element', imagePopup, setPopupImageAttributes));

  handleClose(cardPopup);
};

const submitProfilePopupForm = (event) => {
  event.preventDefault(event);
  
  profileName.textContent = profilePopupInputName.value;
  profileProfession.textContent = profilePopupInputProfession.value;

  handleClose(profilePopup);
}

profilePopupOpenButton.addEventListener("click", () => {
  setDefaultInputValue();
  openPopup(profilePopup);
});
cardPopupOpenButton.addEventListener("click", () => {
  openPopup(cardPopup);
});
closeButtons.forEach((button) => {
  const buttonsPopup = button.closest('.popup');
  button.addEventListener("click", () => handleClose(buttonsPopup));
});

popupList.forEach((popup) => {
  popup.addEventListener('click', (e) => {
    if (e.currentTarget === e.target) {
      handleClose(popup);
    }  
  });
  
});

cardPopupForm.addEventListener("submit", handleAddNewPlaceSubmit);
profilePopupForm.addEventListener("submit", submitProfilePopupForm);

