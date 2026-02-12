import { useState, useEffect } from 'react';
import './HeroCard.css';

export default function HeroCard({ hero }) {
  const [imageError, setImageError] = useState(false);

  // Reset image error when hero changes
  useEffect(() => {
    setImageError(false);
  }, [hero.name]);

  // Get attribute color based on primary attribute
  const getAttributeClass = (attribute) => {
    if (attribute === 'Strength') return 'strength';
    if (attribute === 'Agility') return 'agility';
    if (attribute === 'Intelligence') return 'intelligence';
    return '';
  };

  // Convert hero name to match image filename
  const getImagePath = (name) => {
    const imageName = name.toLowerCase().replace(/\s+/g, '_');
    return `/images/heroes/${imageName}.png`;
  };

  // Filter out empty abilities
  const validAbilities = hero.abilities.filter(ability => ability.trim() !== '');

  return (
    <div className="hero-card">
      {/* Hero Header with Image */}
      <div className="hero-header">
        <div className="hero-header-text">
          <h3 className="hero-name">{hero.name}</h3>
          <div className="hero-meta">
            <span className={`hero-attribute ${getAttributeClass(hero.primary_attribute)}`}>
              {hero.primary_attribute}
            </span>
            <span className="hero-attack-type">{hero.attack_type}</span>
          </div>
        </div>
        {!imageError && (
          <div className="hero-image">
            <img 
              src={getImagePath(hero.name)} 
              alt={hero.name}
              onError={() => setImageError(true)}
            />
          </div>
        )}
      </div>

      {/* Base Stats */}
      <div className="hero-stats">
        <h4>Base Stats:</h4>
        <div className="stat-grid">
          <div className="stat-item strength">
            <span className="stat-label">Str</span>
            <span className="stat-value">{hero.strength}</span>
            <span className="stat-growth">+{hero.strength_growth}</span>
          </div>
          <div className="stat-item agility">
            <span className="stat-label">Agi</span>
            <span className="stat-value">{hero.agility}</span>
            <span className="stat-growth">+{hero.agility_growth}</span>
          </div>
          <div className="stat-item intelligence">
            <span className="stat-label">Int</span>
            <span className="stat-value">{hero.intelligence}</span>
            <span className="stat-growth">+{hero.intelligence_growth}</span>
          </div>
        </div>
      </div>

      {/* Abilities */}
      {validAbilities.length > 0 && (
        <div className="hero-abilities">
          <h4>Abilities:</h4>
          <ul>
            {validAbilities.map((ability, index) => (
              <li key={index}>{ability}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}