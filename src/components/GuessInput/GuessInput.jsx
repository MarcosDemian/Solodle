import React, { useState } from "react";
import "./GuessInput.css";

const GuessInput = ({ allCharacters, onGuess }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [attemptedCharacters, setAttemptedCharacters] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value) {
      const filteredCharacters = allCharacters.filter(
        (character) =>
          character.name.toLowerCase().includes(value.toLowerCase()) &&
          !attemptedCharacters.includes(character.id)
      );
      setSuggestions(filteredCharacters);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectCharacter = (character) => {
    setInputValue("");
    setSuggestions([]);
    onGuess(character);

    setAttemptedCharacters((prevAttempted) => [...prevAttempted, character.id]);
  };

  return (
    <div className="guess-input">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const selectedCharacter = allCharacters.find(
            (character) =>
              character.name.toLowerCase() === inputValue.toLowerCase() &&
              !attemptedCharacters.includes(character.id)
          );
          if (selectedCharacter) {
            handleSelectCharacter(selectedCharacter);
          }
        }}
      >
        <input
          className="character-input"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Ingresa el nombre del personaje"
        />
      </form>
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((character) => (
            <li
              className="neon-text"
              key={character.id}
              onClick={() => handleSelectCharacter(character)}
            >
              <img
                className="list-img"
                src={character.image_150x150}
                alt={character.name}
              />
              {character.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GuessInput;