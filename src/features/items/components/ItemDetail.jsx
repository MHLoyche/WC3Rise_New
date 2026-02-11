import { useEffect, useState } from 'react';
import './ItemDetail.css';

export default function ItemDetail({ item, allItems, onItemClick, onClose }) {
  const [components, setComponents] = useState([]);
  const [upgrades, setUpgrades] = useState([]);

  useEffect(() => {
    if (!item || !allItems.length) {
      setComponents([]);
      setUpgrades([]);
      return;
    }

    // --- NEW LOGIC using structured fields ---

    // Find what this item can upgrade into
    const foundUpgrades = [];
    if (item.upgrades) {
      const upgradeNames = Array.isArray(item.upgrades) ? item.upgrades : [item.upgrades];
      upgradeNames.forEach(upgradeName => {
        const upgradeItem = allItems.find(i => i.name === upgradeName);
        if (upgradeItem) {
          foundUpgrades.push(upgradeItem);
        }
      });
    }
    setUpgrades(foundUpgrades);

    // Find what items combine to create THIS item (its components)
    const foundComponents = [];
    
    // First, check if this item has an "upgradesfrom" field (direct components list)
    if (item.upgradesfrom) {
        const componentNames = Array.isArray(item.upgradesfrom) ? item.upgradesfrom : [item.upgradesfrom];
        componentNames.forEach(compName => {
            const compItem = allItems.find(i => i.name === compName);
            if (compItem && !foundComponents.some(c => c.name === compItem.name)) {
                foundComponents.push(compItem);
            }
        });
    } else {
        // Fall back to the old logic: find items that upgrade into this one
        const baseItems = allItems.filter(other => 
            other.upgrades && (Array.isArray(other.upgrades) ? other.upgrades.includes(item.name) : other.upgrades === item.name)
        );

        if (baseItems.length > 0) {
            // Now, for each base item, find its corresponding pair
            baseItems.forEach(baseItem => {
                if (Array.isArray(baseItem.upgrades)) {
                    const upgradeIndex = baseItem.upgrades.indexOf(item.name);
                    if (upgradeIndex !== -1) {
                        const pairItemName = Array.isArray(baseItem.pairswith) ? baseItem.pairswith[upgradeIndex] : baseItem.pairswith;
                        const pairItem = allItems.find(i => i.name === pairItemName);
                        if (pairItem) {
                            // Check for duplicates before adding
                            if (!foundComponents.some(c => c.name === baseItem.name)) {
                                foundComponents.push(baseItem);
                            }
                            if (!foundComponents.some(c => c.name === pairItem.name)) {
                                foundComponents.push(pairItem);
                            }
                        }
                    }
                } else { // Single upgrade path
                    const pairItem = allItems.find(i => i.name === baseItem.pairswith);
                    if (pairItem) {
                        if (!foundComponents.some(c => c.name === baseItem.name)) {
                            foundComponents.push(baseItem);
                        }
                        if (!foundComponents.some(c => c.name === pairItem.name)) {
                            foundComponents.push(pairItem);
                        }
                    }
                }
            });
        }
    }
    setComponents(foundComponents);

  }, [item, allItems]);

  if (!item) {
    // Don't render anything if no item is selected, 
    // the parent's class handles visibility.
    return null; 
  }

  const getImagePath = (name) => {
    const imageName = name.toLowerCase();
    return `/images/items/${imageName}.png`;
  };

  const getRarityClass = (rarity) => {
    if (rarity.includes('Uncommon')) return 'uncommon';
    if (rarity.includes('Rare')) return 'rare';
    if (rarity.includes('Epic')) return 'epic';
    if (rarity.includes('Mythical')) return 'mythical';
    if (rarity.includes('Divine')) return 'divine';
    if (rarity.includes('Legendary')) return 'legendary';
    return '';
  };

  const rarityClass = item ? getRarityClass(item.rarity) : '';

  return (
    <aside className={`item-detail-panel ${item ? 'visible' : ''}`}>
      <div className="item-detail-header">
        <h4>Item Details</h4>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      {/* Available Upgrades Section */}
      {upgrades.length > 0 && (
        <div className="detail-section upgrades-section">
          <h4>Upgrades To:</h4>
          <div className="upgrade-items">
            {upgrades.map((upgrade, idx) => (
              <div 
                key={idx} 
                className={`upgrade-item clickable rarity-${getRarityClass(upgrade.rarity)}`}
                onClick={() => onItemClick(upgrade)}
              >
                <img src={getImagePath(upgrade.name)} alt={upgrade.name} />
                <span className="upgrade-name">{upgrade.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected Item Section */}
      <div className={`detail-section selected-item-section rarity-${rarityClass}`}>
        <div className="selected-item">
          <div className="selected-item-image">
            <img src={getImagePath(item.name)} alt={item.name} />
          </div>
          <div className="selected-item-info">
            <h3>{item.name}</h3>
            <span className={`item-rarity ${getRarityClass(item.rarity)}`}>
              {item.rarity}
            </span>
          </div>
        </div>

        <div className="selected-item-stats">
          <h4>Stats:</h4>
          <ul>
            {item.stats.map((stat, idx) => (
              <li key={idx}>{stat}</li>
            ))}
          </ul>
        </div>

        {item.combination && (
          <div className="selected-item-combination">
            <h4>Combination:</h4>
            <p dangerouslySetInnerHTML={{ __html: item.combination }} />
          </div>
        )}
      </div>

      {/* Components/Recipe Section */}
      {components.length > 0 && (
        <div className="detail-section components-section">
          <h4>Recipe (combine these):</h4>
          <div className="component-items">
            {components.map((component, idx) => (
              <div 
                key={idx} 
                className={`component-item clickable rarity-${getRarityClass(component.rarity)}`}
                onClick={() => onItemClick(component)}
              >
                <img src={getImagePath(component.name)} alt={component.name} />
                <span className="component-name">{component.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
