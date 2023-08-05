class Auth {
  constructor(baseUrl) {
    this._url = baseUrl;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(this._url + url, options).then(this._checkResponse);
  }

  registerUser(email, password) {
    return this._request('/signup', {
      method: 'POST',
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
  }

  loginUser(email, password) {
    return this._request('/signin', {
      method: 'POST',
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
  }

  checkToken() {
    return this._request('/users/me', {
      method: 'GET',
      credentials: 'include',
      headers: { "Content-Type": "application/json" }
    });
  }

  logOut() {
    return this._request('/logout', {
      method: 'GET',
      credentials: 'include',
      headers: { "Content-Type": "application/json" }
    });
  }
}

const auth = new Auth('http://localhost:4000');

export default auth;