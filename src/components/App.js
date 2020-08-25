import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/api.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function App() {

    // State variable fot the current user's info
    const [currentUser, setCurrentUser] = React.useState({});
    // The effect hook with an empty second parameter will update once upon mounting,
    // i.e. one update after the API call
    React.useEffect(() => {
        api.getUserInfo()
            .then((res) => {setCurrentUser(res);})
            .catch((err) => {console.log(err)});
    }, []);


    // Declaration of three hooks that act as state variables for the visibility of each form
    const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false);
    const [isAddPlaceOpen, setIsAddPlaceOpen] = React.useState(false);
    const [isEditAvatarOpen, setIsEditAvatarOpen] = React.useState(false);

    // Selected card hook for state of Image Popup
    const [selectedCard, setSelectedCard] = React.useState(null);
    
    function handleEditAvatarClick() {
        setIsEditAvatarOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfileOpen(true);
    }
    
    function handleAddPlaceClick() {
        setIsAddPlaceOpen(true);
    }

    function closeAllPopups() {
        setIsEditAvatarOpen(false);
        setIsEditProfileOpen(false);
        setIsAddPlaceOpen(false);
        setSelectedCard(null);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

  return (
    <CurrentUserContext.Provider value={currentUser}>
        {/* Header section */}
        <Header />
        {/* Main content */}
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} onClose={closeAllPopups} />
        {/* Footer section */}
        <Footer />

        {/* Popup Edit User Info Form */}
        <PopupWithForm name="form-edit" title="Edit profile" isOpen={isEditProfileOpen} btnText="Save" onClose={closeAllPopups}>
            <label className="form__input-field">
                <input id="form-name" name="primary" className="form__name form__input" type="text" placeholder="Name" required minLength="2" maxLength="40" pattern="[A-Za-z -]*" />
                <span id="form-name-error" className="form__error"></span>
            </label>
            <label className="form__input-field">
                <input id="form-occupation" name="secondary" className="form__occupation form__input secondary" type="text" placeholder="About" required minLength="2" maxLength="200" />
                <span id="form-occupation-error" className="form__error"></span>
            </label>
        </PopupWithForm>

        {/* Popup Edit User Pic Form */}
        <PopupWithForm name="form-pic" title="Change userpic" isOpen={isEditAvatarOpen} btnText="Save" onClose={closeAllPopups}>
            <label className="form__input-field">
                <input id="form-name" name="primary" className="form__name form__input" type="url" placeholder="Image link" required />
                <span id="form-name-error" className="form__error"></span>
            </label>
        </PopupWithForm>

        {/* Popup Add Form */}   
        <PopupWithForm name="form-add" title="New place" isOpen={isAddPlaceOpen} btnText="Create" onClose={closeAllPopups}>
            <label className="form__input-field">
                <input id="form-place" name="primary" className="form__place form__input" type="text" placeholder="Title" required minLength="1" maxLength="30" />
                <span id="form-place-error" className="form__error"></span>
            </label>
            <label className="form__input-field">
                <input id="form-url" name="secondary" className="form__url form__input" type="url" placeholder="Image link" required />
                <span id="form-url-error" className="form__error"></span>
            </label>
        </PopupWithForm>

        {/* Popup Delete Form */}
        <PopupWithForm name="form-delete" title="Are you sure?" isOpen={null} btnText="Yes" onClose={closeAllPopups} />

        {/* Image Popup */}
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;