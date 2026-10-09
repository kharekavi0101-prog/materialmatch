import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { addMaterial } from '../data/store';
import { useApp } from '../context/AppContext';

const CATEGORIES = ['Wood', 'Metal', 'Plastic', 'Paper / Cardboard', 'Textile', 'Glass', 'Organic Material', 'Construction Material', 'Packaging Material', 'Electronics', 'Mixed / Other'];
const CONDITIONS = ['Clean / Reusable', 'Clean / Unused', 'Used / Intact', 'Used / Clean', 'Lightly Used', 'Fresh / Organic', 'Tested / Functional', 'Clean / Raw'];
const UNITS = ['kg', 'units', 'meters', 'liters', 'sheets', 'rolls', 'pieces'];

export default function AddMaterial() {
  const { currentUser, refresh } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', category: '', description: '', quantity: '', unit: 'kg',
    condition: '', availableUntil: '', city: currentUser?.city || '',
    pickupRequired: true, suggestedUses: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handle = (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm(f => ({ ...f, [e.target.name]: val }));
  };

  const validate = () => {
    if (!form.name.trim()) return 'Material name is required.';
    if (!form.category) return 'Please select a category.';
    if (!form.description.trim()) return 'Description is required.';
    if (!form.quantity || parseFloat(form.quantity) <= 0) return 'Quantity must be a positive number.';
    if (!form.condition) return 'Please select a condition.';
    if (!form.city.trim()) return 'City/Location is required.';
    return null;
  };

  const submit = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setError('');
    setLoading(true);
    setTimeout(() => {
      addMaterial({
        ...form,
        quantity: parseFloat(form.quantity),
        orgId: currentUser.id,
      });
      refresh();
      setSuccess(true);
      setLoading(false);
    }, 300);
  };

  if (success) {
    return (
      <div className="animate-fade-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
        <div style={{ width: '80px', height: '80px', background: 'var(--green-dim)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
          <CheckCircle size={40} color="var(--green)" />
        </div>
        <h2 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '12px' }}>Material Listed!</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '16px', marginBottom: '28px', maxWidth: '400px', lineHeight: '1.6' }}>
          Your material is now live on the marketplace and available for other organizations to request.
        </p>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-primary" onClick={() => navigate('/marketplace')}>View Marketplace</button>
          <button className="btn btn-secondary" onClick={() => { setSuccess(false); setForm({ name: '', category: '', description: '', quantity: '', unit: 'kg', condition: '', availableUntil: '', city: currentUser?.city || '', pickupRequired: true, suggestedUses: '' }); }}>
            Add Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-up">
      <div className="page-header">
        <h1 className="page-title">Add Material</h1>
        <p className="page-subtitle">List your surplus material on the marketplace. Another organization can give it a second life.</p>
      </div>

      <div style={{ maxWidth: '720px' }}>
        {error && (
          <div className="alert alert-error" style={{ marginBottom: '20px' }}>
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <div className="card">
          <form onSubmit={submit}>
            <h3 style={{ fontWeight: 700, fontSize: '15px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '20px' }}>
              Basic Information
            </h3>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Material Name *</label>
                <input name="name" value={form.name} onChange={handle} placeholder="e.g. Wood Offcuts, Fabric Scraps..." />
              </div>
              <div className="form-group">
                <label className="form-label">Category *</label>
                <select name="category" value={form.category} onChange={handle}>
                  <option value="">Select category...</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Description *</label>
              <textarea
                name="description" value={form.description} onChange={handle}
                placeholder="Describe the material — size, grade, how it was generated, any relevant details..."
                rows={3} style={{ resize: 'vertical' }}
              />
            </div>

            <hr className="divider" />
            <h3 style={{ fontWeight: 700, fontSize: '15px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '20px', marginTop: '4px' }}>
              Quantity & Condition
            </h3>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Quantity *</label>
                <input type="number" name="quantity" value={form.quantity} onChange={handle} placeholder="e.g. 35" min="0.1" step="0.1" />
              </div>
              <div className="form-group">
                <label className="form-label">Unit *</label>
                <select name="unit" value={form.unit} onChange={handle}>
                  {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Condition *</label>
                <select name="condition" value={form.condition} onChange={handle}>
                  <option value="">Select condition...</option>
                  {CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Available Until</label>
                <input type="date" name="availableUntil" value={form.availableUntil} onChange={handle} min={new Date().toISOString().split('T')[0]} />
              </div>
            </div>

            <hr className="divider" />
            <h3 style={{ fontWeight: 700, fontSize: '15px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '20px', marginTop: '4px' }}>
              Location & Pickup
            </h3>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">City / Location *</label>
                <input name="city" value={form.city} onChange={handle} placeholder="e.g. Delhi, Mumbai..." />
              </div>
              <div className="form-group" style={{ justifyContent: 'flex-end' }}>
                <label className="form-label">Pickup Required</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '10px 14px', background: 'var(--surface-2)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <input type="checkbox" name="pickupRequired" checked={form.pickupRequired} onChange={handle} style={{ width: 'auto', margin: 0 }} />
                  <span style={{ fontSize: '14px', color: 'var(--text)' }}>Pickup required from our location</span>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Suggested Uses</label>
              <input
                name="suggestedUses" value={form.suggestedUses} onChange={handle}
                placeholder="e.g. Craft projects, packaging, student model-making... (comma separated)"
              />
            </div>

            <hr className="divider" />

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button type="button" className="btn btn-ghost" onClick={() => navigate('/marketplace')}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={loading} style={{ minWidth: '140px' }}>
                {loading ? 'Listing...' : 'List Material'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
