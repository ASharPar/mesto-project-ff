const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-37",
  headers: {
    authorization: "65e18cea-14cf-46b8-a939-6e7c5c076871",
    "Content-Type": "application/json",
  },
};

function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(handleResponse);
};

export const getProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(handleResponse);
};

export function updateProfile(userName, userAbout) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userAbout,
    }),
  }).then(handleResponse);
}

export function addAPICard(item) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    body: JSON.stringify({
      name: item.name,
      link: item.link,
      likes: [],
    }),
    headers: config.headers,
  }).then(handleResponse);
}

export function deleteAPICard(cardID, card) {
  return fetch(`${config.baseUrl}/cards/${cardID}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
}

export function LikeAPIPut(cardID) {
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: "PUT",
    headers: config.headers,
  }).then(handleResponse);
}

export function LikeAPIDelete(cardID) {
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
}

export function avatarAPIUpdate(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  }).then(handleResponse);
}
