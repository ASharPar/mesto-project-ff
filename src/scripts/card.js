import { deleteAPICard, LikeAPIDelete, LikeAPIPut } from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;

export function createCard(item, removeCard, placeLike, openImg, profileID) {
  const newCard = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = newCard.querySelector(".card__delete-button");
  const likeButton = newCard.querySelector(".card__like-button");
  const cardImage = newCard.querySelector(".card__image");
  const cardTitle = newCard.querySelector(".card__title");

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;
  newCard.querySelector(".likes_count").textContent = item.likes.length;

  const cardID = item._id;
  const cardLikes = item.likes;

  // Лайкнута или нет мной карточка
  cardLikes.some(function (like) {
    if (like._id === profileID) {
      likeButton.classList.add("card__like-button_is-active");
    }
  });

  // Могу удалить только свою карточку
  if (item.owner._id === profileID) {
    deleteButton.addEventListener("click", function () {
      removeCard(deleteButton, cardID);
    });
  } else {
    deleteButton.disable = true;
    deleteButton.classList.add("card__delete-button_inactive");
  }

  likeButton.addEventListener("click", function () {
    placeLike(likeButton, cardID);
  });

  cardImage.addEventListener("click", function () {
    openImg(cardImage);
  });

  return newCard;
}

// Функция удаления карточки
function hendleDelete(cardID, card) {
  deleteAPICard(cardID)
    .then((cardDeleted) => {
      card.remove();
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
}

export function removeCard(deleteButton, cardID) {
  const card = deleteButton.closest(".card");

  hendleDelete(cardID, card);
}

// поставить лайк картинке
export function placeLike(likeButton, cardID) {
  if (likeButton.classList.contains("card__like-button_is-active")) {
    LikeAPIDelete(cardID)
      .then((likeDeleted) => {
        likeButton.closest(".card").querySelector(".likes_count").textContent =
          likeDeleted.likes.length;
        likeButton.classList.remove("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
  } else {
    LikeAPIPut(cardID)
      .then((likeAdded) => {
        likeButton.closest(".card").querySelector(".likes_count").textContent =
          likeAdded.likes.length;
        likeButton.classList.add("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
  }
}
