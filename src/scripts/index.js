import '../pages/index.css';
import {createCard, removeCard, placeLike} from './card.js';
import {openPopup, closePopup} from './modal.js';
import {clearValidation, enableValidation, validationConfig} from './validation.js';
import { addAPICard, avatarAPIUpdate, getInitialCards, getProfile, updateProfile } from './api.js';

// @todo: Темплейт карточки
export const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const content = document.querySelector('.content');
const placelist = content.querySelector('.places__list');
const formElement = document.querySelector('.popup__form');

let profileID;


// редактирования профайла
const editbutton = content.querySelector('.profile__edit-button');
const profileTitle = content.querySelector('.profile__title');
const profileDescriptionText = content.querySelector('.profile__description');
const editpopup = document.querySelector('.popup_type_edit');
const profileForm = editpopup.querySelector('.popup__form');
   
const popupInputName = editpopup.querySelector('.popup__input_type_name');
const popupInputDescription = editpopup.querySelector('.popup__input_type_description');
    
editbutton.addEventListener('click', function (evt) {
  popupInputName.value = profileTitle.textContent;
  popupInputDescription.value = profileDescriptionText.textContent;

  clearValidation(profileForm, validationConfig);

  openPopup(editpopup);
});


// сохранить данные профайла
const formProfile = document.forms.editprofile;
const profileName = formProfile.elements.name;
const profileDescription = formProfile.elements.description;

function saveProfile (name, description) {
  profileTitle.textContent = name;
  profileDescriptionText.textContent = description;
}

formProfile.addEventListener('submit', function (evt) {
  evt.preventDefault();
  
  const savebutton = editpopup.querySelector('.popup__button');

  savebutton.textContent = 'Сохранение...'

  updateProfile(profileName.value, profileDescription.value)
    .then((data) => {
      saveProfile(data.name, data.about);
      closePopup(editpopup);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => {
      savebutton.textContent = 'Сохранить'
    })
})


// редактировать картинку профиля
const avatarImage = document.querySelector('.profile__image');
const avatarForm = document.forms.editavatar;
const avatarLink = avatarForm.elements.avatarlink;
const avatarpopup = document.querySelector('.popup_type_avatar');

function avatarEdit () {
  avatarLink.value = '';

  clearValidation(avatarForm, validationConfig);

  openPopup(avatarpopup);
}

function avatarSave (avatarLink) {
  const avatarImage = document.querySelector('.profile__image');
    avatarImage.style = `background-image: URL('${avatarLink.value}')`;
}

avatarImage.addEventListener('click', function () {
    avatarEdit ();
});


// Обновляем картинку avatar на сервере
avatarForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const savebutton = avatarpopup.querySelector('.popup__button');

  savebutton.textContent = 'Сохранение...'

  avatarAPIUpdate(avatarLink.value)
  .then((data) => {
    avatarSave(avatarLink);
    closePopup(avatarpopup);
  })
  .catch((err) => {
   console.log(err); // выводим ошибку в консоль
  })
  .finally(() => {
    savebutton.textContent = 'Сохранить'
  })
})


// Открыть popup добавления новой карточки
const addbutton = content.querySelector('.profile__add-button');
const addpopup = document.querySelector('.popup_type_new-card');
const popupInputCardName = addpopup.querySelector('.popup__input_type_card-name');
const popupInputUrl = addpopup.querySelector('.popup__input_type_url');
const mestoForm = addpopup.querySelector('.popup__form');

addbutton.addEventListener('click', function (evt) {
  popupInputCardName.value = '';
  popupInputUrl.value = '';

  clearValidation(mestoForm, validationConfig);

  openPopup(addpopup);
})


//  добавить карточку через +
const formPlace = document.forms.newplace;
const place = formPlace.elements.placename;
const placeLink = formPlace.elements.link;

formPlace.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const item = {name:place.value, link:placeLink.value};
    const savebutton = addpopup.querySelector('.popup__button');

    savebutton.textContent = 'Сохранение...'
    
    addAPICard(item, profileID)
    .then((data) => {
        const item = data;
        const newcard = createCard(item, removeCard, placeLike, openImg, profileID);
        placelist.prepend(newcard);
        formPlace.reset();
        closePopup(addpopup);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(function () {
        savebutton.textContent = 'Сохранить'
    });
})


// открыть картинку карточки
export function openImg (cardimage) {
  const imagePopup = document.querySelector('.popup_type_image');
  const popupImg = imagePopup.querySelector('.popup__image');
  const popupText = imagePopup.querySelector('.popup__caption');
        
  popupImg.src = cardimage.src;
  popupImg.alt = cardimage.alt;
  popupText.textContent = cardimage.alt;
  
  openPopup(imagePopup);
}


// Слушатель события ввода данных в popup
formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
});

enableValidation(validationConfig);


// Получаем данные для загрузки сайта
Promise.all([getInitialCards(), getProfile()])
  .then(([cards, profile]) => {
    saveProfile(profile.name, profile.about);
    profileID = profile._id;

    cards.forEach(function (item) {
      const newcard = createCard(item, removeCard, placeLike, openImg, profileID);
      
      placelist.append(newcard);
    });
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
});