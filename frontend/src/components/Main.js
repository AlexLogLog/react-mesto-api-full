import React, { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

  const {
    cards,
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardClick,
    onCardLike,
    onCardDelete
  } = props;

  const { name, about, avatar, _id } = useContext(CurrentUserContext);


  return (
    <main>
      <section className="profile">

        <div className="profile__list">
          <div className="profile__list-about">
            <div className="profile__icon" onClick={onEditAvatar}>
              <img className="profile__image" src={avatar} alt="Аватар" />
            </div>

            <div className="profile__all">
              <div className="profile__info">
                <h1 className="profile__name">{name}</h1>
                <button className="profile__button-red" type="button" onClick={onEditProfile}></button>
              </div>
              <p className="profile__about">{about}</p>
            </div>
          </div>
          <button className="profile__button-new" type="button" onClick={onAddPlace}></button>
        </div>


      </section>

      <section className="card">

        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            id={_id}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />)
        )}
      </section>
    </main>
  );
}

export default Main;
