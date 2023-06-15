export class Card {
  constructor(card, templateSelector) {
    this._name = card.name;
    this._link = card.link;
    this._templateSelector = templateSelector;
  }

  _createCardElement() {
    const cardElement = document.querySelector('.card-template').content 
    .querySelector(this._templateSelector)
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._createCardElement();
    this._cardImage = this._element.querySelector('.element__image');
    this._cardText = this._element.querySelector('.element__text');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardText.textContent = this._name;

    return this._element;
  }

}

// constructor(card, templateSelector, popup, setPopupImageAttributes) {
//     this._name = card.name;
//     this._link = card.link;
//     this._templateSelector = templateSelector;
//     this._popup = popup;
//     this._setPopupImageAttributes = setPopupImageAttributes;
//   }

//   _createCardElement() {
//     const cardElement = document.querySelector(".card-template").content 
//     .querySelector(this._templateSelector)
//     .cloneNode(true);

//     return cardElement;
//   }

//   generateCard() {
//     this._element = this._createCardElement();
//     this._cardImage = this._element.querySelector('.element__image');
//     this._cardText = this._element.querySelector('.element__text');
//     this._likeButton = this._element.querySelector('.element__heart-sign');
//     this._trashButton = this._element.querySelector('.element__trash-sign');

//     this._setEventListeners();

//     this._cardImage.src = this._link;
//     this._cardImage.alt = this._name;
//     this._cardText.textContent = this._name;

//     return this._element;
//   }

//   _setEventListeners() {
//     this._likeButton.addEventListener('click', () => {
//       this._handleLike();
//     });
//     this._trashButton.addEventListener('click', () => {
//       this._handleDelete();
//     });
//     this._cardImage.addEventListener('click', () => {
//       this._setPopupImageAttributes(this._link, this._name, this._popup);
//     });
//   }

//   _handleLike() {
//     this._likeButton.classList.toggle("element__heart-sign_actived");
//   }

//   _handleDelete() {
//     this._element.remove();
//     this._element = null;
//   }