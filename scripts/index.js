// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.content');
const placelist = content.querySelector('.places__list');


// @todo: Функция создания карточки

function createCard (name, link, removeCard) {
    const newcard = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = newcard.querySelector('.card__delete-button');
    
    
    newcard.querySelector('.card__image').src = link;
    newcard.querySelector('.card__image').alt = name;
    newcard.querySelector('.card__title').textContent = name;

    deleteButton.addEventListener('click',function () {
        removeCard (deleteButton);
    });

    placelist.append(newcard); 
}

// @todo: Функция удаления карточки

function removeCard (deleteButton) {
    const card = deleteButton.closest('.card');

    card.remove();
}


// @todo: Вывести карточки на страницу

 for (let i = 0; i < initialCards.length; i++) {  
    createCard(initialCards[i].name, initialCards[i].link, removeCard);
 }
