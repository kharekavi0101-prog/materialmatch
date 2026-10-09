import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, Sun, Moon, ArrowRight, RotateCcw, Zap, Shield, Globe, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';

const categories = [
  { icon: '🪵', name: 'Wood', desc: 'Offcuts, plywood, timber' },
  { icon: '🔩', name: 'Metal', desc: 'Cuttings, sheets, rods' },
  { icon: '♻️', name: 'Plastic', desc: 'Containers, sheets, pellets' },
  { icon: '📦', name: 'Paper / Cardboard', desc: 'Sheets, rolls, offcuts' },
  { icon: '🧵', name: 'Textile', desc: 'Fabric scraps, banners' },
  { icon: '🫙', name: 'Glass', desc: 'Bottles, panels, shards' },
  { icon: '🌿', name: 'Organic', desc: 'Coffee grounds, compost' },
  { icon: '🏗️', name: 'Construction', desc: 'Tiles, bricks, pipes' },
];

const howItWorks = [
  { step: '01', title: 'List Surplus Material', desc: 'Post your reusable surplus materials — wood scraps, fabric offcuts, coffee grounds, or anything that can be reused.' },
  { step: '02', title: 'Browse & Discover', desc: 'Search the marketplace by category, location, or material type. Find exactly what your project needs.' },
  { step: '03', title: 'Request & Connect', desc: 'Send a request to the material provider. Accept requests and coordinate pickup or delivery.' },
  { step: '04', title: 'Complete Exchange', desc: 'Mark the exchange complete. Track your sustainability impact and celebrate every kilogram diverted from waste.' },
];

const recentListings = [
  { name: 'Wood Offcuts', org: 'UrbanCraft Furniture', qty: '35 kg', cat: 'Wood', city: 'Ghaziabad', icon: '🪵' },
  { name: 'Fabric Scraps', org: 'ThreadCycle Studio', qty: '25 kg', cat: 'Textile', city: 'Mumbai', icon: '🧵' },
  { name: 'Cardboard Sheets', org: 'EcoPrint Solutions', qty: '60 kg', cat: 'Paper / Cardboard', city: 'Noida', icon: '📦' },
  { name: 'Coffee Grounds', org: 'BeanRoute Café', qty: '15 kg', cat: 'Organic', city: 'Bengaluru', icon: '🌿' },
  { name: 'Plastic Containers', org: 'RePack Industries', qty: '200 units', cat: 'Plastic', city: 'Ahmedabad', icon: '♻️' },
  { name: 'Metal Cuttings', org: 'BuildAgain Workshop', qty: '45 kg', cat: 'Metal', city: 'Pune', icon: '🔩' },
];

export default function LandingPage() {
  const { theme, toggleTheme } = useApp();
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', transition: 'background var(--transition)' }}>
      {/* Navbar */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 100,
        background: 'var(--glass)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--glass-border)',
        padding: '0 40px',
        height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '34px', height: '34px', background: 'var(--accent)', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Leaf size={18} color="#0f1410" />
          </div>
          <span style={{ fontWeight: 800, fontSize: '18px', letterSpacing: '-0.3px' }}>MaterialMatch</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={toggleTheme} className="btn btn-ghost btn-sm" style={{ padding: '8px' }}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="btn btn-ghost btn-sm" onClick={() => navigate('/login')}>Log In</button>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/register')}>Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '80px 40px 40px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Background texture */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: theme === 'dark'
            ? 'radial-gradient(circle at 20% 50%, rgba(163,230,53,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(34,197,94,0.03) 0%, transparent 50%)'
            : 'radial-gradient(circle at 20% 50%, rgba(90,138,0,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(22,163,74,0.03) 0%, transparent 50%)',
        }} />

        <div style={{ maxWidth: '1100px', width: '100%', position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            {/* Left */}
            <div className="animate-fade-up">
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'var(--accent-dim)', border: '1px solid var(--glass-border)',
                borderRadius: '20px', padding: '6px 14px', marginBottom: '24px',
              }}>
                <Globe size={14} color="var(--accent)" />
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  SDG 12 · Circular Economy
                </span>
              </div>

              <h1 style={{
                fontSize: 'clamp(40px, 6vw, 64px)',
                fontWeight: 900,
                letterSpacing: '-2px',
                lineHeight: '1.0',
                marginBottom: '16px',
                color: 'var(--text)',
              }}>
                Material<span style={{ color: 'var(--accent)' }}>Match</span>
              </h1>

              <p style={{
                fontSize: '20px', fontWeight: 600, color: 'var(--text-secondary)',
                marginBottom: '20px', lineHeight: '1.3',
                letterSpacing: '-0.3px',
              }}>
                Turning Waste Streams into<br />Resource Streams
              </p>

              <p style={{ fontSize: '16px', color: 'var(--text-muted)', marginBottom: '36px', lineHeight: '1.7', maxWidth: '460px' }}>
                Connect surplus materials with organizations that can reuse them and turn potential waste into valuable resources.
              </p>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button className="btn btn-primary btn-lg" onClick={() => navigate('/marketplace')} style={{ gap: '8px' }}>
                  Explore Materials <ArrowRight size={18} />
                </button>
                <button className="btn btn-secondary btn-lg" onClick={() => navigate('/add-material')}>
                  List Material
                </button>
              </div>

              <div style={{ display: 'flex', gap: '32px', marginTop: '40px' }}>
                {[['286 kg', 'Waste Diverted'], ['19', 'Exchanges'], ['14', 'Organizations']].map(([num, label]) => (
                  <div key={label}>
                    <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--accent)', letterSpacing: '-1px' }}>{num}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — circular graphic */}
            <div className="animate-fade-up stagger-2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CircularGraphic />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
          color: 'var(--text-muted)', fontSize: '12px',
          animation: 'fadeIn 1s ease 1s both',
        }}>
          <span>Scroll to explore</span>
          <ChevronDown size={16} className="animate-pulse" />
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '80px 40px', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 800, letterSpacing: '-1px', marginBottom: '12px' }}>How It Works</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '16px', maxWidth: '500px', margin: '0 auto' }}>
              Four simple steps to transform your waste streams into resource streams.
            </p>
          </div>
          <div className="grid-4">
            {howItWorks.map((item, i) => (
              <div key={item.step} className={`card animate-fade-up stagger-${i + 1}`} style={{ position: 'relative', overflow: 'hidden' }}>
                <div style={{ fontSize: '48px', fontWeight: 900, color: 'var(--accent)', opacity: 0.2, position: 'absolute', top: '10px', right: '16px', lineHeight: 1 }}>
                  {item.step}
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
                  Step {item.step}
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '10px', color: 'var(--text)' }}>{item.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why MaterialMatch */}
      <section style={{ padding: '80px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '36px', fontWeight: 800, letterSpacing: '-1px', marginBottom: '20px' }}>
                Why <span style={{ color: 'var(--accent)' }}>MaterialMatch</span>?
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.8', marginBottom: '28px' }}>
                Every year, millions of tons of reusable materials end up in landfills simply because there was no connection between those who have surplus and those who need it. MaterialMatch changes that.
              </p>
              {[
                { icon: <RotateCcw size={20} />, title: 'Circular Economy', desc: 'Close the loop — every material has a second life.' },
                { icon: <Zap size={20} />, title: 'Zero Waste Vision', desc: 'Divert materials before they become waste.' },
                { icon: <Shield size={20} />, title: 'SDG 12 Aligned', desc: 'Responsible Consumption & Production at scale.' },
                { icon: <Globe size={20} />, title: 'Community Driven', desc: 'Businesses, NGOs, makers — all connected.' },
              ].map(item => (
                <div key={item.title} style={{ display: 'flex', gap: '14px', marginBottom: '20px', alignItems: 'flex-start' }}>
                  <div style={{ width: '40px', height: '40px', background: 'var(--accent-dim)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '2px' }}>{item.title}</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                { value: '286 kg', label: 'Total Material Reused', color: 'var(--accent)' },
                { value: '14', label: 'Organizations Active', color: 'var(--green)' },
                { value: '42', label: 'Materials Listed', color: 'var(--blue)' },
                { value: '19', label: 'Successful Exchanges', color: 'var(--yellow)' },
              ].map(s => (
                <div key={s.label} style={{
                  background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px',
                  padding: '24px', textAlign: 'center', boxShadow: 'var(--card-shadow)',
                }}>
                  <div style={{ fontSize: '36px', fontWeight: 900, color: s.color, letterSpacing: '-1px', marginBottom: '6px' }}>{s.value}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Material Categories */}
      <section style={{ padding: '80px 40px', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 800, letterSpacing: '-1px', marginBottom: '12px' }}>Material Categories</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>From wood to organic waste — everything has a second purpose.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
            {categories.map((cat, i) => (
              <div
                key={cat.name}
                className={`card animate-fade-up stagger-${Math.min(i + 1, 6)}`}
                onClick={() => navigate('/marketplace')}
                style={{ cursor: 'pointer', textAlign: 'center', padding: '24px 16px' }}
              >
                <div style={{ fontSize: '36px', marginBottom: '12px' }}>{cat.icon}</div>
                <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px', color: 'var(--text)' }}>{cat.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{cat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Listings */}
      <section style={{ padding: '80px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
            <div>
              <h2 style={{ fontSize: '36px', fontWeight: 800, letterSpacing: '-1px', marginBottom: '6px' }}>Recent Listings</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>Available materials ready for exchange right now.</p>
            </div>
            <button className="btn btn-secondary" onClick={() => navigate('/marketplace')}>
              View All <ArrowRight size={16} />
            </button>
          </div>
          <div className="grid-3">
            {recentListings.map((listing, i) => (
              <div key={listing.name} className={`card animate-fade-up stagger-${Math.min(i + 1, 6)}`}
                onClick={() => navigate('/marketplace')}
                style={{ cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span style={{ fontSize: '32px' }}>{listing.icon}</span>
                  <span className="badge badge-available">Available</span>
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '16px', marginBottom: '4px' }}>{listing.name}</h3>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px' }}>{listing.org}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{listing.qty}</span>
                  <span style={{ color: 'var(--text-muted)' }}>📍 {listing.city}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SDG 12 Alignment */}
      <section style={{ padding: '80px 40px', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'var(--accent-dim)', border: '1px solid var(--glass-border)',
            borderRadius: '20px', padding: '6px 16px', marginBottom: '24px',
          }}>
            <Globe size={14} color="var(--accent)" />
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              United Nations SDG 12
            </span>
          </div>
          <h2 style={{ fontSize: '36px', fontWeight: 800, letterSpacing: '-1px', marginBottom: '16px' }}>
            Aligned with SDG 12
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
            MaterialMatch directly supports <strong style={{ color: 'var(--accent)' }}>Sustainable Development Goal 12</strong> — Responsible Consumption and Production — by creating systems for material reuse, waste reduction, and sustainable resource flows.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '48px' }}>
            {[
              ['12.2', 'Sustainable management of natural resources'],
              ['12.4', 'Responsible management of chemicals and waste'],
              ['12.5', 'Substantially reduce waste generation'],
            ].map(([target, desc]) => (
              <div key={target} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px' }}>
                <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--accent)', marginBottom: '8px' }}>SDG {target}</div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 40px', background: 'var(--surface-2)' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '40px', fontWeight: 900, letterSpacing: '-1.5px', marginBottom: '16px' }}>
            Ready to close the loop?
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text-muted)', marginBottom: '36px' }}>
            Join MaterialMatch and turn your surplus into someone else's resource.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/register')}>
              Join MaterialMatch <ArrowRight size={18} />
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => navigate('/marketplace')}>
              Browse Marketplace
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', padding: '28px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '28px', height: '28px', background: 'var(--accent)', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Leaf size={14} color="#0f1410" />
            </div>
            <span style={{ fontWeight: 700, fontSize: '15px' }}>MaterialMatch</span>
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Turning Waste Streams into Resource Streams · SDG 12 Circular Economy Platform
          </div>
        </div>
      </footer>
    </div>
  );
}

function CircularGraphic() {
  return (
    <div style={{ position: 'relative', width: '380px', height: '380px', flexShrink: 0 }}>
      {/* Outer ring */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} className="animate-spin" viewBox="0 0 380 380">
        <circle cx="190" cy="190" r="175" fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="8 12" />
      </svg>

      {/* Middle ring */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', animationDirection: 'reverse', animationDuration: '12s' }} className="animate-spin" viewBox="0 0 380 380">
        <circle cx="190" cy="190" r="130" fill="none" stroke="var(--accent)" strokeWidth="1" strokeDasharray="4 20" strokeOpacity="0.4" />
      </svg>

      {/* Center */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '140px', height: '140px',
        background: 'var(--accent-dim)',
        border: '2px solid var(--glass-border)',
        borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column',
      }}>
        <RotateCcw size={36} color="var(--accent)" />
        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent)', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Circular</span>
      </div>

      {/* Orbit nodes */}
      {[
        { angle: 0, emoji: '🪵', label: 'Wood' },
        { angle: 60, emoji: '🧵', label: 'Textile' },
        { angle: 120, emoji: '📦', label: 'Paper' },
        { angle: 180, emoji: '🔩', label: 'Metal' },
        { angle: 240, emoji: '♻️', label: 'Plastic' },
        { angle: 300, emoji: '🌿', label: 'Organic' },
      ].map(({ angle, emoji, label }) => {
        const rad = (angle * Math.PI) / 180;
        const r = 155;
        const x = 190 + r * Math.cos(rad);
        const y = 190 + r * Math.sin(rad);
        return (
          <div
            key={label}
            style={{
              position: 'absolute',
              left: `${(x / 380) * 100}%`,
              top: `${(y / 380) * 100}%`,
              transform: 'translate(-50%, -50%)',
              width: '56px', height: '56px',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column',
              fontSize: '20px',
              boxShadow: 'var(--card-shadow)',
            }}
          >
            {emoji}
          </div>
        );
      })}
    </div>
  );
}
