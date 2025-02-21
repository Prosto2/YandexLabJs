// @todo: Темплейт карточки

const placesList = document.querySelector('.places__list');

function createCard(initialCards){
    const cardTemplate = document.querySelector('#card-template').content;
    const card = cardTemplate.querySelector('.card').cloneNode(true);

    const cardTitle = card.querySelector('.card__title');
    const cardImage = card.querySelector('.card__image');

    cardTitle.textContent = initialCards.name;
    cardImage.src = initialCards.link;
    cardImage.alt = 'картинка';

    return card;
}

initialCards.forEach(function(card){
    placesList.append(createCard(card));
});


// let cardsArray = initialCards.map(createCard);

// cardsArray.forEach(function(card){
//     placesList.append(card);
// });



// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
