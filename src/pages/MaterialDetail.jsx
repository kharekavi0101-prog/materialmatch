import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Truck, Lightbulb, AlertCircle, CheckCircle } from 'lucide-react';
import { getMaterial, getOrg, addExchange, getMaterials } from '../data/store';
import { useApp } from '../context/AppContext';

const CATEGORY_ICONS = {
  'Wood': '🪵', 'Metal': '🔩', 'Plastic': '♻️', 'Paper / Cardboard': '📦',
  'Textile': '🧵', 'Glass': '🫙', 'Organic Material': '🌿',
  'Construction Material': '🏗️', 'Packaging Material': '📫',
  'Electronics': '⚡', 'Mixed / Other': '🔄',
};

export default function MaterialDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, refresh } = useApp();
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [form, setForm] = useState({ quantity: '', message: '', preferredPickup: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Re-read material fresh on each render
  const mat = getMaterial(id);

  if (!mat) return (
    <div className="empty-state">
      <AlertCircle size={48} />
      <h3>Material not found</h3>
      <button className="btn btn-secondary btn-sm" onClick={() => navigate('/marketplace')}>← Back to Marketplace</button>
    </div>
  );

  const org = getOrg(mat.orgId);
  const icon = CATEGORY_ICONS[mat.category] || '🔄';
  const isOwner = currentUser?.id === mat.orgId;
  const isAvailable = mat.status === 'available' || mat.status === 'requested';

  const handleRequest = (e) => {
    e.preventDefault();
    setError('');
    if (!form.quantity || !form.message) { setError('Please fill in all required fields.'); return; }
    const qty = parseFloat(form.quantity);
    if (isNaN(qty) || qty <= 0) { setError('Quantity must be a positive number.'); return; }
    if (qty > mat.quantity) { setError(`Requested quantity cannot exceed available quantity (${mat.quantity} ${mat.unit}).`); return; }

    addExchange({
      materialId: mat.id,
      requesterId: currentUser.id,
      supplierId: mat.orgId,
      quantity: qty,
      unit: mat.unit,
      message: form.message,
      preferredPickup: form.preferredPickup,
      materialName: mat.name,
    });
    refresh();
    setSuccess(true);
    setShowRequestForm(false);
    setForm({ quantity: '', message: '', preferredPickup: '' });
  };

  return (
    <div className="animate-fade-up">
      <button className="btn btn-ghost btn-sm" onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>
        <ArrowLeft size={16} /> Back
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', alignItems: 'start' }}>
        {/* Main content */}
        <div>
          {/* Header card */}
          <div className="card" style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{
                width: '90px', height: '90px',
                background: 'var(--surface-2)', borderRadius: '16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '48px', flexShrink: 0,
                border: '1px solid var(--border)',
              }}>
                {icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h1 style={{ fontSize: '26px', fontWeight: 800, letterSpacing: '-0.5px', color: 'var(--text)' }}>{mat.name}</h1>
                  <span className={`badge badge-${mat.status}`}>{mat.status.toUpperCase()}</span>
                </div>
                <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '12px' }}>{mat.category}</div>
                <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>{mat.description}</p>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="card" style={{ marginBottom: '20px' }}>
            <h3 style={{ fontWeight: 700, fontSize: '15px', marginBottom: '16px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Material Details
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {[
                { label: 'Quantity Available', value: `${mat.quantity} ${mat.unit}`, highlight: true },
                { label: 'Condition', value: mat.condition },
                { label: 'Category', value: mat.category },
                { label: 'Available Until', value: mat.availableUntil },
              ].map(item => (
                <div key={item.label} style={{ background: 'var(--surface-2)', borderRadius: '8px', padding: '12px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>{item.label}</div>
                  <div style={{ fontWeight: 700, fontSize: '15px', color: item.highlight ? 'var(--accent)' : 'var(--text)' }}>{item.value}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '14px', display: 'flex', gap: '16px', fontSize: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                <MapPin size={15} color="var(--accent)" />
                <span>{mat.city}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                <Truck size={15} color="var(--accent)" />
                <span>{mat.pickupRequired ? 'Pickup required' : 'Flexible arrangement'}</span>
              </div>
            </div>
          </div>

          {/* Suggested uses */}
          {mat.suggestedUses && (
            <div className="card" style={{ marginBottom: '20px', background: 'var(--surface-2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <Lightbulb size={18} color="var(--accent)" />
                <h3 style={{ fontWeight: 700, fontSize: '15px' }}>Suggested Uses</h3>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {mat.suggestedUses.split(',').map(use => (
                  <span key={use} style={{
                    padding: '5px 12px', background: 'var(--accent-dim)', borderRadius: '20px',
                    fontSize: '13px', color: 'var(--accent)', fontWeight: 600,
                    border: '1px solid var(--glass-border)',
                  }}>
                    {use.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Sustainability message */}
          <div style={{
            background: 'var(--green-dim)', border: '1px solid rgba(34,197,94,0.25)',
            borderRadius: '12px', padding: '16px 20px', display: 'flex', gap: '12px',
          }}>
            <div style={{ fontSize: '24px' }}>🌱</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--green)', marginBottom: '4px' }}>Sustainability Impact</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Reusing this material diverts waste from landfills and reduces the need for virgin resource extraction.
                This supports SDG 12: Responsible Consumption and Production.
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Provider card */}
          <div className="card">
            <h3 style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '14px' }}>
              Material Provider
            </h3>
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontWeight: 700, fontSize: '17px', marginBottom: '2px' }}>{org?.name}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{org?.type} · {org?.city}</div>
            </div>
            {org?.description && (
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '14px' }}>
                {org.description.substring(0, 120)}...
              </p>
            )}
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              📅 Listed {mat.createdAt}
            </div>
          </div>

          {/* Request action */}
          {success && (
            <div className="alert alert-success">
              <CheckCircle size={16} /> Request sent successfully! The provider will review it soon.
            </div>
          )}

          {!isOwner && (
            <div className="card" style={{ background: 'var(--surface-2)' }}>
              <h3 style={{ fontWeight: 700, fontSize: '15px', marginBottom: '8px' }}>Request This Material</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                {isAvailable
                  ? 'This material is available. Send a request to the provider.'
                  : 'This material is currently not available for new requests.'}
              </p>
              {isAvailable && !success && (
                <button
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => setShowRequestForm(true)}
                >
                  Request Material
                </button>
              )}
            </div>
          )}

          {isOwner && (
            <div className="card" style={{ background: 'var(--accent-dim)', border: '1px solid var(--glass-border)' }}>
              <p style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 600 }}>
                ✓ This is your listing
              </p>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px' }}>
                Check the Exchanges page to see requests for this material.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Request Modal */}
      {showRequestForm && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowRequestForm(false)}>
          <div className="modal">
            <h2 className="modal-title">Request Material</h2>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Requesting: <strong style={{ color: 'var(--accent)' }}>{mat.name}</strong> from {org?.name}
            </p>

            {error && <div className="alert alert-error" style={{ marginBottom: '16px' }}><AlertCircle size={16} /> {error}</div>}

            <form onSubmit={handleRequest}>
              <div className="form-group">
                <label className="form-label">Quantity Requested * (max: {mat.quantity} {mat.unit})</label>
                <input
                  type="number" value={form.quantity}
                  onChange={e => setForm(f => ({ ...f, quantity: e.target.value }))}
                  placeholder={`Enter quantity (max ${mat.quantity})`}
                  min="0.1" max={mat.quantity} step="0.1"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message to Provider *</label>
                <textarea
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Briefly explain how you plan to use this material..."
                  rows={3} style={{ resize: 'vertical' }}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Preferred Pickup Date</label>
                <input
                  type="date" value={form.preferredPickup}
                  onChange={e => setForm(f => ({ ...f, preferredPickup: e.target.value }))}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-ghost" onClick={() => setShowRequestForm(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Send Request</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
