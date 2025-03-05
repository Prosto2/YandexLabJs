import {closeModal, openModal} from "./modal";

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
    const cardDeleteButton = cloneCard.querySelector('.card__delete-button');

    cardTitle.textContent = initialCards.name;
    cardImage.src = initialCards.link;
    cardImage.alt = 'картинка';
    cardLikes.textContent = initialCards.likes ? initialCards.likes.length : 0;

    if(initialCards.owner._id !== '796e9005914fa8a4f00ab4ad'){
        cardDeleteButton.style.display = 'none';
    } else {
        cardDeleteButton.addEventListener('click', event => {
            fetch(`https://nomoreparties.co/v1/apf-cohort-202/cards/${initialCards._id}`, {
                method: 'DELETE',
                headers: {
                    authorization: 'b27f8ef8-b6db-412d-b6ac-dca73d415e99',
                }
            })
                .then(res => {
                    if(res.ok){
                        event.target.closest('.card').remove();
                    } else {
                        return Promise.reject(`Ошибка:  ${res.status}`);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        });
    }

    cloneCard.querySelector('.card__like-button').addEventListener('click', event => {
        event.target.classList.toggle('card__like-button_is-active');
    });


    cardImage.addEventListener('click', event => {
        popupImage.src = event.target.src;
        popupCaption.textContent = initialCards.name;
        openModal(imagePopup);
    });

    return cloneCard;
}
