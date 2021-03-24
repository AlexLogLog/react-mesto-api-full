import React, { useState, useEffect } from 'react';
import '../index.css';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';

import { api } from '../utils/api';
import { newapi } from '../utils/newapi';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Switch, useHistory } from 'react-router-dom';


function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({
        open: false,
        link: '',
        name: '',
    });
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [loggedIn, setLoggedIn] = React.useState(false)
    const [infoTooltip, setInfoTooltip] = React.useState({
        message: '',
        icon: '',
        isOpen: false
    })
    const [userEmail, setUserEmail] = React.useState('')

    const history = useHistory();

    useEffect(() => {
        if (loggedIn) {
            Promise.all(
                [
                    api
                        .getCards(localStorage.token),
                    api
                        .getInfoAndAvatar(localStorage.token)])
                .then(([cardsList, userInfo]) => {
                    setCurrentUser(userInfo)
                    setCards(cardsList.reverse())
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [loggedIn]);

    function handleLogin({
        email,
        password }) {
        newapi
            .signin({
                email,
                password
            })
            .then((token) => {
                if (token) {
                    localStorage.setItem('token', token.token);
                    setLoggedIn(true);
                    checkToken();
                }
            })
            .catch((err) => {
                if (err.status === 400) {
                    setInfoTooltip({
                        message: 'Некорректно заполнено одно из полей',
                        img: 'err',
                        isOpen: true
                    })
                } else if (err.status === 401) {
                    setInfoTooltip({
                        message: 'Неверный логин или пароль',
                        img: 'err',
                        isOpen: true
                    })
                } else {
                    setInfoTooltip({
                        message: 'Что-то пошло не так! Попробуйте ещё раз',
                        img: 'err',
                        isOpen: true
                    })
                }
            })
    };

    function handleRegister({
        email,
        password
    }) {
        newapi
            .signup({
                email,
                password
            })
            .then((res) => {
                if (res) {
                    setInfoTooltip({
                        message: 'Вы успешно зарегистрировались!',
                        img: 'ok',
                        isOpen: true
                    })
                    history.push('/sign-in')
                }
            })
            .catch((err) => {
                if (err.status === 400) {
                    setInfoTooltip({
                        message: 'Некорректно заполнено одно из полей',
                        img: 'err',
                        isOpen: true
                    })
                } else if (err.status === 409) {
                    setInfoTooltip({
                        message: 'Вы уже зарегистрированы',
                        img: 'err',
                        isOpen: true
                    })
                } else {
                    setInfoTooltip({
                        message: 'Что-то пошло не так! Попробуйте ещё раз',
                        img: 'err',
                        isOpen: true
                    })
                }
            })
    };

    function checkToken() {
        if (localStorage.token) {
            newapi
                .getTokenEmail(localStorage.token)
                .then((res) => {
                    if (res) {
                        setLoggedIn(true)
                        history.push('/')
                        setUserEmail(res.email)
                    } else {
                        console.log('dfsdfds');
                        localStorage.removeItem('token')
                        setLoggedIn(false)
                        setCurrentUser({})
                        setUserEmail('')
                    }
                }).catch(() => {
                    localStorage.removeItem('token')
                })
        }
    };

    useEffect(() => {
        checkToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    function handleUpdateUser(newInfo) {
        api
            .updateInfo(newInfo, localStorage.token)
            .then(() => {
                api
                    .getInfoAndAvatar(localStorage.token)
                    .then((userInfo) => {
                        setCurrentUser(userInfo);
                    })
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleUpdateAvatar(newInfo) {
        api
            .updateAvatar(newInfo, localStorage.token)
            .then(() => {
                api
                    .getInfoAndAvatar(localStorage.token)
                    .then((userInfo) => {
                        setCurrentUser(userInfo);
                    })
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleAddPlaceSubmit(newCard) {
        api
            .newCard(newCard, localStorage.token)
            .then((result) => {
                setCards([result, ...cards]);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((element) =>
            element === currentUser._id);
        if (!isLiked) {
            api
                .countLikeApi(card, localStorage.token)
                .then((newCard) => {
                    const newCards = cards.map((element) =>
                        element._id === card._id ? newCard : element);
                    setCards(newCards);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {

            api
                .deleteLike(card, localStorage.token)
                .then((newCard) => {
                    const newCards = cards.map((element) =>
                        element._id === card._id ? newCard : element);
                    setCards(newCards);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    function handleLogout() {
        localStorage.removeItem('token');
        setLoggedIn(false);
        setCurrentUser({});
        setUserEmail('');
    }

    function handleCardDelete(card) {
        api
            .deleteCard(card, localStorage.token)
            .then(() => {
                setCards(cards.filter((element) =>
                    element._id !== card._id
                ));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard({
            open: false,
            link: '',
            name: '',
        });
        setInfoTooltip({
            open: false
        });
    }

    function handleCardClick(card) {
        const { link, name } = card;
        setSelectedCard({
            open: true,
            link: link,
            name: name
        });
    }

    return (
        <div className="root">
            <CurrentUserContext.Provider value={currentUser}>
                <Header
                    email={userEmail}
                    onLogout={handleLogout}
                />
                <Switch>
                    <Route path='/sign-in' exact>
                        <Login onLogin={handleLogin} />
                    </Route>
                    <Route path='/sign-up' exact>
                        <Register onRegister={handleRegister} />
                    </Route>
                    <Route path='/'>
                        <ProtectedRoute
                            component={Main}
                            loggedIn={loggedIn}
                            onCardDelete={handleCardDelete}
                            cards={cards}
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onEditAvatar={handleEditAvatarClick}
                            onCardClick={handleCardClick}
                            onCardLike={handleCardLike}
                        />
                    </Route>
                </Switch>

                <Footer loggedIn={loggedIn} />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}

                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}

                />

                <ImagePopup
                    isOpen={selectedCard.open}
                    name={selectedCard.name}
                    link={selectedCard.link}
                    onClose={closeAllPopups}
                />

                <InfoTooltip
                    message={infoTooltip.message}
                    img={infoTooltip.img}
                    isOpen={infoTooltip.isOpen}
                    onClose={closeAllPopups}
                />
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
