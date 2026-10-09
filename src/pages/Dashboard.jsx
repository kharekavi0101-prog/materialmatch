import { useNavigate } from 'react-router-dom';
import { Package, Clock, CheckCircle, Leaf, Plus, Search, ArrowRight, Bell, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getOrgStats, getStore, getOrg } from '../data/store';

export default function Dashboard() {
  const { currentUser } = useApp();
  const navigate = useNavigate();

  if (!currentUser) return null;

  const stats = getOrgStats(currentUser.id);
  const store = getStore();

  // Recent activity - incoming requests for my materials
  const myMaterialIds = store.materials.filter(m => m.orgId === currentUser.id).map(m => m.id);
  const incomingExchanges = store.exchanges
    .filter(e => e.supplierId === currentUser.id)
    .slice(-5)
    .reverse();
  const recentCompleted = store.exchanges
    .filter(e => (e.supplierId === currentUser.id || e.requesterId === currentUser.id) && e.status === 'completed')
    .slice(-4)
    .reverse();

  return (
    <div className="animate-fade-up">
      {/* Header */}
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Welcome back
          </p>
          <h1 className="page-title">{currentUser.name}</h1>
          <p className="page-subtitle">{currentUser.type} · {currentUser.city}</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/marketplace')}>
            <Search size={14} /> Browse Materials
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/add-material')}>
            <Plus size={14} /> Add Material
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid-4" style={{ marginBottom: '28px' }}>
        {[
          { label: 'Active Listings', value: stats.activeListings, icon: <Package size={18} />, color: 'var(--accent)' },
          { label: 'Pending Requests', value: stats.pendingRequests, icon: <Bell size={18} />, color: 'var(--yellow)' },
          { label: 'Completed Exchanges', value: stats.successfulExchanges, icon: <CheckCircle size={18} />, color: 'var(--green)' },
          { label: 'Waste Diverted', value: `${stats.wasteDiverted} kg`, icon: <Leaf size={18} />, color: 'var(--blue)' },
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

      {/* Quick Actions */}
      <div className="card" style={{ marginBottom: '24px', padding: '20px 24px' }}>
        <h3 style={{ fontWeight: 700, fontSize: '15px', marginBottom: '16px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Quick Actions
        </h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {[
            { label: 'Add Material', icon: <Plus size={16} />, path: '/add-material', cls: 'btn-primary' },
            { label: 'Browse Materials', icon: <Search size={16} />, path: '/marketplace', cls: 'btn-secondary' },
            { label: 'View Requests', icon: <Bell size={16} />, path: '/exchanges', cls: 'btn-secondary' },
            { label: 'View Impact', icon: <TrendingUp size={16} />, path: '/impact', cls: 'btn-secondary' },
          ].map(action => (
            <button key={action.label} className={`btn ${action.cls} btn-sm`} onClick={() => navigate(action.path)}>
              {action.icon} {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Two column layout */}
      <div className="grid-2" style={{ alignItems: 'start' }}>
        {/* Incoming Requests */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontWeight: 700, fontSize: '16px' }}>Incoming Requests</h3>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/exchanges')}>
              View All <ArrowRight size={14} />
            </button>
          </div>
          {incomingExchanges.length === 0 ? (
            <div className="empty-state" style={{ padding: '30px' }}>
              <p>No incoming requests yet.</p>
            </div>
          ) : (
            incomingExchanges.map(exc => {
              const requester = getOrg(exc.requesterId);
              return (
                <div key={exc.id} className="activity-item">
                  <div className="activity-dot" style={{
                    background: exc.status === 'pending' ? 'var(--yellow)' : exc.status === 'accepted' ? 'var(--green)' : 'var(--accent)',
                    boxShadow: `0 0 8px ${exc.status === 'pending' ? 'var(--yellow)' : 'var(--green)'}`,
                  }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text)' }}>{exc.materialName}</div>
                      <span className={`badge badge-${exc.status}`}>{exc.status}</span>
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                      {requester?.name || 'Unknown'} · {exc.quantity} {exc.unit}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{exc.createdAt}</div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Recent Completed */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontWeight: 700, fontSize: '16px' }}>Recent Exchanges</h3>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/history')}>
              History <ArrowRight size={14} />
            </button>
          </div>
          {recentCompleted.length === 0 ? (
            <div className="empty-state" style={{ padding: '30px' }}>
              <p>No completed exchanges yet.</p>
            </div>
          ) : (
            recentCompleted.map(exc => {
              const supplier = getOrg(exc.supplierId);
              const receiver = getOrg(exc.requesterId);
              return (
                <div key={exc.id} className="activity-item">
                  <div className="activity-dot" style={{ background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)' }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text)', marginBottom: '2px' }}>{exc.materialName}</div>
                    <div className="flow-indicator">
                      <span>{supplier?.name || '?'}</span>
                      <span className="flow-arrow">→</span>
                      <span>{receiver?.name || '?'}</span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: 600, marginTop: '2px' }}>
                      {exc.quantity} {exc.unit} reused · {exc.completedAt}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Sustainability summary */}
      <div className="card" style={{ marginTop: '24px', background: 'var(--surface-2)', border: '1px solid var(--glass-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ width: '40px', height: '40px', background: 'var(--accent-dim)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Leaf size={20} color="var(--accent)" />
          </div>
          <div>
            <h3 style={{ fontWeight: 700, fontSize: '16px' }}>Your Sustainability Impact</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Every kilogram reused is a win for the planet.</p>
          </div>
          <button className="btn btn-secondary btn-sm" style={{ marginLeft: 'auto' }} onClick={() => navigate('/impact')}>
            Full Report <ArrowRight size={14} />
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {[
            { label: 'Total Materials Listed', value: stats.totalMaterials },
            { label: 'Materials Received', value: stats.materialsReceived },
            { label: 'Successful Exchanges', value: stats.successfulExchanges },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center', padding: '16px', background: 'var(--surface)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--accent)', letterSpacing: '-1px' }}>{s.value}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
