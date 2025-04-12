import {cardTemplate} from './index.js';

export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

export function createCard (item, removeCard, PlaceLike) {
  const newcard = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = newcard.querySelector('.card__delete-button');
  const likebutton = newcard.querySelector('.card__like-button');
  
  
  newcard.querySelector('.card__image').src = item.link;
  newcard.querySelector('.card__image').alt = item.name;
  newcard.querySelector('.card__title').textContent = item.name;

  deleteButton.addEventListener('click',function () {
      removeCard (deleteButton);
  });

  likebutton.addEventListener('click', function () {
      PlaceLike (likebutton);
  });

  return(newcard); 
}

// Функция удаления карточки

export function removeCard (deleteButton) {
  const card = deleteButton.closest('.card');

  card.remove();
}

// поставить лайк картинке

export function PlaceLike (likebutton) {
  likebutton.classList.toggle('card__like-button_is-active');
}
