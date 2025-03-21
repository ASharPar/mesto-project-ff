// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.content');
const placelist = content.querySelector('.places__list');


// @todo: Функция создания карточки
function createCard (item, removeCard) {
    const newcard = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = newcard.querySelector('.card__delete-button');
    
    
    newcard.querySelector('.card__image').src = item.link;
    newcard.querySelector('.card__image').alt = item.name;
    newcard.querySelector('.card__title').textContent = item.name;

    deleteButton.addEventListener('click',function () {
        removeCard (deleteButton);
    });

    return(newcard); 
}

// @todo: Функция удаления карточки

function removeCard (deleteButton) {
    const card = deleteButton.closest('.card');

    card.remove();
}


// @todo: Вывести карточки на страницу

 initialCards.forEach(function (item) {

    const newcard = createCard(item, removeCard);

    placelist.append(newcard); 
 });

