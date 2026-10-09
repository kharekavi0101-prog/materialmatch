import { getExchanges, getOrg } from '../data/store';
import { useApp } from '../context/AppContext';

export default function HistoryPage() {
  const { currentUser, tr } = useApp();
  const allExchanges = getExchanges();

  // All exchanges sorted by most recent
  const history = [...allExchanges]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const statusLabels = {
    completed: { label: 'Completed', color: 'var(--green)' },
    accepted: { label: 'Active', color: 'var(--blue)' },
    pending: { label: 'Pending', color: 'var(--yellow)' },
    rejected: { label: 'Rejected', color: 'var(--red)' },
  };

  return (
    <div className="animate-fade-up">
      <div className="page-header">
        <h1 className="page-title">{tr('history_title')}</h1>
        <p className="page-subtitle">{tr('history_subtitle')}</p>
      </div>

      <div className="card">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {history.length === 0 ? (
            <div className="empty-state" style={{ padding: '40px' }}>
              <p>{tr('history_no_history')}</p>
            </div>
          ) : (
            history.map((exc, i) => {
              const supplier = getOrg(exc.supplierId);
              const receiver = getOrg(exc.requesterId);
              const status = statusLabels[exc.status] || { label: exc.status, color: 'var(--text-muted)' };
              const isMyExchange = currentUser && (exc.supplierId === currentUser.id || exc.requesterId === currentUser.id);

              return (
                <div
                  key={exc.id}
                  className={`activity-item animate-fade-up stagger-${Math.min(i + 1, 6)}`}
                  style={{ paddingLeft: '8px', background: isMyExchange ? 'var(--accent-dim)' : 'transparent', borderRadius: isMyExchange ? '8px' : '0', marginBottom: '2px' }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingTop: '6px' }}>
                    <div style={{
                      width: '2px', minHeight: '60px',
                      background: exc.status === 'completed' ? 'var(--accent)' : exc.status === 'accepted' ? 'var(--blue)' : 'var(--border)',
                      borderRadius: '2px',
                    }} />
                  </div>
                  <div style={{ flex: 1, paddingBottom: '8px', minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--text)', marginBottom: '4px' }}>
                          {exc.quantity} {exc.unit} of <span style={{ color: 'var(--accent)' }}>{exc.materialName}</span>
                        </div>
                        <div className="flow-indicator" style={{ marginBottom: '4px' }}>
                          <span style={{ fontWeight: 600 }}>{supplier?.name || 'Unknown'}</span>
                          <span className="flow-arrow" style={{ fontSize: '16px' }}>→</span>
                          <span style={{ fontWeight: 600 }}>{receiver?.name || 'Unknown'}</span>
                        </div>
                        {exc.message && (
                          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: '1.4' }}>
                            "{exc.message.substring(0, 100)}{exc.message.length > 100 ? '...' : ''}"
                          </p>
                        )}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', flexShrink: 0 }}>
                        <span style={{
                          padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700,
                          background: `${status.color}20`, color: status.color,
                          border: `1px solid ${status.color}40`,
                        }}>
                          {status.label}
                        </span>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                          {exc.completedAt || exc.createdAt}
                        </span>
                        {isMyExchange && (
                            <span style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 600 }}>{tr('history_your_exchange')}</span>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Summary */}
      {history.length > 0 && (
        <div className="card" style={{ marginTop: '20px', background: 'var(--surface-2)' }}>
          <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap' }}>
            {[
              { label: tr('history_total'), value: history.length },
                { label: tr('history_completed'), value: history.filter(e => e.status === 'completed').length },
                { label: tr('history_active'), value: history.filter(e => e.status === 'accepted').length },
                { label: tr('history_pending'), value: history.filter(e => e.status === 'pending').length },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--accent)', letterSpacing: '-1px' }}>{s.value}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
