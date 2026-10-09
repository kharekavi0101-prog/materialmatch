import { useState } from 'react';
import { Edit3, Save, X, Package, CheckCircle, Leaf } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getOrgStats, getMaterials, getOrg, updateOrg } from '../data/store';

const ORG_TYPES = ['Workshop', 'NGO', 'Business', 'Institution', 'Event Organizer', 'Community Group', 'Makerspace', 'Repair Group', 'Other'];

export default function ProfilePage() {
  const { currentUser, refresh } = useApp();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: currentUser?.name || '',
    type: currentUser?.type || '',
    contact: currentUser?.contact || '',
    city: currentUser?.city || '',
    description: currentUser?.description || '',
  });
  const [saved, setSaved] = useState(false);

  if (!currentUser) return null;

  const stats = getOrgStats(currentUser.id);
  const myMaterials = getMaterials().filter(m => m.orgId === currentUser.id);

  const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const save = () => {
    updateOrg(currentUser.id, form);
    refresh();
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const cancel = () => {
    setForm({
      name: currentUser.name, type: currentUser.type,
      contact: currentUser.contact, city: currentUser.city,
      description: currentUser.description || '',
    });
    setEditing(false);
  };

  return (
    <div className="animate-fade-up">
      <div className="page-header">
        <h1 className="page-title">Organization Profile</h1>
        <p className="page-subtitle">Your organization's information and sustainability record.</p>
      </div>

      {saved && (
        <div className="alert alert-success" style={{ marginBottom: '20px' }}>
          <CheckCircle size={16} /> Profile updated successfully!
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', alignItems: 'start' }}>
        {/* Profile card */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{
                width: '64px', height: '64px',
                background: 'var(--accent-dim)', borderRadius: '16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '26px', fontWeight: 800, color: 'var(--accent)',
                border: '2px solid var(--glass-border)',
              }}>
                {currentUser.name.charAt(0)}
              </div>
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.5px', color: 'var(--text)' }}>{currentUser.name}</h2>
                <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{currentUser.type} · {currentUser.city}</div>
              </div>
            </div>
            {!editing && (
              <button className="btn btn-secondary btn-sm" onClick={() => setEditing(true)}>
                <Edit3 size={14} /> Edit Profile
              </button>
            )}
          </div>

          {editing ? (
            <div>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Organization Name</label>
                  <input name="name" value={form.name} onChange={handle} />
                </div>
                <div className="form-group">
                  <label className="form-label">Organization Type</label>
                  <select name="type" value={form.type} onChange={handle}>
                    {ORG_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Contact Person</label>
                  <input name="contact" value={form.contact} onChange={handle} />
                </div>
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input name="city" value={form.city} onChange={handle} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea name="description" value={form.description} onChange={handle} rows={3} style={{ resize: 'vertical' }} />
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button className="btn btn-ghost btn-sm" onClick={cancel}><X size={14} /> Cancel</button>
                <button className="btn btn-primary btn-sm" onClick={save}><Save size={14} /> Save Changes</button>
              </div>
            </div>
          ) : (
            <div>
              <div className="form-grid" style={{ marginBottom: '16px' }}>
                {[
                  { label: 'Contact Person', value: currentUser.contact },
                  { label: 'Email', value: currentUser.email },
                  { label: 'City', value: currentUser.city },
                  { label: 'Member Since', value: currentUser.joinedAt },
                ].map(item => (
                  <div key={item.label} style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '3px' }}>{item.label}</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}>{item.value || '—'}</div>
                  </div>
                ))}
              </div>
              {currentUser.description && (
                <div style={{ padding: '14px', background: 'var(--surface-2)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>About</div>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>{currentUser.description}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Stats sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Impact stats */}
          <div className="card">
            <h3 style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>
              Impact Summary
            </h3>
            {[
              { label: 'Materials Listed', value: stats.totalMaterials, color: 'var(--accent)' },
              { label: 'Materials Received', value: stats.materialsReceived, color: 'var(--blue)' },
              { label: 'Completed Exchanges', value: stats.successfulExchanges, color: 'var(--green)' },
              { label: 'Waste Diverted', value: `${stats.wasteDiverted} kg`, color: 'var(--yellow)' },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border-light)' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{s.label}</span>
                <span style={{ fontSize: '16px', fontWeight: 800, color: s.color }}>{s.value}</span>
              </div>
            ))}
          </div>

          {/* SDG Badge */}
          <div className="card" style={{ background: 'var(--accent-dim)', border: '1px solid var(--glass-border)', textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🌍</div>
            <div style={{ fontWeight: 700, color: 'var(--accent)', fontSize: '14px', marginBottom: '4px' }}>SDG 12 Contributor</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Responsible Consumption & Production</div>
          </div>
        </div>
      </div>

      {/* My materials */}
      <div className="card" style={{ marginTop: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontWeight: 700, fontSize: '16px' }}>My Material Listings</h3>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{myMaterials.length} total</span>
        </div>

        {myMaterials.length === 0 ? (
          <div className="empty-state" style={{ padding: '30px' }}>
            <Package size={32} />
            <p>No materials listed yet.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {myMaterials.map(mat => (
              <div key={mat.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border-light)' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text)', marginBottom: '2px' }}>{mat.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{mat.category} · {mat.city}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: mat.quantity > 0 ? 'var(--accent)' : 'var(--text-muted)' }}>
                    {mat.quantity} {mat.unit}
                  </span>
                  <span className={`badge badge-${mat.status}`}>{mat.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
