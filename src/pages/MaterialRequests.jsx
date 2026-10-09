import { useState } from 'react';
import { Plus, AlertCircle, CheckCircle, MapPin, Calendar } from 'lucide-react';
import { getMaterialRequirements, addMaterialRequirement, getOrg } from '../data/store';
import { useApp } from '../context/AppContext';

const CATEGORIES = ['Wood', 'Metal', 'Plastic', 'Paper / Cardboard', 'Textile', 'Glass', 'Organic Material', 'Construction Material', 'Packaging Material', 'Electronics', 'Mixed / Other'];
const UNITS = ['kg', 'units', 'meters', 'liters', 'sheets', 'rolls', 'pieces'];

export default function MaterialRequests() {
  const { currentUser, refresh } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ materialRequired: '', category: '', quantity: '', unit: 'kg', description: '', neededBefore: '', city: currentUser?.city || '' });
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const requirements = getMaterialRequirements();
  const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!form.materialRequired.trim()) return 'Material name is required.';
    if (!form.category) return 'Category is required.';
    if (!form.quantity || parseFloat(form.quantity) <= 0) return 'Quantity must be a positive number.';
    if (!form.description.trim()) return 'Description is required.';
    return null;
  };

  const submit = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setError('');
    addMaterialRequirement({ ...form, quantity: parseFloat(form.quantity), orgId: currentUser.id });
    refresh();
    setSubmitted(true);
    setShowForm(false);
    setForm({ materialRequired: '', category: '', quantity: '', unit: 'kg', description: '', neededBefore: '', city: currentUser?.city || '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="animate-fade-up">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="page-title">Material Requests</h1>
          <p className="page-subtitle">Organizations seeking specific materials. Can you help them find what they need?</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          <Plus size={16} /> Post a Request
        </button>
      </div>

      {submitted && (
        <div className="alert alert-success" style={{ marginBottom: '20px' }}>
          <CheckCircle size={16} /> Your material request has been posted!
        </div>
      )}

      {requirements.length === 0 ? (
        <div className="empty-state">
          <p>No material requests yet. Be the first to post what you need!</p>
        </div>
      ) : (
        <div className="grid-auto">
          {requirements.map((req, i) => {
            const org = getOrg(req.orgId);
            return (
              <div key={req.id} className={`card animate-fade-up stagger-${Math.min(i + 1, 6)}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span style={{
                    background: 'var(--blue-dim)', color: 'var(--blue)',
                    border: '1px solid rgba(96,165,250,0.25)',
                    borderRadius: '20px', padding: '3px 10px', fontSize: '11px', fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.5px',
                  }}>
                    Seeking
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{req.createdAt}</span>
                </div>

                <h3 style={{ fontWeight: 700, fontSize: '17px', marginBottom: '4px', color: 'var(--text)' }}>{req.materialRequired}</h3>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '10px' }}>{req.category}</div>

                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '14px', fontStyle: 'italic' }}>
                  "{req.description}"
                </p>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
                  <span style={{ padding: '4px 10px', background: 'var(--accent-dim)', borderRadius: '6px', fontSize: '12px', fontWeight: 600, color: 'var(--accent)' }}>
                    {req.quantity} {req.unit} needed
                  </span>
                  {req.city && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 10px', background: 'var(--surface-2)', borderRadius: '6px', fontSize: '12px', color: 'var(--text-muted)' }}>
                      <MapPin size={11} /> {req.city}
                    </span>
                  )}
                  {req.neededBefore && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 10px', background: 'var(--surface-2)', borderRadius: '6px', fontSize: '12px', color: 'var(--text-muted)' }}>
                      <Calendar size={11} /> Before {req.neededBefore}
                    </span>
                  )}
                </div>

                <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '10px' }}>
                  <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text)' }}>{org?.name || 'Unknown Org'}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{org?.type} · {org?.city}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Post Request Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowForm(false)}>
          <div className="modal" style={{ maxWidth: '560px' }}>
            <h2 className="modal-title">Post Material Request</h2>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Let the community know what materials you need.
            </p>

            {error && <div className="alert alert-error" style={{ marginBottom: '16px' }}><AlertCircle size={16} /> {error}</div>}

            <form onSubmit={submit}>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Material Required *</label>
                  <input name="materialRequired" value={form.materialRequired} onChange={handle} placeholder="e.g. Clean Cardboard Sheets" />
                </div>
                <div className="form-group">
                  <label className="form-label">Category *</label>
                  <select name="category" value={form.category} onChange={handle}>
                    <option value="">Select...</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Quantity *</label>
                  <input type="number" name="quantity" value={form.quantity} onChange={handle} placeholder="How much?" min="0.1" step="0.1" />
                </div>
                <div className="form-group">
                  <label className="form-label">Unit *</label>
                  <select name="unit" value={form.unit} onChange={handle}>
                    {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description *</label>
                <textarea name="description" value={form.description} onChange={handle} placeholder="Describe what you need it for and any specific requirements..." rows={3} style={{ resize: 'vertical' }} />
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Needed Before</label>
                  <input type="date" name="neededBefore" value={form.neededBefore} onChange={handle} min={new Date().toISOString().split('T')[0]} />
                </div>
                <div className="form-group">
                  <label className="form-label">Your City</label>
                  <input name="city" value={form.city} onChange={handle} placeholder="Location" />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' }}>
                <button type="button" className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Post Request</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
