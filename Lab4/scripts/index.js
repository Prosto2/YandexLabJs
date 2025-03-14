const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const popupArray = [profilePopup, cardPopup, imagePopup];

function addPopupCloseEventListener(popup){
    popup.querySelector('.popup__close').addEventListener('click', () => {
        closeModal(popup);
    });
}

popupArray.forEach(evt => {
    evt.classList.add('popup_is-animated');
    addPopupCloseEventListener(evt);
});

const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

const placesList = document.querySelector('.places__list');

const cardTemplate = document.querySelector('#card-template').content;
const card = cardTemplate.querySelector('.card');

initialCards.forEach(function(card){
    placesList.append(createCard(card));
});

const profileEditButton = document.querySelector('.profile__edit-button');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileFormElement = profilePopup.querySelector('[name="edit-profile"]')
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');





const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.classList.add('form__input-error_active');
    errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            toggleButtonState(inputList, buttonElement);
            checkInputValidity(formElement, inputElement);
        });
    });
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
        // const fieldsetList = Array.from(formElement.querySelectorAll('.popup__input'));

        setEventListeners(formElement);
    });
};

const hasInvalidInput = inputList =>{
    return inputList.some(inputElement => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement) => {
    if(hasInvalidInput(inputList)){
        buttonElement.classList.add('button_inactive');
    } else {
        buttonElement.classList.remove('button_inactive');
    }
}

enableValidation();






function openModal(popup){
    popup.classList.add('popup_is-opened');
}

function closeModal(popup){
    popup.classList.remove('popup_is-opened');
}

profileEditButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;

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
