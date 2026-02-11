import './Home.css';

export default function Home() {
  return (
    <div className="home">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Enter the game of Rise</h1>
          <p className="hero-subtitle">A Warcraft III Custom Map Experience</p>
          <div className="hero-divider"></div>
        </div>
      </section>

      <section className="intro-section">
        <div className="content-container">
          <h2>About the Game</h2>
          <p>
            Venture into the lands of Rise, where gruelling trials await the bravest of heroes.
            Rise is a game mode that challenges you to battle formidable bosses, collect 
            powerful artifacts, and uncover the secrets hidden beneath the surface.
          </p>
          <p>
            Choose your hero wisely - each possesses unique abilities and playstyles. Forge legendary weapons, 
            discover rare items, and combine them to create equipment of unimaginable power. The further you travel, 
            the greater the rewards... and the deadlier the threats.
          </p>
          <p>
            Face increasingly challenging encounters, from humanoid adversaries to demonic creatures. Only the 
            most skilled adventurers will survive the trials that await in the deepest chambers. Will you rise 
            to the challenge, or fall to the darkness?
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
            <div className="feature-card">
              <div className="feature-icon">🌐</div>
              <h3>Community Driven</h3>
              <p>Engage with our community and contribute to the game's development</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎮</div>
              <h3>Single- & multiplayer</h3>
              <p>Try both modes and enjoy the full Rise experience</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="content-container">
          <h2>About This Website</h2>
          <p>
            This website serves as your wiki to the world of Rise. Browse the extensive 
            collection of items, heroes, and bosses.
          </p>
          <p>
            Navigate through the menu to explore different sections: discover item combinations, learn 
            hero strategies, study boss mechanics, and download the latest version 
            of the map so you can host a new game yourself!
          </p>
          <p>
            This website is developed by AweSatura - a passionate gamer and developer who has been following Rise since the early days.
          </p>
          <div className="creator-info">
            <h3>Rise is created by Rel!chunter</h3>
            <p>
              This game-project is a labor of love, continuously updated and improved based on community 
              feedback. Join our community on discord and embark on your journey!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}