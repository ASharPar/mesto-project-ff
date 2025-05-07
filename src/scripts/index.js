import "../pages/index.css";
import { createCard, removeCard, placeLike } from "./card.js";
import { openPopup, closePopup } from "./modal.js";
import { clearValidation, enableValidation } from "./validation.js";
import {
  addAPICard,
  avatarAPIUpdate,
  getInitialCards,
  getProfile,
  updateProfile,
} from "./api.js";

// Переменные
const content = document.querySelector(".content");
const placelist = content.querySelector(".places__list");

let profileID;

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  buttonSelector: ".popup__button",
  inactiveButtonClass: "popup__submit_inactive",
  inputErrorClass: "popup__form-error",
  errorClass: "popup__input-error_active",
};

// редактирования профайла
const editButton = content.querySelector(".profile__edit-button");
const profileTitle = content.querySelector(".profile__title");
const profileDescriptionText = content.querySelector(".profile__description");
const editPopup = document.querySelector(".popup_type_edit");
const profileForm = editPopup.querySelector(".popup__form");

const popupInputName = editPopup.querySelector(".popup__input_type_name");
const popupInputDescription = editPopup.querySelector(
  ".popup__input_type_description"
);

editButton.addEventListener("click", function (evt) {
  popupInputName.value = profileTitle.textContent;
  popupInputDescription.value = profileDescriptionText.textContent;

  clearValidation(profileForm, validationConfig);

  openPopup(editPopup);
});

// сохранить данные профайла
const formProfile = document.forms.editprofile;
const profileName = formProfile.elements.name;
const profileDescription = formProfile.elements.description;

function saveProfile(name, description) {
  profileTitle.textContent = name;
  profileDescriptionText.textContent = description;
}

formProfile.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const saveButton = editPopup.querySelector(".popup__button");

  saveButton.textContent = "Сохранение...";

  updateProfile(profileName.value, profileDescription.value)
    .then((data) => {
      saveProfile(data.name, data.about);
      closePopup(editPopup);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => {
      saveButton.textContent = "Сохранить";
    });
});

// редактировать картинку профиля
const avatarImage = document.querySelector(".profile__image");
const avatarForm = document.forms.editavatar;
const avatarLink = avatarForm.elements.avatarlink;
const avatarPopup = document.querySelector(".popup_type_avatar");

function avatarEdit() {
  clearValidation(avatarForm, validationConfig);

  openPopup(avatarPopup);
}

function avatarSave(avatarLink) {
  const avatarImage = document.querySelector(".profile__image");
  avatarImage.style = `background-image: URL('${avatarLink.value}')`;
}

avatarImage.addEventListener("click", function () {
  avatarForm.reset();
  avatarEdit();
});

// Обновляем картинку avatar на сервере
avatarForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const saveButton = avatarPopup.querySelector(".popup__button");

  saveButton.textContent = "Сохранение...";

  avatarAPIUpdate(avatarLink.value)
    .then((data) => {
      avatarSave(avatarLink);
      closePopup(avatarPopup);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => {
      saveButton.textContent = "Сохранить";
    });
});

// Открыть popup добавления новой карточки
const addButton = content.querySelector(".profile__add-button");
const addPopup = document.querySelector(".popup_type_new-card");
const mestoForm = addPopup.querySelector(".popup__form");

addButton.addEventListener("click", function (evt) {
  mestoForm.reset();

  clearValidation(mestoForm, validationConfig);

  openPopup(addPopup);
});

//  добавить карточку через +
const formPlace = document.forms.newplace;
const place = formPlace.elements.placename;
const placeLink = formPlace.elements.link;

formPlace.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const item = { name: place.value, link: placeLink.value };
  const saveButton = addPopup.querySelector(".popup__button");

  saveButton.textContent = "Сохранение...";

  addAPICard(item, profileID)
    .then((data) => {
      const item = data;
      const newcard = createCard(
        item,
        removeCard,
        placeLike,
        openImg,
        profileID
      );
      placelist.prepend(newcard);
      formPlace.reset();
      closePopup(addPopup);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(function () {
      saveButton.textContent = "Сохранить";
    });
});

// открыть картинку карточки
export function openImg(cardImage) {
  const imagePopup = document.querySelector(".popup_type_image");
  const popupImg = imagePopup.querySelector(".popup__image");
  const popupText = imagePopup.querySelector(".popup__caption");

  popupImg.src = cardImage.src;
  popupImg.alt = cardImage.alt;
  popupText.textContent = cardImage.alt;

  openPopup(imagePopup);
}

// Слушатель события ввода данных в popup
enableValidation(validationConfig);

// Получаем данные для загрузки сайта
Promise.all([getInitialCards(), getProfile()])
  .then(([cards, profile]) => {
    saveProfile(profile.name, profile.about);
    profileID = profile._id;

    cards.forEach(function (item) {
      const newcard = createCard(
        item,
        removeCard,
        placeLike,
        openImg,
        profileID
      );

      placelist.append(newcard);
    });
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });
