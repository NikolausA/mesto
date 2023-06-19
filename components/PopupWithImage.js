import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, cardItem) {
    super(popupSelector);
    this._name = cardItem.name;
    this._link = cardItem.link;
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupText = this._popup.querySelector('.popup__text');
  }

  open() {
    this._popupImage.src = this._link;
    this._popupImage.alt = this._link;
    this._popupText.textContent = this._name;
    super.open();
  }
}