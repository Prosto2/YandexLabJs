let overlayClickHandler;

export function openModal(popup){
    popup.classList.add('popup_is-opened');
    overlayClickHandler = evt => popupCloseByOverlay(evt, popup);
    popup.addEventListener("mousedown",overlayClickHandler);
    document.addEventListener('keydown', closeByEsc);
}

export function closeModal(popup){
    popup.classList.remove('popup_is-opened');
    popup.removeEventListener("click", overlayClickHandler);
    document.removeEventListener('keydown', closeByEsc);
}

function closeByEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        closeModal(openedPopup);
    }
}

function popupCloseByOverlay(evt, popup)  {
    if (evt.currentTarget === evt.target) {
        closeModal(popup);
    }
}

