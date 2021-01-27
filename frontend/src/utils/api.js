class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers
  }

  _handleOriginalResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }

  setUserAvatar(data, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    }).then(this._handleOriginalResponse)
  }

  changeLikeCardStatus(id, isLiked, token) {
    if (isLiked) {
      return this.deleteLike(id, token);
    } else {
      return this.setLike(id, token);
    }
  }

  deleteLike(id, token) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      },
    }).then(this._handleOriginalResponse)
  }

  setLike(id, token) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'PUT',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      },
    }).then(this._handleOriginalResponse)
  }

  deleteCard(id, token) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      },
    }).then(this._handleOriginalResponse)
  }

  postCard(data, token) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then(this._handleOriginalResponse)
  }

  setUserInfo(data, token) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }).then(this._handleOriginalResponse)
  }

  getInitialData(token) {
    return Promise.all([this.getUserInfo(token), this.getCards()]);
  }

  getCards(token) {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      },
    }).then(this._handleOriginalResponse)
  }

  getUserInfo(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      },
    }).then(this._handleOriginalResponse)
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3000',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

export default api;
