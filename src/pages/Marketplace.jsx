import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, X, MapPin, Package } from 'lucide-react';
import { getMaterials, getOrg } from '../data/store';
import { useApp } from '../context/AppContext';

const CATEGORIES = ['All', 'Wood', 'Metal', 'Plastic', 'Paper / Cardboard', 'Textile', 'Glass', 'Organic Material', 'Construction Material', 'Packaging Material', 'Electronics', 'Mixed / Other'];

const CATEGORY_ICONS = {
  'Wood': '🪵', 'Metal': '🔩', 'Plastic': '♻️', 'Paper / Cardboard': '📦',
  'Textile': '🧵', 'Glass': '🫙', 'Organic Material': '🌿',
  'Construction Material': '🏗️', 'Packaging Material': '📫',
  'Electronics': '⚡', 'Mixed / Other': '🔄',
};

export default function Marketplace() {
  const { tr } = useApp();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [availOnly, setAvailOnly] = useState(false);

  const allMaterials = getMaterials();

  const filtered = allMaterials.filter(m => {
    const matchSearch = !search || m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.description.toLowerCase().includes(search.toLowerCase()) ||
      m.city.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || m.category === category;
    const matchAvail = !availOnly || m.status === 'available';
    return matchSearch && matchCat && matchAvail;
  });

  return (
    <div className="animate-fade-up">
      <div className="page-header">
        <h1 className="page-title">{tr('market_title')}</h1>
        <p className="page-subtitle">{tr('market_subtitle')}</p>
      </div>

      {/* Filters */}
      <div className="card" style={{ marginBottom: '24px', padding: '16px 20px' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div className="search-bar" style={{ flex: '1', minWidth: '200px' }}>
            <Search size={16} color="var(--text-muted)" />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder={tr('market_search_placeholder')}
            />
            {search && (
              <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', padding: '0', cursor: 'pointer' }}>
                <X size={14} />
              </button>
            )}
          </div>

          <select
            value={category} onChange={e => setCategory(e.target.value)}
            style={{ width: 'auto', minWidth: '160px' }}
          >
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <button
            className={`btn btn-sm ${availOnly ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setAvailOnly(!availOnly)}
          >
            <Filter size={14} />
            {availOnly ? tr('market_available_only') : tr('market_all_status')}
          </button>
        </div>
      </div>

      {/* Category chips */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {CATEGORIES.slice(1).map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(category === cat ? 'All' : cat)}
            style={{
              padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600,
              border: `1px solid ${category === cat ? 'var(--accent)' : 'var(--border)'}`,
              background: category === cat ? 'var(--accent-dim)' : 'transparent',
              color: category === cat ? 'var(--accent)' : 'var(--text-muted)',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            {CATEGORY_ICONS[cat]} {cat}
          </button>
        ))}
      </div>

      {/* Count */}
      <div style={{ marginBottom: '16px', fontSize: '14px', color: 'var(--text-muted)' }}>
        {tr('market_showing')} <strong style={{ color: 'var(--text)' }}>{filtered.length}</strong> {filtered.length !== 1 ? tr('market_materials') : tr('market_material')}
        {category !== 'All' && <span> {tr('market_in')} <strong style={{ color: 'var(--accent)' }}>{category}</strong></span>}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <Package size={48} />
          <h3>{tr('market_no_results')}</h3>
          <p>{tr('market_no_results_desc')}</p>
        </div>
      ) : (
        <div className="grid-auto">
          {filtered.map((mat, i) => (
            <MaterialCard key={mat.id} mat={mat} index={i} onClick={() => navigate(`/material/${mat.id}`)} />
          ))}
        </div>
      )}
    </div>
  );
}

function MaterialCard({ mat, index, onClick }) {
  const { tr } = useApp();
  const org = getOrg(mat.orgId);
  const icon = CATEGORY_ICONS[mat.category] || '🔄';

  return (
    <div
      className={`card animate-fade-up stagger-${Math.min(index + 1, 6)}`}
      onClick={onClick}
      style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '12px' }}
    >
      {/* Top */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ fontSize: '36px', lineHeight: 1 }}>{icon}</div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
          <span className={`badge badge-${mat.status}`}>{mat.status.toUpperCase()}</span>
          {mat.status === 'available' && (
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--green)', display: 'inline-block', animation: 'pulse 2s infinite', boxShadow: '0 0 6px var(--green)' }} />
          )}
        </div>
      </div>

      {/* Info */}
      <div>
        <h3 style={{ fontWeight: 700, fontSize: '16px', marginBottom: '4px', color: 'var(--text)' }}>{mat.name}</h3>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>{mat.category}</div>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {mat.description}
        </p>
      </div>

      {/* Metadata */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '12px' }}>
        <div style={{ background: 'var(--surface-2)', borderRadius: '6px', padding: '6px 8px' }}>
          <div style={{ color: 'var(--text-muted)' }}>{tr('market_quantity')}</div>
          <div style={{ fontWeight: 700, color: 'var(--accent)' }}>{mat.quantity} {mat.unit}</div>
        </div>
        <div style={{ background: 'var(--surface-2)', borderRadius: '6px', padding: '6px 8px' }}>
          <div style={{ color: 'var(--text-muted)' }}>{tr('market_condition')}</div>
          <div style={{ fontWeight: 600, color: 'var(--text)' }}>{mat.condition.split('/')[0].trim()}</div>
        </div>
      </div>

      {/* Org + City */}
      <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '13px' }}>
          <div style={{ fontWeight: 600, color: 'var(--text)' }}>{org?.name || 'Unknown'}</div>
          <div style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={11} /> {mat.city}
          </div>
        </div>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
        {mat.pickupRequired ? `🚗 ${tr('market_pickup')}` : `📦 ${tr('market_flexible')}`}
      </div>
    </div>

    <button className="btn btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
      {tr('market_view')}
    </button>
    </div>
  );
}
