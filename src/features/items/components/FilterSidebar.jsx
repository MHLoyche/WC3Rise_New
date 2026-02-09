import { useState } from 'react';
import './FilterSidebar.css';

export default function FilterSidebar({ onFilterChange, isVisible, onClose }) {
  const [selectedRarities, setSelectedRarities] = useState([]);
  const [selectedTiers, setSelectedTiers] = useState([]);
  const [selectedStats, setSelectedStats] = useState([]);

  const rarities = ['Uncommon', 'Common', 'Rare', 'Epic', 'Legendary'];
  const tiers = ['Tier 1', 'Tier 2', 'Tier 3', 'Tier 4', 'Tier 5'];
  const stats = [
    'Agility',
    'Intelligence',
    'Strength',
    'Mana',
    'Mana Regeneration',
    'Health',
    'Health Regeneration',
    'Attack Damage',
    'Attack Speed',
    'Armor'
  ];

  const handleRarityChange = (rarity) => {
    const newRarities = selectedRarities.includes(rarity)
      ? selectedRarities.filter(r => r !== rarity)
      : [...selectedRarities, rarity];
    
    setSelectedRarities(newRarities);
    onFilterChange({
      rarities: newRarities,
      tiers: selectedTiers,
      stats: selectedStats
    });
  };

  const handleTierChange = (tier) => {
    const newTiers = selectedTiers.includes(tier)
      ? selectedTiers.filter(t => t !== tier)
      : [...selectedTiers, tier];
    
    setSelectedTiers(newTiers);
    onFilterChange({
      rarities: selectedRarities,
      tiers: newTiers,
      stats: selectedStats
    });
  };

  const handleStatChange = (stat) => {
    const newStats = selectedStats.includes(stat)
      ? selectedStats.filter(s => s !== stat)
      : [...selectedStats, stat];
    
    setSelectedStats(newStats);
    onFilterChange({
      rarities: selectedRarities,
      tiers: selectedTiers,
      stats: newStats
    });
  };

  const clearAllFilters = () => {
    setSelectedRarities([]);
    setSelectedTiers([]);
    setSelectedStats([]);
    onFilterChange({ rarities: [], tiers: [], stats: [] });
  };

  const hasActiveFilters = selectedRarities.length > 0 || selectedTiers.length > 0 || selectedStats.length > 0;

  return (
    <aside className={`filter-sidebar ${isVisible ? 'visible' : ''}`}>
      <div className="filter-header">
        <h3>Filters</h3>
        <div className="filter-header-controls">
          {hasActiveFilters && (
            <button className="clear-filters" onClick={clearAllFilters}>
              Clear All
            </button>
          )}
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
      </div>

      <div className="filter-section">
        <h4>Rarity</h4>
        <div className="filter-options">
          {rarities.map((rarity) => (
            <label key={rarity} className="filter-option">
              <input
                type="checkbox"
                checked={selectedRarities.includes(rarity)}
                onChange={() => handleRarityChange(rarity)}
              />
              <span>{rarity}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4>Tier</h4>
        <div className="filter-options">
          {tiers.map((tier) => (
            <label key={tier} className="filter-option">
              <input
                type="checkbox"
                checked={selectedTiers.includes(tier)}
                onChange={() => handleTierChange(tier)}
              />
              <span>{tier}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4>Stats</h4>
        <div className="filter-options">
          {stats.map((stat) => (
            <label key={stat} className="filter-option">
              <input
                type="checkbox"
                checked={selectedStats.includes(stat)}
                onChange={() => handleStatChange(stat)}
              />
              <span>{stat}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
