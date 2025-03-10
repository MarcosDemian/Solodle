import React from "react";
import "./CharacterCard.css";
import "../styles/fontGlitch.css"

const CharacterCard = ({ character, targetCharacter }) => {
  if (!character || !targetCharacter) return null;

  // Función para normalizar valores (quitar espacios, convertir a minúsculas, etc.)
  const normalizeValue = (value) => {
    if (Array.isArray(value)) {
      return value.map((item) => item.trim().toLowerCase());
    }
    return value.trim().toLowerCase();
  };

  // Función para determinar el color de fondo de las pistas
  const getBackgroundColor = (value, targetValue) => {
    const normalizedValue = normalizeValue(value);
    const normalizedTargetValue = normalizeValue(targetValue);

    // Si ambos son arrays, verificar si hay coincidencias
    if (Array.isArray(normalizedValue) && Array.isArray(normalizedTargetValue)) {
      if (normalizedValue.join() === normalizedTargetValue.join()) {
        return "green";
      }
      if (normalizedValue.some((item) => normalizedTargetValue.includes(item))) {
        return "yellow";
      }
      return "red";
    }

    // Si uno es array y el otro es string, verificar si el string está en el array
    if (Array.isArray(normalizedValue) && typeof normalizedTargetValue === "string") {
      if (normalizedValue.includes(normalizedTargetValue)) {
        return "green";
      }
      return "red";
    }

    if (Array.isArray(normalizedTargetValue) && typeof normalizedValue === "string") {
      if (normalizedTargetValue.includes(normalizedValue)) {
        return "green";
      }
      return "red"
    }

    if (normalizedValue === normalizedTargetValue) {
      return "green";
    }
    return "red";
  };

  return (
    <div className="character-card">
      <div className="character-image-container">
        <img src={character.image} alt={character.name} />
        <h3 className="character-name hero glitch layers" data-text={character.name}><span>{character.name}</span></h3>
      </div>
      <div className="clues">
        <div
          className={`clue-box ${
            getBackgroundColor(character.gender, targetCharacter.gender) === "green"
              ? "green"
              : getBackgroundColor(character.gender, targetCharacter.gender) === "yellow"
              ? "yellow"
              : "red"
          }`}
        >
          <span className="clue-label">Género:</span> {character.gender}
        </div>
        <div
          className={`clue-box ${
            getBackgroundColor(character.species, targetCharacter.species) === "green"
              ? "green"
              : getBackgroundColor(character.species, targetCharacter.species) === "yellow"
              ? "yellow"
              : "red"
          }`}
        >
          <span className="clue-label">Especie:</span> {character.species}
        </div>
        <div
          className={`clue-box ${
            getBackgroundColor(character.affiliation, targetCharacter.affiliation) === "green"
              ? "green"
              : getBackgroundColor(character.affiliation, targetCharacter.affiliation) === "yellow"
              ? "yellow"
              : "red"
          }`}
        >
          <span className="clue-label">Afiliación:</span> {character.affiliation}
        </div>
        <div
          className={`clue-box ${
            getBackgroundColor(character.main_weapon, targetCharacter.main_weapon) === "green"
              ? "green"
              : getBackgroundColor(character.main_weapon, targetCharacter.main_weapon) === "yellow"
              ? "yellow"
              : "red"
          }`}
        >
          <span className="clue-label">Arma/s:</span>{" "}
          {Array.isArray(character.main_weapon)
            ? character.main_weapon.join(", ")
            : character.main_weapon}
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;