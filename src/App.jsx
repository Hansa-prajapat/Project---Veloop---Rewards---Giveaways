import { useEffect, useMemo, useState } from "react";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, Check, ChevronDown, Clock3, Gift, ShieldCheck,
  Sparkles, Trophy, UserRound, WalletCards, Play, X, AlertCircle, RotateCcw
} from "lucide-react";
import { initialAds, adConfig } from "./data/adData";
import { giveawayData, previousWinners, winnerData, winnerMessages } from "./data/giveawayData";
import { useCountdown } from "./hooks/useCountdown";

const currencyLabel = (currency) => currency === "Tokens" ? "Tokens" : currency;

function App() {
  const [ads, setAds] = useState(initialAds);
  const [tokens, setTokens] = useState(0);
  const [adModal, setAdModal] = useState(null);
  const [adFlow, setAdFlow] = useState("idle");
  const [adTime, setAdTime] = useState(0);
  const [adReward, setAdReward] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  const watched = ads.filter(a => a.status === "watched").length;
  const dailyProgress = Math.round((watched / adConfig.dailyTarget) * 100);
  const stats = useMemo(() => ({
    watched,
    remaining: ads.filter(a => a.status === "available").length,
    earned: tokens
  }), [ads, tokens]);

  useEffect(() => {
    if (!adModal || adFlow !== "watching") return;
    if (adTime <= 0) {
      setAdFlow("completed");
      const reward = adModal.reward;
      setTokens(v => v + reward);
      setAds(list => list.map(a => a.id === adModal.id ? { ...a, status: "watched" } : a));
      setAdReward(reward);
      return;
    }
    const t = setTimeout(() => setAdTime(v => v - 1), 1000);
    return () => clearTimeout(t);
  }, [adModal, adFlow, adTime]);

  const openAd = (ad) => {
    if (ad.status === "watched") {
      setAdModal(ad); setAdFlow("already"); return;
    }
    setAdModal(ad);
    setAdFlow("loading");
    setAdReward(null);
    setTimeout(() => {
      setAdTime(ad.duration);
      setAdFlow("watching");
    }, 650);
  };

  const closeAd = () => {
    setAdModal(null);
    setAdFlow("idle");
    setAdReward(null);
  };

  return (
    <Routes>
      <Route path="*" element={
        <MainShell
          stats={stats}
          dailyProgress={dailyProgress}
          tokens={tokens}
          ads={ads}
          onWatch={openAd}
          showLogin={() => setShowLogin(true)}
          adModal={adModal}
          adFlow={adFlow}
          adTime={adTime}
          adReward={adReward}
          onCloseAd={closeAd}
        />
      } />
      <Route path="/giveaway/:slug" element={
        <GiveawayDetails onLogin={() => setShowLogin(true)} />
      } />
    </Routes>
  );
}

function MainShell({ stats, dailyProgress, tokens, ads, onWatch, showLogin, adModal, adFlow, adTime, adReward, onCloseAd }) {
  return (
    <div className="app">
      <Navbar onLogin={showLogin} />
      <main>
        <Hero />
        <section className="section-wrap" id="watch">
          <SectionHeading eyebrow="EARN WITH YOUR TIME" title="Watch & Earn" text="Complete eligible ad previews, wait for the timer to finish, and your reward is added automatically." />
          <div className="stats-grid mb-4">
            <Stat icon={<Play size={18}/>} label="Ads Watched" value={`${stats.watched}/6`} />
            <Stat icon={<Clock3 size={18}/>} label="Ads Available" value={stats.remaining} />
            <Stat icon={<WalletCards size={18}/>} label="Today Earned" value={`${stats.earned} Tokens`} />
            <Stat icon={<Trophy size={18}/>} label="Daily Goal" value={`${dailyProgress}%`} />
          </div>
          <div className="progress-card mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <div><strong>Daily progress</strong><span className="muted ms-2">{stats.watched} of {adConfig.dailyTarget} completed</span></div>
              <span className="progress-percent">{dailyProgress}%</span>
            </div>
            <div className="progress-track mt-3"><div className="progress-fill" style={{width: `${dailyProgress}%`}} /></div>
            <div className="tiny mt-2">Rewards shown here are fictional demo values for frontend development.</div>
          </div>
          {ads.every(a => a.status === "watched") ? (
            <EmptyAds />
          ) : (
            <div className="ads-grid">
              {ads.map(ad => <AdCard key={ad.id} ad={ad} onWatch={onWatch} />)}
            </div>
          )}
        </section>

        <GiveawayHome />
        <HowItWorks />
        <Trust />
        <FAQ />
      </main>
      <Footer />
      {adModal && (
        <WatchAdModal
          ad={adModal}
          flow={adFlow}
          timeLeft={adTime}
          reward={adReward}
          onClose={onCloseAd}
        />
      )}
    </div>
  );
}

function Navbar({ onLogin }) {
  return <nav className="navbar-custom">
    <div className="nav-inner">
      <Link to="/" className="brand"><span className="brand-mark">V</span><span>VELOOP <b>Rewards</b></span></Link>
      <div className="nav-links">
        <a href="#watch">Watch & Earn</a>
        <a href="#giveaways">Giveaways</a>
        <a href="#rules">Rules</a>
      </div>
      <button className="btn-outline" onClick={onLogin}><UserRound size={16}/> Login</button>
    </div>
  </nav>;
}

function Hero() {
  return <section className="hero">
    <div className="hero-copy">
      <span className="eyebrow"><Sparkles size={14}/> EXCLUSIVE REWARDS</span>
      <h1>Turn small moments into <span>reward progress.</span></h1>
      <p>Watch eligible previews, build your daily progress, and explore premium giveaway opportunities in one trustworthy rewards experience.</p>
      <div className="hero-actions">
        <a className="btn-primary" href="#watch">Start Earning <ArrowRight size={17}/></a>
        <a className="btn-soft" href="#giveaways">Explore Giveaways</a>
      </div>
      <div className="hero-trust"><ShieldCheck size={17}/> Clear rules · Transparent demo data · No hidden entry costs</div>
    </div>
    <div className="hero-visual">
      <div className="glow-orb orb-one"/><div className="glow-orb orb-two"/>
      <div className="reward-box"><Gift size={48}/><span>REWARD</span><strong>VAULT</strong></div>
      <div className="float-chip chip-a">+20 Tokens</div>
      <div className="float-chip chip-b">Giveaway Live</div>
      <div className="float-chip chip-c">✓ Progress</div>
    </div>
  </section>;
}

function SectionHeading({eyebrow, title, text}) {
  return <div className="section-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2><p>{text}</p></div>;
}

function Stat({icon,label,value}) {
  return <div className="stat-card"><div className="stat-icon">{icon}</div><div><div className="muted tiny">{label}</div><strong>{value}</strong></div></div>;
}

function AdCard({ ad, onWatch }) {
  const watched = ad.status === "watched";
  return <article className={`ad-card ${watched ? "is-watched" : ""}`}>
    <div className="ad-top"><div className="ad-icon">{ad.icon}</div><span className="status-pill">{watched ? "WATCHED" : "AVAILABLE"}</span></div>
    <div className="ad-category">{ad.category}</div>
    <h3>{ad.title}</h3>
    <p>{ad.description}</p>
    <div className="ad-meta"><span><Clock3 size={15}/> {ad.duration}s</span><span className="reward">+{ad.reward} {ad.currency}</span></div>
    <button className={watched ? "btn-disabled" : "btn-primary full"} disabled={false} onClick={() => onWatch(ad)}>
      {watched ? <><Check size={16}/> Already Watched</> : <><Play size={16}/> Watch Ad</>}
    </button>
  </article>;
}

function EmptyAds() {
  return <div className="empty-state"><div className="empty-icon"><Check size={28}/></div><h3>No Ads Available</h3><p>You have completed all eligible ads for today. New eligible ads can appear when the next daily cycle becomes available.</p></div>;
}

function GiveawayHome() {
  return <section className="section-wrap" id="giveaways">
    <div className="giveaway-banner">
      <div><span className="eyebrow">EXCLUSIVE GIVEAWAY</span><h2>Summer Rewards Giveaway</h2><p>Complete eligible activities, collect entries and get a chance to win premium rewards.</p><a className="btn-primary" href="#prizes">View Rewards <ArrowRight size={16}/></a></div>
      <div className="banner-art"><div className="ticket">GIVEAWAY<div>LIVE</div></div><Gift size={76}/></div>
    </div>
    <div className="stats-grid mt-4">
      <Stat icon={<Gift size={18}/>} label="Total Giveaways" value="24" />
      <Stat icon={<UserRound size={18}/>} label="Participants" value="8.5K+" />
      <Stat icon={<Trophy size={18}/>} label="Prizes Won" value="1.2K+" />
      <CountdownStat />
    </div>
    <div id="prizes" className="section-heading compact mt-5"><span className="eyebrow">FEATURED REWARDS</span><h2>Choose your giveaway</h2><p>Every Join Now action opens its own details page before any participation is recorded.</p></div>
    <div className="prize-grid">{giveawayData.prizes.map(p => <PrizeCard key={p.id} prize={p}/>)}</div>
    <Winners />
  </section>;
}

function CountdownStat() {
  const c = useCountdown(giveawayData.endAt);
  return <Stat icon={<Clock3 size={18}/>} label="Giveaway Ends In" value={`${c.days}d ${String(c.hours).padStart(2,"0")}h`} />;
}

function PrizeCard({prize}) {
  return <article className="prize-card">
    <div className="prize-image">{prize.icon}</div>
    <span className="prize-position">{prize.position}</span>
    <h3>{prize.name}</h3>
    <p>{prize.description}</p>
    <div className="prize-details"><span>👥 {prize.participants}</span><span>🏆 {prize.winnerCount} winner{prize.winnerCount > 1 ? "s" : ""}</span></div>
    <div className="entry-row"><span>Entry fee</span><strong>{prize.entryFee.toLocaleString()} {currencyLabel(prize.entryCurrency)}</strong></div>
    <Link className="btn-primary full" to={`/giveaway/${prize.slug}`}>Join Now <ArrowRight size={16}/></Link>
  </article>;
}

function Winners() {
  const [tab, setTab] = useState("current");
  const [index, setIndex] = useState(0);
  useEffect(() => { const t=setInterval(()=>setIndex(i=>(i+1)%winnerMessages.length), 4000); return()=>clearInterval(t); },[]);
  return <section className="winners-section">
    <div className="winner-slider"><Trophy size={18}/><span className="slider-message" key={index}>{winnerMessages[index]}</span><span className="demo-label">DEMO</span></div>
    <div className="tabs">
      <button className={tab==="current"?"active":""} onClick={()=>setTab("current")}>Winners</button>
      <button className={tab==="previous"?"active":""} onClick={()=>setTab("previous")}>Previous Winners</button>
    </div>
    {tab==="current" ? <div className="info-state"><Trophy size={26}/><h3>Giveaway is still live</h3><p>Winners will be announced after the giveaway ends. Current winner records are intentionally not displayed while the event is active.</p></div> :
      <div className="winner-list">{previousWinners.map(w=><div className="winner-row" key={w.userId+w.date}><div className="winner-avatar">{w.userId.slice(-2)}</div><div><strong>{w.userId}</strong><div className="muted">{w.prize} · {w.giveaway}</div></div><span>{w.date}</span></div>)}</div>}
  </section>;
}

function HowItWorks() {
  const steps = [["01","Sign Up / Login"],["02","Complete Tasks"],["03","Earn Entries"],["04","Win Rewards"]];
  return <section className="section-wrap soft-section"><SectionHeading eyebrow="SIMPLE FLOW" title="How to participate" text="The journey is designed to be easy to understand before any action is confirmed."/><div className="steps-grid">{steps.map(([n,t])=><div className="step" key={n}><span>{n}</span><h3>{t}</h3><p>Clear status and progress are shown at each stage.</p></div>)}</div></section>;
}

function Trust() {
  return <section className="section-wrap" id="rules"><SectionHeading eyebrow="TRUST & CLARITY" title="Built around transparent reward UX" text="Demo values are clearly separated from future backend-controlled values."/><div className="trust-grid">
    {[
      ["100% Transparent","Giveaway rules and entry costs are shown before confirmation."],
      ["Secure by design","Sensitive values belong on the backend, not in browser state."],
      ["Fair participation","Duplicate participation is blocked in the intended architecture."],
      ["Reward transparency","Prize, currency, fee and claim type are visible before joining."]
    ].map(([t,d])=><div className="trust-card" key={t}><ShieldCheck size={21}/><h3>{t}</h3><p>{d}</p></div>)}
  </div></section>;
}

function FAQ() {
  const qs=["How do I participate?","How are winners selected?","When are winners announced?","What happens if I win?","How do I claim my prize?"];
  const [open,setOpen]=useState(null);
  return <section className="section-wrap"><SectionHeading eyebrow="HELP" title="Frequently asked questions" text="Compact answers with expandable interactions."/><div className="faq">{qs.map((q,i)=><div className="faq-item" key={q}><button onClick={()=>setOpen(open===i?null:i)}><span>{q}</span><ChevronDown className={open===i?"rotate":""}/></button>{open===i&&<p>For this frontend demonstration, the flow is simulated with reusable React state. A production backend should remain the authoritative source for eligibility, balance, participation and winner status.</p>}</div>)}</div></section>;
}

function Footer(){return <footer><div><strong>VELOOP Rewards</strong><span className="muted"> · Giveaway & Watch Ad demo</span></div><div className="tiny">Development data only · Rules and reward values require backend confirmation.</div></footer>;}


function WatchAdModal({ad, flow, timeLeft, reward, onClose}) {
  const progress = flow === "watching" ? Math.max(0, Math.min(100, ((ad.duration - timeLeft) / ad.duration) * 100)) : flow === "completed" ? 100 : 0;
  return <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="watch-ad-title">
    <div className="modal-card ad-modal">
      <button className="modal-close" onClick={onClose} aria-label="Close"><X/></button>
      {flow === "loading" && <div className="ad-flow-center">
        <div className="loading-ring"></div>
        <span className="eyebrow">PREPARING REWARD</span>
        <h2 id="watch-ad-title">Loading ad…</h2>
        <p>Checking eligibility and preparing your sponsored preview.</p>
      </div>}
      {flow === "watching" && <div>
        <div className="ad-preview"><div className="preview-icon">{ad.icon}</div><span>SPONSORED PREVIEW</span></div>
        <span className="eyebrow">WATCH TO EARN</span>
        <h2 id="watch-ad-title">{ad.title}</h2>
        <p>{ad.description}</p>
        <div className="timer-box"><span>Reward unlocks in</span><strong>{timeLeft}s</strong></div>
        <div className="progress-track"><div className="progress-fill" style={{width:`${progress}%`}}/></div>
        <div className="ad-modal-meta"><span>Reward</span><b>+{ad.reward} {ad.currency}</b></div>
        <p className="tiny">Keep the preview open until the timer reaches zero to complete this demo task.</p>
      </div>}
      {flow === "completed" && <div className="success-modal ad-success">
        <div className="success-icon pulse"><Check size={30}/></div>
        <span className="eyebrow">REWARD SUCCESS</span>
        <h2 id="watch-ad-title">Reward unlocked!</h2>
        <p>Your watch session for <strong>{ad.title}</strong> is complete.</p>
        <div className="reward-pop">+{reward} {ad.currency}</div>
        <p className="tiny">This ad is now marked as Already Watched and your daily progress has updated.</p>
        <button className="btn-primary full" onClick={onClose}>Done</button>
      </div>}
      {flow === "already" && <div className="success-modal">
        <div className="success-icon"><Check size={30}/></div>
        <span className="eyebrow">ALREADY COMPLETED</span>
        <h2 id="watch-ad-title">Already Watched</h2>
        <p>You have already completed <strong>{ad.title}</strong> for today's demo cycle.</p>
        <button className="btn-primary full" onClick={onClose}>Back to Rewards</button>
      </div>}
    </div>
  </div>;
}

function GiveawayDetails({onLogin}) {
  const {slug}=useParams();
  const prize=giveawayData.prizes.find(p=>p.slug===slug) || giveawayData.prizes[0];
  const [joined,setJoined]=useState(false);
  const [modal,setModal]=useState(false);
  const [success,setSuccess]=useState(false);
  const balance=giveawayData.balances[prize.entryCurrency] ?? 0;
  const enough=balance>=prize.entryFee;
  const countdown=useCountdown(giveawayData.endAt);
  const confirm=()=>{setModal(false);setJoined(true);setSuccess(true);};
  return <div className="app">
    <nav className="navbar-custom"><div className="nav-inner"><Link to="/" className="brand"><span className="brand-mark">V</span><span>VELOOP <b>Rewards</b></span></Link><Link to="/#giveaways" className="back-link"><ArrowLeft size={16}/> Giveaway Home</Link></div></nav>
    <main className="details-page">
      <section className="details-hero">
        <div className="details-image">{prize.icon}</div>
        <div><span className="eyebrow">EXCLUSIVE GIVEAWAY</span><h1>Win {prize.name}</h1><p>{prize.description} Review the cost, rules and eligibility before joining.</p><div className="live-badge">● GIVEAWAY LIVE</div><div className="countdown-big"><Clock3 size={18}/> Ends in {countdown.days}d {String(countdown.hours).padStart(2,"0")}h {String(countdown.minutes).padStart(2,"0")}m</div></div>
      </section>
      <div className="details-grid">
        <section className="detail-main">
          <div className="panel"><h2>About the Prize</h2><p>{prize.name} is a fictional development reward used to demonstrate the VELOOP giveaway experience.</p><div className="detail-facts"><span>🏆 {prize.winnerCount} Winner{prize.winnerCount>1?"s":""}</span><span>👥 {prize.participants} Participants</span><span>💳 {prize.entryFee.toLocaleString()} {prize.entryCurrency}</span></div></div>
          <div className="panel"><h2>How This Giveaway Works</h2><div className="timeline">{["Review the giveaway","Check your eligibility","Pay the required entry amount","Participation is recorded","Wait until the giveaway ends","Winner is selected","Winner claims the prize"].map((x,i)=><div className="timeline-item" key={x}><b>{String(i+1).padStart(2,"0")}</b><span>{x}</span></div>)}</div></div>
          <div className="panel"><h2>Terms & Conditions</h2>{giveawayData.rules.map(r=><p className="rule" key={r}>• {r}</p>)}</div>
        </section>
        <aside className="join-panel">
          <span className="eyebrow">ENTRY REQUIREMENT</span><h2>{prize.entryFee.toLocaleString()} {prize.entryCurrency}</h2><div className="balance-line"><span>Your demo balance</span><strong>{balance.toLocaleString()} {prize.entryCurrency}</strong></div>
          {!enough && <div className="warning"><AlertCircle size={17}/> Insufficient {prize.entryCurrency}. You need {(prize.entryFee-balance).toLocaleString()} more.</div>}
          {joined ? <div className="joined"><Check size={19}/> You're Already Participating<p>Your entry has already been recorded for this demo session.</p></div> :
          <button className={enough?"btn-primary full":"btn-disabled"} disabled={!enough} onClick={()=>setModal(true)}>{enough?`Join for ${prize.entryFee.toLocaleString()} ${prize.entryCurrency}`:"Earn More "+prize.entryCurrency}</button>}
          <p className="tiny mt-3">Joining cost is shown before confirmation. The real backend must determine the authoritative fee and balance.</p>
        </aside>
      </div>
    </main>
    {modal&&<JoinModal prize={prize} balance={balance} onClose={()=>setModal(false)} onConfirm={confirm}/>}
    {success&&<SuccessModal title="You're In!" text={`Your participation for the ${prize.name} giveaway has been successfully recorded.`} onClose={()=>setSuccess(false)}/>}
    <Footer/>
  </div>;
}

function JoinModal({prize,balance,onClose,onConfirm}) {
  return <div className="modal-backdrop"><div className="modal-card"><button className="modal-close" onClick={onClose}><X/></button><div className="success-icon"><WalletCards/></div><span className="eyebrow">CONFIRM PARTICIPATION</span><h2>{prize.name}</h2><div className="confirm-lines"><div><span>Entry Fee</span><b>{prize.entryFee.toLocaleString()} {prize.entryCurrency}</b></div><div><span>Your Balance</span><b>{balance.toLocaleString()} {prize.entryCurrency}</b></div><div><span>Balance After Joining</span><b>{(balance-prize.entryFee).toLocaleString()} {prize.entryCurrency}</b></div></div><p className="tiny">By continuing, you confirm that you reviewed the giveaway rules and terms.</p><div className="modal-actions"><button className="btn-soft" onClick={onClose}>Cancel</button><button className="btn-primary" onClick={onConfirm}>Confirm & Join</button></div></div></div>;
}

function SuccessModal({title,text,onClose}) {
  return <div className="modal-backdrop"><div className="modal-card success-modal"><div className="success-icon pulse"><Check size={30}/></div><span className="eyebrow">PARTICIPATION SUCCESS</span><h2>{title}</h2><p>{text}</p><div className="success-line"><Sparkles size={16}/> Good luck!</div><button className="btn-primary full" onClick={onClose}>View Giveaway</button></div></div>;
}

export default App;
