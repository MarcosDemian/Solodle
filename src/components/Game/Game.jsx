import React, { useEffect, useState } from "react";
import { login, getRandomCharacter } from "../../services/api";
import GuessInput from "../GuessInput/GuessInput";
import CharacterCard from "../CharacterCard/CharacterCard";
import "./Game.css";
import "../styles/fontGlitch.css";

const Game = () => {
  const [targetCharacter, setTargetCharacter] = useState(null); 
  const [guesses, setGuesses] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allCharacters, setAllCharacters] = useState([]); 
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await login();
        const character = await getRandomCharacter(token);
        setTargetCharacter(character);

        const savedWin = localStorage.getItem("hasWon");
        const savedCharacter = localStorage.getItem("targetCharacter");

        if (savedWin === "true" && savedCharacter === character.name) {
          setHasWon(true); 
        }

        const response = await fetch(
          "https://solodleapi.up.railway.app/api/characters",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const characters = await response.json();
        setAllCharacters(characters);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleGuess = (character) => {
    if (character.name === targetCharacter.name) {
      setHasWon(true); 
      localStorage.setItem("hasWon", "true"); 
      localStorage.setItem("targetCharacter", targetCharacter.name); 
    }
    setGuesses([character, ...guesses]);
  };

  if (loading) {
    return <p>Cargando personaje del día...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="game">
      <h1 className="neon-text hero glitch layers" data-text="SOLODLE">
        <span>SOLODLE</span>
      </h1>
      <h2 className="neon-text">Adivina el personaje</h2>
      {hasWon ? (
        <div className="win-message">
          <h2 className="neon-text">
            ¡Felicidades! ¡Has adivinado el personaje!
          </h2>
          <CharacterCard
            character={targetCharacter}
            targetCharacter={targetCharacter}
          />
        </div>
      ) : (
        <>
          <GuessInput allCharacters={allCharacters} onGuess={handleGuess} />
          <div className="guesses">
            {guesses.map((guess, index) => (
              <CharacterCard
                key={index}
                character={guess}
                targetCharacter={targetCharacter}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Game;
