import { useState, useEffect } from 'react';
import './ItemCard.css';

export default function ItemCard({ item, onClick, isSelected }) {
  const [imageError, setImageError] = useState(false);

  // Reset image error when item changes
  useEffect(() => {
    setImageError(false);
  }, [item.name]);

  const getRarityClass = (rarity) => {
    if (rarity.includes('Uncommon')) return 'uncommon';
    if (rarity.includes('Rare')) return 'rare';
    if (rarity.includes('Epic')) return 'epic';
    if (rarity.includes('Relic')) return 'relic';
    if (rarity.includes('Divine')) return 'divine';
    if (rarity.includes('Legendary')) return 'legendary';
    return '';
  };

  // Convert item name to match image filename (lowercase)
  const getImagePath = (name) => {
    const imageName = name.toLowerCase();
    return `/images/items/${imageName}.png`;
  };

  return (
    <div 
      className={`item-card ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <div className="item-header">
        <div className="item-header-text">
          <h3 className="item-name">{item.name}</h3>
          <span className={`item-rarity ${getRarityClass(item.rarity)}`}>
            {item.rarity}
          </span>
        </div>
        {!imageError && (
          <div className="item-image">
            <img 
              src={getImagePath(item.name)} 
              alt={item.name}
              onError={() => setImageError(true)}
            />
          </div>
        )}
      </div>

      <div className="item-stats">
        <h4>Stats:</h4>
        <ul>
          {item.stats.map((stat, index) => (
            <li key={index}>{stat}</li>
          ))}
        </ul>
      </div>

      {item.combination && (
        <div className="item-combination">
          <h4>Combination:</h4>
          <p dangerouslySetInnerHTML={{ __html: item.combination }} />
        </div>
      )}
    </div>
  );
}
