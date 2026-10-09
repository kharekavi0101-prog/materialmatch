import { useState } from 'react';
import { CheckCircle, XCircle, Clock, ArrowRight, AlertCircle } from 'lucide-react';
import { getExchanges, updateExchangeStatus, getOrg, getMaterial } from '../data/store';
import { useApp } from '../context/AppContext';

export default function Exchanges() {
  const { currentUser, refresh, tr } = useApp();
  const [activeTab, setActiveTab] = useState('pending');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const allExchanges = getExchanges();

  // Exchanges involving current user
  const myExchanges = allExchanges.filter(
    e => e.supplierId === currentUser?.id || e.requesterId === currentUser?.id
  );

  const tabs = {
    pending: myExchanges.filter(e => e.status === 'pending'),
    accepted: myExchanges.filter(e => e.status === 'accepted'),
    completed: myExchanges.filter(e => e.status === 'completed'),
    rejected: myExchanges.filter(e => e.status === 'rejected'),
  };

  const handleAction = (excId, action) => {
    setError('');
    const result = updateExchangeStatus(excId, action);
    if (result?.error) { setError(result.error); return; }
    refresh();
    const msg = action === 'accepted' ? tr('exc_accepted_msg') : action === 'rejected' ? tr('exc_rejected_msg') : action === 'completed' ? tr('exc_completed_msg') : '';
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3500);
  };

  return (
    <div className="animate-fade-up">
      <div className="page-header">
        <h1 className="page-title">{tr('exc_title')}</h1>
        <p className="page-subtitle">{tr('exc_subtitle')}</p>
      </div>

      {error && <div className="alert alert-error" style={{ marginBottom: '16px' }}><AlertCircle size={16} /> {error}</div>}
      {successMsg && <div className="alert alert-success" style={{ marginBottom: '16px' }}><CheckCircle size={16} /> {successMsg}</div>}

      <div className="tabs">
        {[
          { key: 'pending', label: tr('exc_tab_pending'), count: tabs.pending.length },
          { key: 'accepted', label: tr('exc_tab_active'), count: tabs.accepted.length },
          { key: 'completed', label: tr('exc_tab_completed'), count: tabs.completed.length },
          { key: 'rejected', label: tr('exc_tab_rejected'), count: tabs.rejected.length },
        ].map(t => (
          <button
            key={t.key}
            className={`tab ${activeTab === t.key ? 'active' : ''}`}
            onClick={() => setActiveTab(t.key)}
          >
            {t.label}
            {t.count > 0 && (
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: '18px', height: '18px', borderRadius: '50%',
                background: activeTab === t.key ? 'var(--accent)' : 'var(--surface-3)',
                color: activeTab === t.key ? '#0f1410' : 'var(--text-muted)',
                fontSize: '10px', fontWeight: 700, marginLeft: '6px',
              }}>
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {tabs[activeTab].length === 0 ? (
        <div className="empty-state">
          <Clock size={48} />
          <h3>{tr('exc_no_exchanges')}</h3>
          <p>{tr('exc_no_exchanges_desc')}</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {tabs[activeTab].map(exc => (
            <ExchangeCard
              key={exc.id}
              exc={exc}
              currentUserId={currentUser?.id}
              onAction={handleAction}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ExchangeCard({ exc, currentUserId, onAction }) {
  const { tr } = useApp();
  const supplier = getOrg(exc.supplierId);
  const requester = getOrg(exc.requesterId);
  const isSupplier = currentUserId === exc.supplierId;

  const statusColors = {
    pending: 'var(--yellow)',
    accepted: 'var(--blue)',
    completed: 'var(--green)',
    rejected: 'var(--red)',
  };

  return (
    <div className="card animate-fade-up" style={{ padding: '20px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
        {/* Left: material and flow */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
            <h3 style={{ fontWeight: 700, fontSize: '17px', color: 'var(--text)' }}>{exc.materialName}</h3>
            <span className={`badge badge-${exc.status}`}>{exc.status.toUpperCase()}</span>
          </div>

          {/* Flow */}
          <div className="flow-indicator" style={{ marginBottom: '10px', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 600, color: 'var(--text)' }}>{supplier?.name || '?'}</span>
            <span className="flow-arrow">→</span>
            <span style={{ fontWeight: 600, color: 'var(--text)' }}>{requester?.name || '?'}</span>
            <span style={{ color: 'var(--accent)', fontWeight: 700, marginLeft: '8px' }}>{exc.quantity} {exc.unit}</span>
          </div>

          {exc.message && (
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: '1.5', marginBottom: '10px', borderLeft: '3px solid var(--border)', paddingLeft: '10px' }}>
              "{exc.message}"
            </p>
          )}

          <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
          <span>📅 {tr('exc_requested')} {exc.createdAt}</span>
          {exc.preferredPickup && <span>🚗 {tr('exc_pickup')} {exc.preferredPickup}</span>}
          {exc.completedAt && <span style={{ color: 'var(--green)', fontWeight: 600 }}>✅ {tr('exc_completed_on')} {exc.completedAt}</span>}
        </div>

        {/* Role indicator */}
        <div style={{ marginTop: '10px', fontSize: '12px' }}>
          <span style={{
            padding: '2px 8px', borderRadius: '4px', fontWeight: 600,
            background: isSupplier ? 'var(--yellow-dim)' : 'var(--blue-dim)',
            color: isSupplier ? 'var(--yellow)' : 'var(--blue)',
            border: `1px solid ${isSupplier ? 'rgba(251,191,36,0.25)' : 'rgba(96,165,250,0.25)'}`,
          }}>
            {isSupplier ? tr('exc_you_supplier') : tr('exc_you_requester')}
          </span>
          </div>
        </div>

        {/* Right: actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '160px' }}>
          {/* Supplier actions for pending */}
          {isSupplier && exc.status === 'pending' && (
            <>
              <button className="btn btn-success btn-sm" onClick={() => onAction(exc.id, 'accepted')} style={{ justifyContent: 'center' }}>
                <CheckCircle size={14} /> {tr('exc_accept')}
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => onAction(exc.id, 'rejected')} style={{ justifyContent: 'center' }}>
                <XCircle size={14} /> {tr('exc_reject')}
              </button>
            </>
          )}
          {isSupplier && exc.status === 'accepted' && (
            <button className="btn btn-primary btn-sm" onClick={() => onAction(exc.id, 'completed')} style={{ justifyContent: 'center' }}>
              <CheckCircle size={14} /> {tr('exc_complete')}
            </button>
          )}
          {exc.status === 'completed' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--green)', fontSize: '13px', fontWeight: 600 }}>
              <CheckCircle size={16} /> {tr('exc_done')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
