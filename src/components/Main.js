import React from 'react';
import api from '../utils/api.js';
import Card from './Card.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Main(props) {

    // Import of context value from provider
    const currentUser = React.useContext(CurrentUserContext);

    // Declaration of hooks that act as state variables for cards
    const [cards, setCards] = React.useState([]);

    // Effect hook for updating of user info and cards
    React.useEffect(() => {
        api.getInitialCards()
            .then((res) => {setCards(res);})
            .catch((err) => {console.log(err)});
    }, []);

    return (
        <main className="content">
            {/* Profile section at top of page, contains three buttons for editing profile and cards */}
            <section className="profile">
                <button type="button" className="profile__pic-button" onClick={props.onEditAvatar}></button>
                <div className="profile__picture" style={{ backgroundImage: `url(${currentUser.avatar})` }} alt="My Profile Pic" />
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <p className="profile__occupation">{currentUser.about}</p>
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