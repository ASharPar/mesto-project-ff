import {cardTemplate} from './index.js';

export function createCard (item, removeCard, placeLike, openImg) {
    const newcard = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = newcard.querySelector('.card__delete-button');
    const likebutton = newcard.querySelector('.card__like-button');
    const cardimage = newcard.querySelector('.card__image');
    
    newcard.querySelector('.card__image').src = item.link;
    newcard.querySelector('.card__image').alt = item.name;
    newcard.querySelector('.card__title').textContent = item.name;
  
    deleteButton.addEventListener('click',function () {
      removeCard (deleteButton);
    });
  
    likebutton.addEventListener('click', function () {
      placeLike (likebutton);
    });
  
    cardimage.addEventListener('click', function () {
      openImg (cardimage)
    });
  
    return(newcard); 
  }
  
  // Функция удаления карточки
  
  export function removeCard (deleteButton) {
    const card = deleteButton.closest('.card');
  
    card.remove();
  }
  
  // поставить лайк картинке
  
  export function placeLike (likebutton) {
    likebutton.classList.toggle('card__like-button_is-active');
  }