import '../pages/index.css';
import { initialCards } from './cards.js';
import {createCard, removeCard, placeLike} from './card.js';
import {openPopup, closePopup} from './modal.js';

// @todo: Темплейт карточки
export const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const content = document.querySelector('.content');
const placelist = content.querySelector('.places__list');

// редактирования профайла
    const editbutton = content.querySelector('.profile__edit-button');
    const profileTitle = content.querySelector('.profile__title');
    const profileDescriptionText = content.querySelector('.profile__description');
    const editpopup = document.querySelector('.popup_type_edit');
   
    const popupInputName = editpopup.querySelector('.popup__input_type_name');
    const popupInputDescription = editpopup.querySelector('.popup__input_type_description');
    

    editbutton.addEventListener('click', function (evt) {
        popupInputName.value = profileTitle.textContent;
        popupInputDescription.value = profileDescriptionText.textContent;

        openPopup(editpopup);
    });

// добавление места

const addbutton = content.querySelector('.profile__add-button');
const addpopup = document.querySelector('.popup_type_new-card');

addbutton.addEventListener('click', function (evt) {
    openPopup(addpopup);
})

// сохранить данные профайла

function saveProfile (name, description) {
    profileTitle.textContent = name;
    profileDescription.textContent = description;
}

const formProfile = document.forms.editprofile;
const profileName = formProfile.elements.name;
const profileDescription = formProfile.elements.description;

 formProfile.addEventListener('submit', function (evt) {
    evt.preventDefault();
    saveProfile(profileName.value, profileDescription.value);
    closePopup(editpopup);
 })

//  добавить карточку через +

const formPlace = document.forms.newplace;
const place = formPlace.elements.placename;
const placeLink = formPlace.elements.link;

formPlace.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const item = {name:place.value, link:placeLink.value}
    const newcard = createCard(item, removeCard, placeLike);
    placelist.prepend(newcard);
    formPlace.reset();
    closePopup(addpopup);
})

// открыть картинку

export function openImg (cardimage) {
    const imagePopup = document.querySelector('.popup_type_image');
    const popupImg = imagePopup.querySelector('.popup__image');
    const popupText = imagePopup.querySelector('.popup__caption');
        
    popupImg.src = cardimage.src;
    popupImg.alt = cardimage.alt;
    popupText.textContent = cardimage.alt;
  
    openPopup(imagePopup);
  }

// Вывести карточки на страницу

 initialCards.forEach(function (item) {

    const newcard = createCard(item, removeCard, placeLike, openImg);

    placelist.append(newcard); 
 });

