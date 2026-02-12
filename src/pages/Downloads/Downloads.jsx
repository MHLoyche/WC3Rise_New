import '../Home/Home.css'; // Reuse styles from Home for consistency
import './Downloads.css';

export default function Downloads() {
  return (
    <div className="home">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Get the newest version of Rise!</h1>
          <p className="hero-subtitle">A Warcraft III Custom Map Experience</p>
          <div className="hero-divider"></div>
        </div>
      </section>
      <section className="intro-section">
        <div className="content-container">
          <h2>All versions of Rise can be found on EpicWar</h2>
          <a href="https://www.epicwar.com/maps/?n=Rise&a=Relichunter" target="_blank" rel="noopener noreferrer">https://www.epicwar.com/maps/?n=Rise&a=Relichunter</a>
        </div>
      </section>
    </div>
  );
}