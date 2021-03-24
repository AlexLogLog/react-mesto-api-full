class NewApi {
    constructor(options) {
        this._url = options.url;
    }
    _error(res) {
        if (res.ok) {
            return res.json();
        } else return Promise.reject(`Ошибка: ${res.status}`);

    }
    signup({ email, password }) {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then((res) => this._error(res))
    }
    signin({ email, password }) {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then((res) => this._error(res))
    }

    getTokenEmail(token) {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        }).then((res) => this._error(res))
    }
}

export const newapi = new NewApi({
    url: 'http://api.domainname.students.nomoredomains.icu'
});