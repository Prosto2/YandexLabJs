import {closeModal, openModal} from "./modal";

export const imagePopup = document.querySelector('.popup_type_image');
const cardTemplate = document.querySelector('#card-template').content;
const card = cardTemplate.querySelector('.card');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');
const userIdToCheck = '796e9005914fa8a4f00ab4ad';


export function createCard(initialCards){
    const cloneCard = card.cloneNode(true);

    const cardTitle = cloneCard.querySelector('.card__title');
    const cardImage = cloneCard.querySelector('.card__image');
    const cardLikes = cloneCard.querySelector('.card__like-count');
    const cardDeleteButton = cloneCard.querySelector('.card__delete-button');
    const userExists = initialCards.likes.some(user => user._id === userIdToCheck);
    const likeButtom = cloneCard.querySelector('.card__like-button');

    cardTitle.textContent = initialCards.name;
    cardImage.src = initialCards.link;
    cardImage.alt = 'картинка';
    cardLikes.textContent = initialCards.likes ? initialCards.likes.length : 0;

    if(userExists){
        likeButtom.classList.add('card__like-button_is-active');
    }

    if(initialCards.owner._id !== userIdToCheck){
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

    likeButtom.addEventListener('click', event => {
        if(!event.target.classList.contains('card__like-button_is-active')){
            fetch(`https://nomoreparties.co/v1/apf-cohort-202/cards/likes/${initialCards._id}`, {
                method: 'PUT',
                headers: {
                    authorization: 'b27f8ef8-b6db-412d-b6ac-dca73d415e99',
                }
            })
                .then(res => {
                    if(res.ok){
                        return res.json();
                    } else {
                        return Promise.reject(`Ошибка:  ${res.status}`);
                    }
                })
                .then(data => {
                    console.log(data);
                    cardLikes.textContent = data.likes.length;
                    event.target.classList.add('card__like-button_is-active');
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            fetch(`https://nomoreparties.co/v1/apf-cohort-202/cards/likes/${initialCards._id}`, {
                method: 'DELETE',
                headers: {
                    authorization: 'b27f8ef8-b6db-412d-b6ac-dca73d415e99',
                }
            })
                .then(res => {
                    if(res.ok){
                        return res.json();
                    } else {
                        return Promise.reject(`Ошибка:  ${res.status}`);
                    }
                })
                .then(data => {
                    cardLikes.textContent = data.likes.length;
                    event.target.classList.remove('card__like-button_is-active');
                })
                .catch(err => {
                    console.log(err);
                });
        }
    });


    cardImage.addEventListener('click', event => {
        popupImage.src = event.target.src;
        popupCaption.textContent = initialCards.name;
        openModal(imagePopup);
    });

    return cloneCard;
}
