export function openPopup(popupType) {
  popupType.classList.add("popup_is-opened");

  // Слушаем события ESC и клик

  document.addEventListener("keydown", handleEsc);
  document.addEventListener("click", handleClick);
}

export function closePopup(popupType) {
  popupType.classList.remove("popup_is-opened");

  // Удаляем слушателя ESC и клик
  document.removeEventListener("keydown", handleEsc);
  document.removeEventListener("click", handleClick);
}

// Функция закрыть через ESC

function handleEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

// Функция закрыть через клик (крестик или вне окна)

function handleClick(evt) {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close")
  ) {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}
