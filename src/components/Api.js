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
      return await this.checkResponse(res);
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
      return await this.checkResponse(res);
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

      return await this.checkResponse(res);
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

      return await this.checkResponse(res);
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

      return await this.checkResponse(res);
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
      console.log("Adding like to card ID:", cardId); // Check the card ID
      const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers,
      });

      const jsonRes = await this.checkResponse(res); // Parse the response
      console.log("Response JSON", jsonRes);
      return jsonRes;
    } catch (err) {
      console.log(err);
    }
  }

  async removeLike(cardId) {
    try {
      console.log("Removing like from card ID:", cardId); // Check the card ID
      const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers,
      });

      const jsonRes = await this.checkResponse(res); // Parse the response
      console.log("Response JSON", jsonRes);
      return jsonRes;
    } catch (err) {
      console.log(err);
    }
  }

  // async addLike(cardId) {
  //   try {
  //     console.log("Adding like to card ID:", cardId);
  //     const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
  //       method: "PUT",
  //       headers: this._headers,
  //     });
  //     this.checkResponse(res);
  //     return await res.json();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // async removeLike(cardId) {
  //   try {
  //     console.log("Removing like from card ID:", cardId);
  //     const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
  //       method: "DELETE",
  //       headers: this._headers,
  //     });
  //     this.checkResponse(res);
  //     return await res.json();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.addLike(cardId);
    } else {
      return this.removeLike(cardId);
    }
  }

  // async checkResponse(res) {
  //   if (!res.ok) {
  //     return Promise.reject(`Error: ${res.status}`);
  //   }
  //   return res.json();
  // }

  async checkResponse(res) {
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return await res.json();
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
      return await this.checkResponse(res);
    } catch (err) {
      console.log(err);
    }
  }
}
