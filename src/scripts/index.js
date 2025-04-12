import '../pages/index.css';
import {initialCards, createCard, removeCard, PlaceLike} from './cards.js';
import {OpenPopup, ClosePopup, OpenImg, handleEsc, handleClick} from './modal.js';

// @todo: Темплейт карточки
export const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const content = document.querySelector('.content');
const placelist = content.querySelector('.places__list');

// Слушаем события ESC и клик

document.addEventListener('keydown', handleEsc);
document.addEventListener('click', handleClick);

// редактирования профайла
    const editbutton = content.querySelector('.profile__edit-button');
    const profileTitle = content.querySelector('.profile__title');
    const profileDescription = content.querySelector('.profile__description');
    const editpopup = document.querySelector('.popup_type_edit');
   
    const popupInputName = editpopup.querySelector('.popup__input_type_name');
    const popupInputDescription = editpopup.querySelector('.popup__input_type_description');
    

    editbutton.addEventListener('click', function (evt) {
        popupInputName.value = profileTitle.textContent;
        popupInputDescription.value = profileDescription.textContent;

        OpenPopup(editpopup);
    });

// добавление места

const addbutton = content.querySelector('.profile__add-button');
const addpopup = document.querySelector('.popup_type_new-card');

addbutton.addEventListener('click', function (evt) {
    OpenPopup(addpopup);
})

// сохранить данные профайла

function SaveProfile (Name, Description) {
    profileTitle.textContent = Name;
    profileDescription.textContent = Description;
}

const FormProfile = document.forms.editprofile;
const ProfileName = FormProfile.elements.name;
const ProfileDescription = FormProfile.elements.description;


 FormProfile.addEventListener('submit', function (evt) {
    evt.preventDefault();
    SaveProfile(ProfileName.value, ProfileDescription.value);
    FormProfile.reset();
    ClosePopup(editpopup);
 })

//  добавить карточку через +

const FormPlace = document.forms.newplace;
const Place = FormPlace.elements.placename;
const PlaceLink = FormPlace.elements.link;

FormPlace.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const item = {name:Place.value, link:PlaceLink.value}
    const newcard = createCard(item, removeCard, PlaceLike);
    placelist.prepend(newcard);
    FormPlace.reset();
    ClosePopup(addpopup);
})

// отслеживаем клик по картинке

placelist.addEventListener('click', OpenImg);

// Вывести карточки на страницу

 initialCards.forEach(function (item) {

    const newcard = createCard(item, removeCard, PlaceLike);

    placelist.append(newcard); 
 });

