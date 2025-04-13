export function openPopup(PopupType) {
    PopupType.classList.add('popup_is-opened');

    // Слушаем события ESC и клик

    document.addEventListener('keydown', handleEsc);
    document.addEventListener('click', handleClick); 
}

export function closePopup(PopupType) {
    PopupType.classList.remove('popup_is-opened');

    // Удаляем слушателя ESC и клик
    document.removeEventListener('keydown', handleEsc);
    document.removeEventListener('click', handleClick); 
}

// Функция закрыть через ESC

function handleEsc (evt) {
    if (evt.key === 'Escape') {
      const openedpopup = document.querySelector('.popup_is-opened');
      if (openedpopup) {
        closePopup(openedpopup);
      }
    }
}

// Функция закрыть через клик (крестик или вне окна)

function handleClick (evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    const openedpopup = document.querySelector('.popup_is-opened');
      if (openedpopup) {
        closePopup(openedpopup);
      }
    }
}