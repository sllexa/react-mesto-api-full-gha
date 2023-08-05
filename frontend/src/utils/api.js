class Api {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(this._url + url, options).then(this._checkResponse);
  }

  getCards() {
    return this._request('/cards', {
      method: 'GET',
      credentials: 'include', 
      headers: this._headers
    });
  }

  addCard(name, link) {
    return this._request('/cards', { 
      method: 'POST',
      credentials: 'include',
      headers: this._headers, 
      body: JSON.stringify({ name: name, link: link }) 
    });
  }

  getProfile() {
    return this._request('/users/me', {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    });
  }

  setProfile(name, about) {
    return this._request('/users/me', {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ name: name, about: about })
    });
  }

  setAvatar(avatar) {
    return this._request('/users/me/avatar', {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ avatar: avatar })
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
    });
  }

  setLikedCard(cardId, method) {
    return this._request(`/cards/${cardId}/likes`, {
      method: method,
      credentials: 'include',
      headers: this._headers
    });
  }
}

const api = new Api({
  url: 'http://localhost:4000',
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;