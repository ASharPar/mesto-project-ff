import {cardTemplate} from './index.js';
import { deleteAPICard, getAPICardLikes, LikeAPIDelete, LikeAPIPut } from './api.js';

export function createCard (item, removeCard, placeLike, openImg, profileID) {
    const newcard = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = newcard.querySelector('.card__delete-button');
    const likebutton = newcard.querySelector('.card__like-button');
    const cardimage = newcard.querySelector('.card__image');
    
    newcard.querySelector('.card__image').src = item.link;
    newcard.querySelector('.card__image').alt = item.name;
    newcard.querySelector('.card__title').textContent = item.name;
    newcard.querySelector('.likes_count').textContent = item.likes.length;

    const cardID = item._id;
    const cardLikes = item.likes;

// Лайкнута или нет мной карточка
    cardLikes.forEach(function (like) {
      if (like._id === profileID) {
        likebutton.classList.add('card__like-button_is-active');
      }
    });

// Могу удалить только свою карточку
  
    if (item.owner._id === profileID) {
      deleteButton.addEventListener('click',function () {
        removeCard (deleteButton, cardID);
      });
    } else {
      deleteButton.disable = true;
      deleteButton.classList.add('card__delete-button_inactive');
    }
    
    likebutton.addEventListener('click', function () {
          placeLike (likebutton, cardID);
        });
  
    cardimage.addEventListener('click', function () {
      openImg (cardimage)
    });
  
    return(newcard); 
  }
  
  // Функция удаления карточки

  function hendleDelete(cardID, card) {
    
    deleteAPICard(cardID)
      .then((cardDeleted) => {
        card.remove();
      })
    }
  
  export function removeCard (deleteButton, cardID) {
    const card = deleteButton.closest('.card');

    hendleDelete(cardID, card);
  }
  
  // поставить лайк картинке
  
  export function placeLike (likebutton, cardID) {

    if (likebutton.classList.contains('card__like-button_is-active')) {
      LikeAPIDelete(cardID)
        .then((likeDeleted) => {
          likebutton.closest('.card').querySelector('.likes_count').textContent = likeDeleted.likes.length;
          likebutton.classList.remove('card__like-button_is-active');
        })
    } else {
      LikeAPIPut(cardID)
        .then((likeAdded) => {
          likebutton.closest('.card').querySelector('.likes_count').textContent = likeAdded.likes.length;
          likebutton.classList.add('card__like-button_is-active');
        })
    }
  }