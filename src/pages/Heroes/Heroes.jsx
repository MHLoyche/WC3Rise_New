import { useState, useEffect } from 'react';
import HeroCard from '../../features/heroes/components/HeroCard';
import '../Items/Items.css'; // Reuse Items page styles
import '../Home/Home.css';
import './Heroes.css';

export default function Heroes() {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Load heroes data
  useEffect(() => {
    const loadHeroes = async () => {
      try {
        const response = await fetch('/data/heroes.json');
        if (!response.ok) {
          throw new Error('Failed to load heroes data');
        }
        const data = await response.json();
        
        // Filter out heroes with empty names
        const validHeroes = data.filter(hero => hero.name && hero.name.trim() !== '');
        setHeroes(validHeroes);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadHeroes();
  }, []);

  // Filter heroes based on search term
  const filteredHeroes = heroes.filter((hero) => {
    if (!searchTerm) return true;
    
    const query = searchTerm.toLowerCase();
    const nameMatch = hero.name.toLowerCase().includes(query);
    const attributeMatch = hero.primary_attribute.toLowerCase().includes(query);
    const attackTypeMatch = hero.attack_type.toLowerCase().includes(query);
    const abilitiesMatch = hero.abilities.some(ability => 
      ability.name.toLowerCase().includes(query)
    );
    const tagsMatch = hero.tags && hero.tags.some(tag => 
      tag.toLowerCase().includes(query)
    );
    
    return nameMatch || attributeMatch || attackTypeMatch || abilitiesMatch || tagsMatch;
  });

  if (loading) {
    return (
      <div className="home">
        <div className="loading">Loading heroes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Heroes of Rise</h1>
          <p className="hero-subtitle">Find your perfect hero for your upcoming adventure</p>
          <div className="hero-divider"></div>
        </div>
      </section>

      {/* Heroes Grid */}
      <section className="items-section">
        <div className="items-container">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search heroes by name, attribute, attack type, abilities, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                className="search-clear"
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {filteredHeroes.length > 0 ? (
            <>
              <p className="items-count">{filteredHeroes.length} hero{filteredHeroes.length !== 1 ? 'es' : ''} found</p>
              <div className="heroes-grid">
                {filteredHeroes.map((hero, index) => (
                  <HeroCard 
                    key={index}
                    hero={hero}
                  />
                ))}
              </div>
            </>
          ) : (
            <p className="no-results">No heroes found matching your search</p>
          )}
        </div>
      </section>
    </div>
  );
}