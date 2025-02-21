const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

// @todo: Темплейт карточки

const placesList = document.querySelector('.places__list');

const cardTemplate = document.querySelector('#card-template').content;
const card = cardTemplate.querySelector('.card');

function createCard(initialCards){
    const cloneCard = card.cloneNode(true);

    const cardTitle = cloneCard.querySelector('.card__title');
    const cardImage = cloneCard.querySelector('.card__image');

    cardTitle.textContent = initialCards.name;
    cardImage.src = initialCards.link;
    cardImage.alt = 'картинка';

    cloneCard.querySelector('.card__like-button').addEventListener('click', event => {
        event.target.classList.toggle('card__like-button_is-active');
    });

    cloneCard.querySelector('.card__delete-button').addEventListener('click', event => {
        event.target.closest('.card').remove();
    });


    return cloneCard;
}

initialCards.forEach(function(card){
    placesList.append(createCard(card));
});

// @todo: DOM узлы

const profileEditButton = document.querySelector('.profile__edit-button');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileFormElement = profilePopup.querySelector('[name="edit-profile"]')
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');


function openModal(popup){
    popup.classList.add('popup_is-opened');
}

function closeModal(popup){
    popup.classList.remove('popup_is-opened');
}

function addPopupCloseEventListener(popup){
    popup.querySelector('.popup__close').addEventListener('click', () => {
        closeModal(popup);
    });
}

addPopupCloseEventListener(profilePopup);

profileEditButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;

    openModal(profilePopup);
});

function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 

    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit); 


const profileAddButton = document.querySelector('.profile__add-button');

const cardFormElement = cardPopup.querySelector('[name="new-place"]')
const placeInput = cardPopup.querySelector('.popup__input_type_card-name');
const linkInput = cardPopup.querySelector('.popup__input_type_url');

addPopupCloseEventListener(cardPopup);

profileAddButton.addEventListener('click', () => {
    openModal(cardPopup);
});

function handleCardFormSubmit(evt) {
    evt.preventDefault(); 

    placesList.prepend(createCard({name: placeInput.value, link: linkInput.value}));
    console.log({name: placeInput.value, link: linkInput.value});
}

cardFormElement.addEventListener('submit', handleCardFormSubmit);



// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу