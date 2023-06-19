export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);  
    this._button = this._popup.querySelector('popup__close');
  }

  open() {
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose(e) {
    if(e.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._button.addEventListener('click', () => {
      this.сlose();
    });
    this._popup.addEventListener('click', (e) => {
      if (e.currentTarget === e.target) {
        this.сlose();
      }    
    });
    document.addEventListener('keydown', (e) => {
      this._handleEscClose;
    });
  }
}