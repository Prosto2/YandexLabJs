const config = {
    baseUrl: 'https://nomoreparties.co/v1/apf-cohort-202',
    headers: {
        authorization: 'b27f8ef8-b6db-412d-b6ac-dca73d415e99',
        'Content-Type': 'application/json'
    }
}

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: {
            authorization: config.headers.authorization
        }
    })
        .then(res => {
            if(res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Ошибка:  ${res.status}`);
            }
        });
}

export const deleteCard = (initialCards) => {
    return fetch(`${config.baseUrl}/cards/${initialCards._id}`, {
        method: 'DELETE',
        headers: {
            authorization: config.headers.authorization,
        }
    });
}

export const likeAdd = (initialCards) => {
    return  fetch(`${config.baseUrl}/cards/likes/${initialCards._id}`, {
        method: 'PUT',
        headers: {
            authorization: config.headers.authorization,
        }
    })
        .then(res => {
            if(res.ok){
                return res.json();
            } else {
                return Promise.reject(`Ошибка:  ${res.status}`);
            }
        });
}

export const likeDelete = (initialCards) => {
    return fetch(`${config.baseUrl}/cards/likes/${initialCards._id}`, {
        method: 'DELETE',
        headers: {
            authorization: config.headers.authorization,
        }
    })
        .then(res => {
            if(res.ok){
                return res.json();
            } else {
                return Promise.reject(`Ошибка:  ${res.status}`);
            }
        });
}

export const updateAvatar = (avatarInputValue) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarInputValue,
        })
    });
}

export const getProfileInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: {
            authorization: config.headers.authorization
        }
    })
        .then(res => {
            if(res.ok) {
                return  res.json();
            } else {
                return Promise.reject(`Ошибка:  ${res.status}`);
            }
        });
}

export const updateProfileInfo = (nameInputValue, jobInputValue) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: nameInputValue,
            about: jobInputValue
        })
    });
}

export const sendCard = (placeInputValue, linkInputValue) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: placeInputValue,
            link: linkInputValue
        })
    })
        .then(res => {
            if(res.ok){
                return res.json();
            } else {
                return Promise.reject(`Ошибка:  ${res.status}`);
            }
        });
}