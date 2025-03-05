import {openModal} from "./modal";

export const imagePopup = document.querySelector('.popup_type_image');
const cardTemplate = document.querySelector('#card-template').content;
const card = cardTemplate.querySelector('.card');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');


export function createCard(initialCards){
    const cloneCard = card.cloneNode(true);

    const cardTitle = cloneCard.querySelector('.card__title');
    const cardImage = cloneCard.querySelector('.card__image');
    const cardLikes = cloneCard.querySelector('.card__like-count');

    cardTitle.textContent = initialCards.name;
    cardImage.src = initialCards.link;
    cardImage.alt = 'картинка';
    cardLikes.textContent = initialCards.likes.length;

    cloneCard.querySelector('.card__like-button').addEventListener('click', event => {
        event.target.classList.toggle('card__like-button_is-active');
    });

    cloneCard.querySelector('.card__delete-button').addEventListener('click', event => {
        event.target.closest('.card').remove();
    });

    cardImage.addEventListener('click', event => {
        popupImage.src = event.target.src;
        popupCaption.textContent = initialCards.name;
        openModal(imagePopup);
    });

    return cloneCard;
}
