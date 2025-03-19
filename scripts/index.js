// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.content');
const placelist = content.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(name, link, removeCard) {
    const newcard = cardTemplate.querySelector('.card').cloneNode(true);

    newcard.querySelector('.card__image').src = link;
    newcard.querySelector('.card__image').alt = name;
    newcard.querySelector('.card__title').textContent = name;

    newcard.querySelector('.card__delete-button').addEventListener('click', removeCard);
    
    placelist.append(newcard); 
}

// @todo: Функция удаления карточки

function removeCard () { 
    const card = placelist.querySelector('.card');
    
    card.remove();
}


// @todo: Вывести карточки на страницу

 for (let i = 0; i < initialCards.length; i++) {  
    createCard(initialCards[i].name, initialCards[i].link, removeCard);
 }
