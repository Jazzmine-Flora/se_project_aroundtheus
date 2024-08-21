export default class Api {
  constructor(projectUrl, headers) {
    this._projectUrl = projectUrl;
    this._headers = headers;
    // constructor body
  }

  getInitialCards() {
    return fetch(`${this._projectUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
  }

  getUserInfo() {
    return fetch(`${this._projectUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
  }

  setUserInfo(data) {
    return fetch(`${this._projectUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
  }

  addCard(data) {
    return fetch(`${this._projectUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
  }

  deleteCard(cardId) {
    return fetch(`${this._projectUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
  }

  addLike(cardId) {
    return fetch(`${this._projectUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
  }

  removeLike(cardId) {
    return fetch(`${this._projectUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.addLike(cardId);
    } else {
      return this.removeLike(cardId);
    }
  }

  updateAvatar(data) {
    return fetch(`${this._projectUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
  }
}

// const api = new Api({
//   baseUrl: "https://around-api.en.tripleten-services.com/v1",
//   headers: {
//     authorization: "dd59f422-ba26-4124-9867-97b1d68768e4",
//     "Content-Type": "application/json",
//   },
// });
