export function OpenPopup(PopupType) {
    PopupType.classList.add('popup_is-opened');
}

export function ClosePopup(PopupType) {
    PopupType.classList.remove('popup_is-opened');
}

// открыть картинку

export function OpenImg (evt) {
    if (evt.target.classList.contains('card__image')) {
        const ImagePopup = document.querySelector('.popup_type_image');
        const PopupImg = ImagePopup.querySelector('.popup__image');
        const PopupText = ImagePopup.querySelector('.popup__caption');
        
        PopupImg.src = evt.target.src;
        PopupImg.alt = evt.target.alt;
        PopupText.textContent = evt.target.alt;

        OpenPopup(ImagePopup);
    }
}

// Функция закрыть через ESC

export function handleEsc (evt) {
    if (evt.key === 'Escape') {
      const openedpopup = document.querySelector('.popup_is-opened');
      if (openedpopup) {
        ClosePopup(openedpopup);
      }
    }
}

// Функция закрыть через клик (крестик или вне окна)

export function handleClick (evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    const openedpopup = document.querySelector('.popup_is-opened');
      if (openedpopup) {
        ClosePopup(openedpopup);
      }
    }
}