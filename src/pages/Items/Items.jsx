import { useState, useEffect } from 'react';
import './Items.css';
import '../Home/Home.css'; // Reuse styles from Home for consistency
import ItemCard from '../../features/items/components/ItemCard';
import FilterSidebar from '../../features/items/components/FilterSidebar';
import ItemDetail from '../../features/items/components/ItemDetail';
import { FaBars } from 'react-icons/fa';

export default function Items() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState({
    rarities: [],
    tiers: [],
    stats: []
  });

  useEffect(() => {
    fetch('/data/items.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        return response.json();
      })
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filter items based on search query and filters
  const filteredItems = items.filter((item) => {
    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const nameMatch = item.name.toLowerCase().includes(query);
      const rarityMatch = item.rarity.toLowerCase().includes(query);
      const statsMatch = item.stats.some(stat => stat.toLowerCase().includes(query));
      const combinationMatch = item.combination && item.combination.toLowerCase().includes(query);
      
      if (!nameMatch && !rarityMatch && !statsMatch && !combinationMatch) {
        return false;
      }
    }

    // Rarity filter
    if (filters.rarities.length > 0) {
      const matchesRarity = filters.rarities.some(rarity => 
        item.rarity.includes(rarity)
      );
      if (!matchesRarity) return false;
    }

    // Tier filter
    if (filters.tiers.length > 0) {
      const matchesTier = filters.tiers.some(tier => 
        item.rarity.includes(tier)
      );
      if (!matchesTier) return false;
    }

    // Stats filter
    if (filters.stats.length > 0) {
      const matchesStat = filters.stats.every(stat =>
        item.stats.some(itemStat => itemStat.includes(stat))
      );
      if (!matchesStat) return false;
    }

    return true;
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const toggleFilterSidebar = () => {
    setFilterVisible(!isFilterVisible);
  };

  return (
    <div className="items">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Items</h1>
          <p className="hero-subtitle">Learn about the upgrade paths and stats of the items</p>
          <div className="hero-divider"></div>
        </div>
      </section>

      <section className="items-section">
        <div className="content-container">
          {!loading && !error && (
            <>
              <div className="search-container">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search items by name, stats, or rarity..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button 
                    className="search-clear"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="items-layout">
                <button className="filter-toggle-btn" onClick={toggleFilterSidebar}>
                  <FaBars />
                </button>

                <FilterSidebar 
                  onFilterChange={handleFilterChange} 
                  isVisible={isFilterVisible}
                  onClose={toggleFilterSidebar}
                />
                
                <div className="items-content">
                  {filteredItems.length > 0 ? (
                    <>
                      <p className="items-count">{filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} found</p>
                      <div className="items-grid">
                        {filteredItems.map((item, index) => (
                          <ItemCard 
                            key={index} 
                            item={item} 
                            onClick={() => handleItemClick(item)}
                            isSelected={selectedItem?.name === item.name}
                          />
                        ))}
                      </div>
                    </>
                  ) : (
                    <p className="no-results">No items found matching your filters</p>
                  )}
                </div>

                <ItemDetail 
                  item={selectedItem} 
                  allItems={items}
                  onItemClick={handleItemClick}
                  onClose={() => setSelectedItem(null)}
                />
              </div>
            </>
          )}
          {loading && <p className="loading-text">Loading items...</p>}
          {error && <p className="error-text">Error: {error}</p>}
        </div>
      </section>
    </div>
  );
}