export default class Api {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    // constructor body
  }

  async getInitialCards() {
    try {
      const res = await fetch(`${this._baseUrl}/cards`, {
        method: "GET",
        headers: this._headers,
      });
      return await res.json();
    } catch (err) {
      console.log(err);
    }
  }

  async getUserInfo() {
    try {
      const res = await fetch(`${this._baseUrl}/users/me`, {
        method: "GET",
        headers: this._headers,
      });
      return await res.json();
    } catch (err) {
      console.log(err);
    }
  }

  async setUserInfo(name, about) {
    try {
      const res = await fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: about,
        }),
      });
      return await res.json();
    } catch (err) {
      console.log(err);
    }
  }

  async addCard(name, link) {
    try {
      const res = await fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({ name, link }),
      });
      return await res.json();
    } catch (err) {
      console.log(err);
    }
  }

  async deleteCard(cardId) {
    try {
      const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      });
      return await res.json();
    } catch (err) {
      console.log(err);
    }
  }

  async addLike(cardId) {
    try {
      const res = await fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: this._headers,
      });
      return await res.json();
    } catch (err) {
      console.log(err);
    }
  }

  async removeLike(cardId) {
    try {
      const res = await fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      });
      return await res.json();
    } catch (err) {
      console.log(err);
    }
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.addLike(cardId);
    } else {
      return this.removeLike(cardId);
    }
  }

  async updateAvatar(link) {
    try {
      const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: link,
        }),
      });
      return await res.json();
    } catch (err) {
      console.log(err);
    }
  }
}

// const api = new Api({
//   baseUrl: "https://around-api.en.tripleten-services.com/v1",
//   headers: {
//     authorization: "dd59f422-ba26-4124-9867-97b1d68768e4",
//     "Content-Type": "application/json",
//   },
// });
