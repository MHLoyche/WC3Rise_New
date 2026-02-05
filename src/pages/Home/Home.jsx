import './Home.css';

export default function Home() {
  return (
    <div className="home">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Enter the Depths of Rise</h1>
          <p className="hero-subtitle">A Warcraft III Custom Map Experience</p>
          <div className="hero-divider"></div>
        </div>
      </section>

      <section className="intro-section">
        <div className="content-container">
          <h2>About the Game</h2>
          <p>
            Venture into the cursed lands of Azeroth, where ancient dungeons await the bravest of heroes. 
            Rise is an immersive dungeon crawler that challenges you to battle formidable bosses, collect 
            powerful artifacts, and uncover the dark secrets hidden beneath the surface.
          </p>
          <p>
            Choose your hero wisely - each possesses unique abilities and playstyles. Forge legendary weapons, 
            discover rare items, and combine them to create equipment of unimaginable power. The deeper you 
            descend, the greater the rewards... and the deadlier the threats.
          </p>
          <p>
            Face increasingly challenging encounters, from corrupted creatures to ancient guardians. Only the 
            most skilled adventurers will survive the trials that await in the deepest chambers. Will you rise 
            to the challenge, or fall to the darkness below?
          </p>
        </div>
      </section>

      <section className="features-section">
        <div className="content-container">
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">⚔️</div>
              <h3>Epic Boss Battles</h3>
              <p>Challenge powerful bosses with unique mechanics and devastating abilities</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🗡️</div>
              <h3>Legendary Items</h3>
              <p>Discover and craft hundreds of items with game-changing effects</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Diverse Heroes</h3>
              <p>Master different heroes with unique abilities and playstyles</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📜</div>
              <h3>Regular Updates</h3>
              <p>New content, balance changes, and features added frequently</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="content-container">
          <h2>About This Website</h2>
          <p>
            This database serves as your comprehensive guide to the world of Rise. Browse our extensive 
            collection of items, heroes, and bosses. Each entry includes detailed statistics, abilities, 
            and crafting recipes to help you plan your perfect build.
          </p>
          <p>
            Navigate through the menu to explore different sections: discover item combinations, learn 
            hero strategies, study boss mechanics, review patch notes, and download the latest version 
            of the map.
          </p>
          <div className="creator-info">
            <h3>Created by the Rise Development Team</h3>
            <p>
              This project is a labor of love, continuously updated and improved based on community 
              feedback. Join our community and embark on your journey through the depths!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}