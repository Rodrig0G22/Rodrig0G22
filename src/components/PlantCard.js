import React, { useState } from 'react';

const PlantCard = ({ name, description, imageSrc, addToFavorites, removeFromFavorites, esFavorita }) => {
  const [favorita, setFavorita] = useState(esFavorita);

  const handleToggleFavorite = () => {
    if (favorita) {
      removeFromFavorites();
    } else {
      addToFavorites();
    }
    setFavorita(!favorita);
  };

  return (
    <div className="plant-card">
      <div className="card-image">
        <img
          src={imageSrc}
          alt={name}
          className="card-img"
        />
        <div
          className={`heart-icon ${favorita ? 'active' : ''}`}
          onClick={handleToggleFavorite}
        >
          <svg fill={favorita ? "#FF0000" : "#808080"} height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 21.35l-1.45-1.32C6.4 15.36 3 12.28 3 8.5 3 5.42 5.42 3 8.5 3 10.12 3 11.65 4.11 12 5.39 12.35 4.11 13.88 3 15.5 3 18.58 3 21 5.42 21 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
      </div>
      <div className="card-content">
        <div className="plant-name-top">{name}</div>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default PlantCard;
