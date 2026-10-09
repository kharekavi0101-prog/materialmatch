import { useNavigate } from 'react-router-dom';
import { Leaf, RotateCcw, Package, Users, TrendingUp } from 'lucide-react';
import { getSustainabilityStats, getStore } from '../data/store';

const CATEGORY_ICONS = {
  'Wood': '🪵', 'Metal': '🔩', 'Plastic': '♻️', 'Paper / Cardboard': '📦',
  'Textile': '🧵', 'Glass': '🫙', 'Organic Material': '🌿',
  'Construction Material': '🏗️', 'Packaging Material': '📫',
  'Electronics': '⚡', 'Mixed / Other': '🔄',
};

export default function ImpactPage() {
  const stats = getSustainabilityStats();
  const store = getStore();

  const goalKg = 500;
  const progressPct = Math.min((stats.wasteDiverted / goalKg) * 100, 100);

  // Top organizations by waste diverted
  const topOrgs = [...store.organizations]
    .sort((a, b) => (b.wasteDiverted || 0) - (a.wasteDiverted || 0))
    .slice(0, 5);

  // Category data
  const catData = Object.entries(stats.byCategory).sort((a, b) => b[1] - a[1]);
  const maxCat = catData.length > 0 ? catData[0][1] : 1;

  // Month data for trend
  const monthData = Object.entries(stats.byMonth).sort((a, b) => a[0].localeCompare(b[0])).slice(-6);
  const maxMonth = monthData.length > 0 ? Math.max(...monthData.map(m => m[1])) : 1;

  return (
    <div className="animate-fade-up">
      <div className="page-header">
        <h1 className="page-title">Sustainability Impact</h1>
        <p className="page-subtitle">Track collective environmental impact across the MaterialMatch network.</p>
      </div>

      {/* Top stats */}
      <div className="grid-4" style={{ marginBottom: '28px' }}>
        {[
          { label: 'Total Material Reused', value: `${stats.wasteDiverted} kg`, icon: <Leaf size={18} />, color: 'var(--accent)' },
          { label: 'Successful Exchanges', value: stats.successfulExchanges, icon: <RotateCcw size={18} />, color: 'var(--green)' },
          { label: 'Active Organizations', value: stats.activeOrganizations, icon: <Users size={18} />, color: 'var(--blue)' },
          { label: 'Materials Listed', value: stats.materialsListed, icon: <Package size={18} />, color: 'var(--yellow)' },
        ].map((s, i) => (
          <div key={s.label} className={`stat-card animate-fade-up stagger-${i + 1}`} style={{ '--accent': s.color }}>
            <div className="stat-icon" style={{ background: `${s.color}20`, color: s.color }}>
              {s.icon}
            </div>
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Progress toward goal */}
      <div className="card" style={{ marginBottom: '24px', background: 'var(--surface-2)', border: '1px solid var(--glass-border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontWeight: 700, fontSize: '16px', marginBottom: '4px' }}>Reuse Goal Progress</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Target: {goalKg} kg reused this quarter</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--accent)', letterSpacing: '-1px' }}>{progressPct.toFixed(0)}%</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{stats.wasteDiverted} / {goalKg} kg</div>
          </div>
        </div>
        <div style={{ background: 'var(--surface-3)', borderRadius: '8px', height: '16px', overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: `${progressPct}%`,
            background: 'linear-gradient(90deg, var(--green), var(--accent))',
            borderRadius: '8px',
            transition: 'width 1.5s ease',
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
          <span>0 kg</span>
          <span>{goalKg} kg goal</span>
        </div>
      </div>

      <div className="grid-2" style={{ alignItems: 'start', marginBottom: '24px' }}>
        {/* By category */}
        <div className="card">
          <h3 style={{ fontWeight: 700, fontSize: '16px', marginBottom: '20px' }}>Waste Diverted by Category</h3>
          {catData.length === 0 ? (
            <div className="empty-state" style={{ padding: '20px' }}>
              <p>No completed exchanges yet.</p>
            </div>
          ) : (
            <div className="chart-bar-container">
              {catData.map(([cat, val]) => (
                <div key={cat} className="chart-bar-row">
                  <div className="chart-bar-label">
                    {CATEGORY_ICONS[cat] || '🔄'} {cat.length > 12 ? cat.substring(0, 12) + '…' : cat}
                  </div>
                  <div className="chart-bar-track">
                    <div className="chart-bar-fill" style={{ width: `${(val / maxCat) * 100}%` }} />
                  </div>
                  <div className="chart-bar-value">{val} kg</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Monthly exchanges */}
        <div className="card">
          <h3 style={{ fontWeight: 700, fontSize: '16px', marginBottom: '20px' }}>Exchanges per Month</h3>
          {monthData.length === 0 ? (
            <div className="empty-state" style={{ padding: '20px' }}>
              <p>No exchange history yet.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '140px', padding: '10px 0' }}>
              {monthData.map(([month, count]) => {
                const pct = maxMonth > 0 ? (count / maxMonth) * 100 : 0;
                return (
                  <div key={month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent)' }}>{count}</div>
                    <div style={{
                      width: '100%', height: `${pct}%`, minHeight: '8px',
                      background: 'var(--accent)', borderRadius: '4px 4px 0 0',
                      transition: 'height 1s ease',
                      opacity: 0.85,
                    }} />
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', transform: 'rotate(-30deg)', transformOrigin: 'center', whiteSpace: 'nowrap' }}>
                      {month.replace('2025-', '')}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Top organizations */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h3 style={{ fontWeight: 700, fontSize: '16px', marginBottom: '20px' }}>Top Organizations — Waste Diverted</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {topOrgs.map((org, i) => (
            <div key={org.id} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: i === 0 ? 'var(--accent)' : 'var(--surface-3)',
                color: i === 0 ? '#0f1410' : 'var(--text-muted)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: '12px', flexShrink: 0,
              }}>
                {i + 1}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text)', marginBottom: '4px' }}>
                  {org.name}
                  <span style={{ marginLeft: '8px', fontSize: '11px', color: 'var(--text-muted)', fontWeight: 400 }}>{org.type}</span>
                </div>
                <div style={{ background: 'var(--surface-2)', borderRadius: '4px', height: '6px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${topOrgs[0]?.wasteDiverted > 0 ? (org.wasteDiverted / topOrgs[0].wasteDiverted) * 100 : 0}%`,
                    background: i === 0 ? 'var(--accent)' : 'var(--green)',
                    borderRadius: '4px',
                  }} />
                </div>
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--accent)', flexShrink: 0 }}>
                {org.wasteDiverted || 0} kg
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SDG 12 info */}
      <div className="card" style={{ background: 'var(--accent-dim)', border: '1px solid var(--glass-border)' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '40px' }}>🌍</div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontWeight: 700, fontSize: '16px', color: 'var(--accent)', marginBottom: '6px' }}>
              Aligned with SDG 12 — Responsible Consumption and Production
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Every exchange on MaterialMatch contributes to reducing waste, promoting reuse, and building circular resource systems in line with the United Nations Sustainable Development Goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
