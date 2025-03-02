import '../pages/index.css';
import {createCard, initialCards} from "./cards";
import {closeModal, openModal} from "./modal";
import {enableValidation} from "./validate";

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
export const imagePopup = document.querySelector('.popup_type_image');

const popupArray = [profilePopup, cardPopup, imagePopup];

const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'form__input-error_active'
}

enableValidation(validationSettings);

function addPopupCloseEventListener(popup){
    popup.querySelector('.popup__close').addEventListener('click', () => {
        closeModal(popup);
    });
}

popupArray.forEach(evt => {
    evt.classList.add('popup_is-animated');
    addPopupCloseEventListener(evt);
});

export const popupImage = imagePopup.querySelector('.popup__image');
export const popupCaption = imagePopup.querySelector('.popup__caption');

const placesList = document.querySelector('.places__list');

const cardTemplate = document.querySelector('#card-template').content;
export const card = cardTemplate.querySelector('.card');

initialCards.forEach(function(card){
    placesList.append(createCard(card));
});

const profileEditButton = document.querySelector('.profile__edit-button');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileFormElement = profilePopup.querySelector('[name="edit-profile"]')
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');

function profilePopupSetInput(nameInput, jobInput, profileTitle, profileDescription){
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
}


profileEditButton.addEventListener('click', () => {
    profilePopupSetInput(nameInput, jobInput, profileTitle, profileDescription);

    openModal(profilePopup);
});

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    closeModal(profilePopup);
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);


const profileAddButton = document.querySelector('.profile__add-button');

const cardFormElement = cardPopup.querySelector('[name="new-place"]')
const placeInput = cardPopup.querySelector('.popup__input_type_card-name');
const linkInput = cardPopup.querySelector('.popup__input_type_url');

profileAddButton.addEventListener('click', () => {
    openModal(cardPopup);
});

function handleCardFormSubmit(evt) {
    evt.preventDefault();

    placesList.prepend(createCard({name: placeInput.value, link: linkInput.value}));

    closeModal(cardPopup);
}

cardFormElement.addEventListener('submit', handleCardFormSubmit);
