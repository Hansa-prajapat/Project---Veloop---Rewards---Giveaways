import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

function App() {
  const [ads, setAds] = useState(0);
  const [ves, setVes] = useState(0);

  const watchAd = () => {
    if (ads < 6) {
      setAds(ads + 1);
      setVes(ves + 38);
    }
  };

  return (
    <div className="app">
      <div className="phone">

        <header className="header">
          <button className="menu">☰</button>

          <div className="logo">
            <small>VELOOP</small>
            <b>Watch Ads</b>
          </div>

          <div className="balance">💰 12,450 VEs</div>
          <div className="profile">S</div>
        </header>

        <main>

          <div className="badge">✦ EARNING CENTER</div>

          <h1>
            Watch Ads.<br />
            <span>Earn More VEs.</span>
          </h1>

          <p className="subtitle">
            Turn a few seconds of your time into real rewards.
            Watch short advertisements, collect VEs and grow your daily earnings.
          </p>

          <div className="stats">

            <div className="stat">
              <span>💜</span>
              <small>Total Earned</small>
              <b>12,523 VEs</b>
            </div>

            <div className="stat">
              <span>📈</span>
              <small>Today</small>
              <b>+{ves || 96} VEs</b>
            </div>

            <div className="stat">
              <span>▶</span>
              <small>Available</small>
              <b>{6 - ads} Ads</b>
            </div>

          </div>

          <div className="goal">
            <div className="goal-title">
              <span>Today's earning goal</span>
              <b>{ves + 96} / 200 VEs</b>
            </div>

            <div className="progress">
              <div
                className="progress-bar"
                style={{ width: `${Math.min(((ves + 96) / 200) * 100, 100)}%` }}
              ></div>
            </div>

            <div className="goal-bottom">
              <span>104 VEs remaining</span>
              <b>{Math.min(Math.round(((ves + 96) / 200) * 100), 100)}%</b>
            </div>
          </div>

          <div className="reward">
            <div className="reward-tag">⚡ +38 VEs</div>

            <div className="ad-card">

              <div className="ad-time">AD • 30 SEC</div>

              <button className="play" onClick={watchAd}>
                ▶
              </button>

              <div className="ready">READY TO EARN</div>
              <b>WATCH & REWARD</b>

            </div>

            <div className="bonus">↗ +20 VEs</div>

            <div className="earned">
              ⚡ <span>Potential reward</span>
              <b>+104 VEs</b>
              ↗
            </div>
          </div>

        </main>

        <footer>
          <div>▣ Today <b>{ves + 96} VEs</b></div>
          <div>▣ Ads <b>{ads}/6</b></div>
          <div>● Goal <b>104 VEs</b></div>
        </footer>

      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
