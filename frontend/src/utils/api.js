class Api {
  constructor(options) {
    this._url = options.url;
  }


  _error(res) {
    if (res.ok) {
      return res.json();
    } else return Promise.reject(`Ошибка: ${res.status}`);

  }

  getCards(token) {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }}).then(this._error)
  }

  newCard(info, token) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(
        info
      )
    }).then(this._error)
  }

  deleteCard(info, token) {
    return fetch(`${this._url}/cards/${info._id}`, {
      method: 'DELETE',
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then(this._error)
  }

  getInfoAndAvatar(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }}).then(this._error)
  }

  updateInfo(info, token) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers:{
        "Accept": "application/json",
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(
        info
      )
    }).then(this._error)
  }

  updateAvatar(info, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(
        info
      )
    }).then(this._error)
  }


  deleteLike(info, token) {
    return fetch(`${this._url}/cards/${info._id}/likes`, {
      method: 'DELETE',
      headers:{
        "Accept": "application/json",
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    }).then(this._error)
  }

  countLikeApi(info, token) {
    return fetch(`${this._url}/cards/${info._id}/likes`, {
      method: 'PUT',
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    }).then(this._error)
  }



}

export const api = new Api({
  url: 'https://api.domainname.students.nomoredomains.icu',
});