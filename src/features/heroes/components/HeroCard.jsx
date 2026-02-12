import { useState, useEffect } from 'react';
import './HeroCard.css';

export default function HeroCard({ hero }) {
  const [imageError, setImageError] = useState(false);
  const [expandedAbility, setExpandedAbility] = useState(null);

  // Reset image error when hero changes
  useEffect(() => {
    setImageError(false);
    setExpandedAbility(null);
  }, [hero.name]);

  const toggleAbilityDescription = (abilityName) => {
    setExpandedAbility(expandedAbility === abilityName ? null : abilityName);
  };

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
  const validAbilities = hero.abilities.filter(ability => ability.name && ability.name.trim() !== '');

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
              <li key={index} className="ability-item">
                <button
                  className="ability-button"
                  onClick={() => toggleAbilityDescription(ability.name)}
                  aria-expanded={expandedAbility === ability.name}
                >
                  {ability.name}
                  {ability.type && <span className="ability-type">{ability.type}</span>}
                </button>
                {expandedAbility === ability.name && (
                  <div className="ability-description">
                    <p className="ability-desc-text">{ability.description}</p>
                    
                    {(ability.cooldown || ability.manaCost) && (
                      <div className="ability-stats">
                        {ability.cooldown && (
                          <div className="stat-row">
                            <span className="stat-label">Cooldown:</span>
                            <span className="stat-value cooldown">{ability.cooldown.join('/')}</span>
                          </div>
                        )}
                        {ability.manaCost && (
                          <div className="stat-row">
                            <span className="stat-label">Mana Cost:</span>
                            <span className="stat-value mana">{ability.manaCost.join('/')}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {ability.values && ability.values.length > 0 && (
                      <div className="ability-values">
                        {ability.values.map((value, vIndex) => (
                          <div key={vIndex} className="value-row">
                            <span className={`value-label ${value.color}`}>{value.label}:</span>
                            <span className={`value-levels ${value.color}`}>{value.levels.join('/')}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}