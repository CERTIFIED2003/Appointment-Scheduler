import React, { useState, useRef } from 'react';

const EmailInput = ({ guests, setGuests }) => {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);

    const isValidEmail = (email) => {
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if (isValidEmail(event.target.value)) {
                const newGuest = { email: event.target.value };
                setGuests([...guests, newGuest]);
                setInputValue('');
            } else {
                alert('Invalid email address');
            }
        }
    };

    const handleAddGuest = () => {
        if (isValidEmail(inputValue)) {
            setGuests([...guests, { email: inputValue }]);
            setInputValue('');
        } else {
            alert('Invalid email address');
        }
    };

    return (
        <div>
            <label htmlFor="guest">Enter guest's email</label>
            <br />
            <input
                id="guest"
                type="email"
                ref={inputRef}
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Enter guest email"
            />
            <button type="button" onClick={handleAddGuest}>Add Guest</button>
            <ul>
                {guests.map((guest, index) => (
                    <li key={index}>{guest.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default EmailInput;