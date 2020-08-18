import React from 'react';
import api from '../utils/api.js';
import Card from './Card.js';

function Main(props) {

    // Declaration of hooks that act as state variables for user info and cards
    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([]);

    // Effect hook for updating of user info and cards
    React.useEffect(() => {
        const userInfoPromise = api.getUserInfo();
        const initialCardsPromise = api.getInitialCards();
        Promise.all([userInfoPromise, initialCardsPromise]).then((res) => {
            console.log(res);
            setUserName(res[0].name);
            setUserDescription(res[0].about);
            setUserAvatar(res[0].avatar);
            setCards(res[1]);
        });

    }, []);

    return (
        <main className="content">
            {/* Profile section at top of page, contains three buttons for editing profile and cards */}
            <section className="profile">
                <button type="button" className="profile__pic-button" onClick={props.onEditAvatar}></button>
                <div className="profile__picture" style={{ backgroundImage: `url(${userAvatar})` }} alt="My Profile Pic" />
                <div className="profile__info">
                    <h1 className="profile__name">{userName}</h1>
                    <p className="profile__occupation">{userDescription}</p>
                </div>
                <button type="button" aria-label="Edit Profile Button" className="profile__edit-button btn-animate" onClick={props.onEditProfile}></button>
                <button type="button" aria-label="Add Card Button" className="profile__add-button btn-animate" onClick={props.onAddPlace}></button>
            </section>

            {/* Image cards section, generated from server response */}
            <section className="cards">
                <ul className="cards__container">
                    {cards.map(card => (
                        <Card key={card._id} card={card} onCardClick={props.onCardClick} onClose={props.onClose} />
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;