import '../pages/index.css';
import {createCard, imagePopup} from "./cards";
import {closeModal, openModal} from "./modal";
import {enableValidation} from "./validate";
import {updateAvatar, getProfileInfo, getInitialCards, updateProfileInfo, sendCard} from "./api";

const userIdToCheck = '796e9005914fa8a4f00ab4ad';

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const avatarPopup = document.querySelector('.popup_type_change-avatar');

const profileSubmitButtom = profilePopup.querySelector('.popup__button');
const cardSubmitButtom = cardPopup.querySelector('.popup__button');
const avatarSubmitButtom = avatarPopup.querySelector('.popup__button');

const avatarInput = avatarPopup.querySelector('.popup__input_type_avtar');
const avatarFormElement = avatarPopup.querySelector('[name="change-avatar"]')

const profileEditButton = document.querySelector('.profile__edit-button');
const profileImage = document.querySelector('.profile__image');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileFormElement = profilePopup.querySelector('[name="edit-profile"]')
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');

const profileAddButton = document.querySelector('.profile__add-button');
const cardFormElement = cardPopup.querySelector('[name="new-place"]')
const placeInput = cardPopup.querySelector('.popup__input_type_card-name');
const linkInput = cardPopup.querySelector('.popup__input_type_url');

const popupArray = [profilePopup, cardPopup, avatarPopup, imagePopup];


const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'form__input-error_active'
}

profileImage.addEventListener('click', () => {
    openModal(avatarPopup);
});

function handleAvatarFormSubmit(evt){
    evt.preventDefault();

    avatarSubmitButtom.textContent = 'Сохранение...';

    updateAvatar(avatarInput.value)
        .then(res => {
            if(res.ok){
                profileImage.style = `background-image: url('${avatarInput.value}');`;

                closeModal(avatarPopup);
            } else {
                return Promise.reject(`Ошибка:  ${res.status}`);
            }
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            avatarSubmitButtom.textContent = 'Сохранить';
        });
}

avatarFormElement.addEventListener('submit', handleAvatarFormSubmit);

getProfileInfo()
    .then((result) => {
        profileImage.style = `background-image: url('${result.avatar}');`;
        avatarInput.value = result.avatar;
        profileTitle.textContent = result.name;
        profileDescription.textContent = result.about;
    })
    .catch(err => {
        console.log(err);
    });


function profilePopupSetInput(nameInput, jobInput, profileTitle, profileDescription){
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
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

const placesList = document.querySelector('.places__list');

getInitialCards()
    .then((result) => {
        result.forEach(function(card){
            placesList.append(createCard(card, userIdToCheck, openModal));
        });
    })
    .catch(err => {
        console.log(err);
    });


Promise.all(getProfileInfo, getInitialCards)
    .catch(err => {
        console.log(err);
    });

profileEditButton.addEventListener('click', () => {
    profilePopupSetInput(nameInput, jobInput, profileTitle, profileDescription);

    openModal(profilePopup);
});

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    profileSubmitButtom.textContent = 'Сохранение...';

    updateProfileInfo(nameInput.value, jobInput.value)
        .then(res => {
            if(res.ok){
                profileTitle.textContent = nameInput.value;
                profileDescription.textContent = jobInput.value;

                closeModal(profilePopup);
            } else {
                return Promise.reject(`Ошибка:  ${res.status}`);
            }
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            profileSubmitButtom.textContent = 'Сохранить';
        });
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

profileAddButton.addEventListener('click', () => {
    openModal(cardPopup);
});

function handleCardFormSubmit(evt) {
    evt.preventDefault();

    cardSubmitButtom.textContent = 'Сохранение...';

    sendCard(placeInput.value, linkInput.value)
        .then(data => {
            console.log(data);
            placesList.prepend(createCard(data, userIdToCheck, openModal));

            closeModal(cardPopup);
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            cardSubmitButtom.textContent = 'Сохранить';
        });

}

cardFormElement.addEventListener('submit', handleCardFormSubmit);
