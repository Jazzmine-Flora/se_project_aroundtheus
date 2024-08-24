export default class Api {
  constructor({ baseUrl, headers }) {
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

  async setUserInfo(data) {
    try {
      const res = await fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about,
        }),
      });
      return await res.json();
    } catch (err) {
      console.log(err);
    }
  }

  async addCard({ title, url }) {
    try {
      const res = await fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({ name: title, link: url }),
      });
      return await res.json();
    } catch (err) {
      console.log(err);
    }
  }

  async deleteCard(cardId) {
    try {
      // Debugging log
      console.log("Delete Card ID:", cardId);
      console.log("Delete Card URL:", `${this._baseUrl}/cards/${cardId}`);

      const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      });

      // Check response status and handle non-2xx statuses
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      return await res.json();
    } catch (err) {
      console.error("Error deleting card:", err);
      throw err; // Rethrow the error after logging
    }
  }

  // async deleteCard(cardId) {
  //   try {
  //     const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
  //       method: "DELETE",
  //       headers: this._headers,
  //     });
  //     return await res.json();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

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

  async updateAvatar(avatarUrl) {
    try {
      const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: avatarUrl,
        }),
      });
      return await res.json();
    } catch (err) {
      console.log(err);
    }
  }
}
