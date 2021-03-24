import React from 'react';

function Card(props) {

    const {
        card,
        onCardClick,
        id,
        onCardLike,
        onCardDelete
    } = props;

    function handleLikeClick() {
        return onCardLike(card);
    }

    function handleDeleteClick() {
        return onCardDelete(card);
    }
    const isOwn = card.owner === id;
    const isLiked = card.likes.some(i => i === id);

    const cardDeleteButtonClassName = (
        `card__basket ${isOwn ? 'card__basket' : 'card__basket_hidden'}`
    );
    const cardLikeButtonClassName = `card__like ${isLiked ? 'card__like_active' : 'card__like'}`;

    function handleClick() {
        onCardClick(card);
    }



    return (
        <div className="card__id">
            <div className="card__element">
                <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}></button>
                <img className="card__img" src={card.link} alt={card.name} onClick={handleClick} />
                <div className="card__about">
                    <h3 className="card__name">{card.name}</h3>
                    <div>
                        <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                        <p className="card__like-number">{card.likes.length}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;