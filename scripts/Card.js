export class Card {
  constructor(card, templateSelector, popup, openPopup, setPopupImageAttributes) {
    this._name = card.name;
    this._link = card.link;
    this._templateSelector = templateSelector;
    this._popup = popup;
    this._openPopup = openPopup;
    this._setPopupImageAttributes = setPopupImageAttributes;
  }

  _createCardElement() {
    const cardElement = document.querySelector(".card-template").content 
    .querySelector(this._templateSelector)
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._createCardElement();
    this._setEventListeners();

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__text').textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__heart-sign').addEventListener('click', () => {
      this._handleLike();
    });
    this._element.querySelector('.element__trash-sign').addEventListener('click', () => {
      this._handleDelete();
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._setPopupImageAttributes(this._link, this._name);
      this._openPopup(this._popup);
    });
  }

  _handleLike() {
    this._element.querySelector('.element__heart-sign').classList.toggle("element__heart-sign_actived");
  }

  _handleDelete() {
    this._element.remove();
  }

}