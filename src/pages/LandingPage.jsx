import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, Sun, Moon, ArrowRight, RotateCcw, Zap, Shield, Globe, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';

const CATEGORY_ICONS = [
  { icon: '🪵', name_en: 'Wood',              name_hi: 'लकड़ी',       desc_en: 'Offcuts, plywood, timber',      desc_hi: 'टुकड़े, प्लाईवुड, लकड़ी' },
  { icon: '🔩', name_en: 'Metal',             name_hi: 'धातु',         desc_en: 'Cuttings, sheets, rods',        desc_hi: 'कटाई, शीट, छड़ें' },
  { icon: '♻️', name_en: 'Plastic',           name_hi: 'प्लास्टिक',   desc_en: 'Containers, sheets, pellets',   desc_hi: 'कंटेनर, शीट, पेलेट' },
  { icon: '📦', name_en: 'Paper / Cardboard', name_hi: 'कागज / गत्ता', desc_en: 'Sheets, rolls, offcuts',        desc_hi: 'शीट, रोल, टुकड़े' },
  { icon: '🧵', name_en: 'Textile',           name_hi: 'कपड़ा',        desc_en: 'Fabric scraps, banners',        desc_hi: 'कपड़े के अवशेष, बैनर' },
  { icon: '🫙', name_en: 'Glass',             name_hi: 'कांच',         desc_en: 'Bottles, panels, shards',       desc_hi: 'बोतलें, पैनल, टुकड़े' },
  { icon: '🌿', name_en: 'Organic',           name_hi: 'जैविक',        desc_en: 'Coffee grounds, compost',       desc_hi: 'कॉफी मैदान, खाद' },
  { icon: '🏗️', name_en: 'Construction',     name_hi: 'निर्माण',      desc_en: 'Tiles, bricks, pipes',          desc_hi: 'टाइलें, ईंटें, पाइप' },
];

const RECENT_LISTINGS = [
  { name_en: 'Wood Offcuts',        name_hi: 'लकड़ी के टुकड़े',   org: 'UrbanCraft Furniture', qty: '35 kg',    city: 'Ghaziabad', icon: '🪵' },
  { name_en: 'Fabric Scraps',       name_hi: 'कपड़े के अवशेष',    org: 'ThreadCycle Studio',   qty: '25 kg',    city: 'Mumbai',    icon: '🧵' },
  { name_en: 'Cardboard Sheets',    name_hi: 'गत्ता शीट',          org: 'EcoPrint Solutions',   qty: '60 kg',    city: 'Noida',     icon: '📦' },
  { name_en: 'Coffee Grounds',      name_hi: 'कॉफी मैदान',         org: 'BeanRoute Café',       qty: '15 kg',    city: 'Bengaluru', icon: '🌿' },
  { name_en: 'Plastic Containers',  name_hi: 'प्लास्टिक कंटेनर',  org: 'RePack Industries',    qty: '200 units',city: 'Ahmedabad', icon: '♻️' },
  { name_en: 'Metal Cuttings',      name_hi: 'धातु कटाई',           org: 'BuildAgain Workshop',  qty: '45 kg',    city: 'Pune',      icon: '🔩' },
];

export default function LandingPage() {
  const { theme, toggleTheme, lang, tr } = useApp();
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', transition: 'background var(--transition)' }}>
      {/* Navbar */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'var(--glass)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--glass-border)',
        padding: '0 40px', height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '34px', height: '34px', background: 'var(--accent)', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Leaf size={18} color="#0f1410" />
          </div>
          <span style={{ fontWeight: 800, fontSize: '18px', letterSpacing: '-0.3px' }}>MaterialMatch</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            className="btn btn-ghost btn-sm"
            style={{ fontSize: '12px', fontWeight: 700 }}
            onClick={toggleLang}
          >
            {lang === 'en' ? 'हिंदी' : 'EN'}
          </button>
          <button onClick={toggleTheme} className="btn btn-ghost btn-sm" style={{ padding: '8px' }}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="btn btn-ghost btn-sm" onClick={() => navigate('/login')}>
            {lang === 'hi' ? 'लॉग इन' : 'Log In'}
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/register')}>
            {lang === 'hi' ? 'शुरू करें' : 'Get Started'}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '80px 40px 40px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: theme === 'dark'
            ? 'radial-gradient(circle at 20% 50%, rgba(163,230,53,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(34,197,94,0.03) 0%, transparent 50%)'
            : 'radial-gradient(circle at 20% 50%, rgba(90,138,0,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(22,163,74,0.03) 0%, transparent 50%)',
        }} />

        <div style={{ maxWidth: '1100px', width: '100%', position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div className="animate-fade-up">
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'var(--accent-dim)', border: '1px solid var(--glass-border)',
                borderRadius: '20px', padding: '6px 14px', marginBottom: '24px',
              }}>
                <Globe size={14} color="var(--accent)" />
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {tr('landing_sdg_badge')}
                </span>
              </div>

              <h1 style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 900, letterSpacing: '-2px', lineHeight: '1.0', marginBottom: '16px', color: 'var(--text)' }}>
                Material<span style={{ color: 'var(--accent)' }}>Match</span>
              </h1>

              <p style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.3', letterSpacing: '-0.3px' }}>
                {tr('landing_tagline')}
              </p>

              <p style={{ fontSize: '16px', color: 'var(--text-muted)', marginBottom: '36px', lineHeight: '1.7', maxWidth: '460px' }}>
                {tr('landing_desc')}
              </p>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button className="btn btn-primary btn-lg" onClick={() => navigate('/marketplace')} style={{ gap: '8px' }}>
                  {tr('landing_explore')} <ArrowRight size={18} />
                </button>
                <button className="btn btn-secondary btn-lg" onClick={() => navigate('/add-material')}>
                  {tr('landing_list')}
                </button>
              </div>

              <div style={{ display: 'flex', gap: '32px', marginTop: '40px' }}>
                {[['286 kg', tr('landing_waste_diverted')], ['19', tr('landing_exchanges')], ['14', tr('landing_organizations')]].map(([num, label]) => (
                  <div key={label}>
                    <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--accent)', letterSpacing: '-1px' }}>{num}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-fade-up stagger-2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CircularGraphic lang={lang} />
            </div>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '12px', animation: 'fadeIn 1s ease 1s both' }}>
          <span>{tr('landing_scroll')}</span>
          <ChevronDown size={16} className="animate-pulse" />
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '80px 40px', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 800, letterSpacing: '-1px', marginBottom: '12px' }}>{tr('landing_how_it_works')}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '16px', maxWidth: '500px', margin: '0 auto' }}>{tr('landing_how_desc')}</p>
          </div>
          <div className="grid-4">
            {[
              { step: '01', titleKey: 'landing_step1_title', descKey: 'landing_step1_desc' },
              { step: '02', titleKey: 'landing_step2_title', descKey: 'landing_step2_desc' },
              { step: '03', titleKey: 'landing_step3_title', descKey: 'landing_step3_desc' },
              { step: '04', titleKey: 'landing_step4_title', descKey: 'landing_step4_desc' },
            ].map((item, i) => (
              <div key={item.step} className={`card animate-fade-up stagger-${i + 1}`} style={{ position: 'relative', overflow: 'hidden' }}>
                <div style={{ fontSize: '48px', fontWeight: 900, color: 'var(--accent)', opacity: 0.2, position: 'absolute', top: '10px', right: '16px', lineHeight: 1 }}>{item.step}</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Step {item.step}</div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '10px', color: 'var(--text)' }}>{tr(item.titleKey)}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6' }}>{tr(item.descKey)}</p>
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
                {tr('landing_why')}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.8', marginBottom: '28px' }}>
                {tr('landing_why_desc')}
              </p>
              {[
                { icon: <RotateCcw size={20} />, titleKey: 'landing_circular', descKey: 'landing_circular_desc' },
                { icon: <Zap size={20} />,       titleKey: 'landing_zero_waste', descKey: 'landing_zero_waste_desc' },
                { icon: <Shield size={20} />,    titleKey: 'landing_sdg',       descKey: 'landing_sdg_desc' },
                { icon: <Globe size={20} />,     titleKey: 'landing_community', descKey: 'landing_community_desc' },
              ].map(item => (
                <div key={item.titleKey} style={{ display: 'flex', gap: '14px', marginBottom: '20px', alignItems: 'flex-start' }}>
                  <div style={{ width: '40px', height: '40px', background: 'var(--accent-dim)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '2px' }}>{tr(item.titleKey)}</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{tr(item.descKey)}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                { value: '286 kg', labelKey: 'landing_total_reused',  color: 'var(--accent)' },
                { value: '14',     labelKey: 'landing_orgs_active',    color: 'var(--green)' },
                { value: '42',     labelKey: 'landing_materials_listed', color: 'var(--blue)' },
                { value: '19',     labelKey: 'landing_successful',    color: 'var(--yellow)' },
              ].map(s => (
                <div key={s.labelKey} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', textAlign: 'center', boxShadow: 'var(--card-shadow)' }}>
                  <div style={{ fontSize: '36px', fontWeight: 900, color: s.color, letterSpacing: '-1px', marginBottom: '6px' }}>{s.value}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{tr(s.labelKey)}</div>
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
            <h2 style={{ fontSize: '36px', fontWeight: 800, letterSpacing: '-1px', marginBottom: '12px' }}>{tr('landing_categories')}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>{tr('landing_categories_desc')}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
            {CATEGORY_ICONS.map((cat, i) => (
              <div key={cat.name_en} className={`card animate-fade-up stagger-${Math.min(i + 1, 6)}`} onClick={() => navigate('/marketplace')} style={{ cursor: 'pointer', textAlign: 'center', padding: '24px 16px' }}>
                <div style={{ fontSize: '36px', marginBottom: '12px' }}>{cat.icon}</div>
                <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px', color: 'var(--text)' }}>{lang === 'hi' ? cat.name_hi : cat.name_en}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{lang === 'hi' ? cat.desc_hi : cat.desc_en}</div>
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
              <h2 style={{ fontSize: '36px', fontWeight: 800, letterSpacing: '-1px', marginBottom: '6px' }}>{tr('landing_recent')}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>{tr('landing_recent_desc')}</p>
            </div>
            <button className="btn btn-secondary" onClick={() => navigate('/marketplace')}>
              {tr('landing_view_all')} <ArrowRight size={16} />
            </button>
          </div>
          <div className="grid-3">
            {RECENT_LISTINGS.map((listing, i) => (
              <div key={listing.name_en} className={`card animate-fade-up stagger-${Math.min(i + 1, 6)}`} onClick={() => navigate('/marketplace')} style={{ cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span style={{ fontSize: '32px' }}>{listing.icon}</span>
                  <span className="badge badge-available">{tr('common_available')}</span>
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '16px', marginBottom: '4px' }}>{lang === 'hi' ? listing.name_hi : listing.name_en}</h3>
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

      {/* SDG 12 */}
      <section style={{ padding: '80px 40px', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--accent-dim)', border: '1px solid var(--glass-border)', borderRadius: '20px', padding: '6px 16px', marginBottom: '24px' }}>
            <Globe size={14} color="var(--accent)" />
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {lang === 'hi' ? 'संयुक्त राष्ट्र SDG 12' : 'United Nations SDG 12'}
            </span>
          </div>
          <h2 style={{ fontSize: '36px', fontWeight: 800, letterSpacing: '-1px', marginBottom: '16px' }}>{tr('landing_sdg_title')}</h2>
          <p style={{ fontSize: '16px', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
            {tr('landing_sdg_body')}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '48px' }}>
            {[
              ['12.2', lang === 'hi' ? 'प्राकृतिक संसाधनों का टिकाऊ प्रबंधन' : 'Sustainable management of natural resources'],
              ['12.4', lang === 'hi' ? 'कचरे का जिम्मेदार प्रबंधन' : 'Responsible management of chemicals and waste'],
              ['12.5', lang === 'hi' ? 'कचरा उत्पादन में पर्याप्त कमी' : 'Substantially reduce waste generation'],
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
          <h2 style={{ fontSize: '40px', fontWeight: 900, letterSpacing: '-1.5px', marginBottom: '16px' }}>{tr('landing_cta_title')}</h2>
          <p style={{ fontSize: '16px', color: 'var(--text-muted)', marginBottom: '36px' }}>{tr('landing_cta_desc')}</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/register')}>
              {tr('landing_join')} <ArrowRight size={18} />
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => navigate('/marketplace')}>
              {tr('landing_browse')}
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
            {tr('landing_tagline')} · SDG 12
          </div>
        </div>
      </footer>
    </div>
  );
}

function CircularGraphic({ lang }) {
  const labels = lang === 'hi'
    ? ['लकड़ी', 'कपड़ा', 'कागज', 'धातु', 'प्लास्टिक', 'जैविक']
    : ['Wood', 'Textile', 'Paper', 'Metal', 'Plastic', 'Organic'];
  const icons = ['🪵', '🧵', '📦', '🔩', '♻️', '🌿'];

  return (
    <div style={{ position: 'relative', width: '380px', height: '380px', flexShrink: 0 }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} className="animate-spin" viewBox="0 0 380 380">
        <circle cx="190" cy="190" r="175" fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="8 12" />
      </svg>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', animationDirection: 'reverse', animationDuration: '12s' }} className="animate-spin" viewBox="0 0 380 380">
        <circle cx="190" cy="190" r="130" fill="none" stroke="var(--accent)" strokeWidth="1" strokeDasharray="4 20" strokeOpacity="0.4" />
      </svg>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '140px', height: '140px', background: 'var(--accent-dim)', border: '2px solid var(--glass-border)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <RotateCcw size={36} color="var(--accent)" />
        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent)', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {lang === 'hi' ? 'परिपत्र' : 'Circular'}
        </span>
      </div>
      {icons.map((emoji, idx) => {
        const angle = idx * 60;
        const rad = (angle * Math.PI) / 180;
        const r = 155;
        const x = 190 + r * Math.cos(rad);
        const y = 190 + r * Math.sin(rad);
        return (
          <div key={labels[idx]} style={{ position: 'absolute', left: `${(x / 380) * 100}%`, top: `${(y / 380) * 100}%`, transform: 'translate(-50%, -50%)', width: '56px', height: '56px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', boxShadow: 'var(--card-shadow)' }}>
            {emoji}
          </div>
        );
      })}
    </div>
  );
}
