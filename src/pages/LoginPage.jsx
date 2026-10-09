import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Leaf, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { login } from '../data/store';
import { useApp } from '../context/AppContext';

export default function LoginPage() {
  const { setCurrentUser, refresh, tr } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) { setError(tr('login_error_fields')); return; }
    setLoading(true);
    setTimeout(() => {
      const org = login(form.email, form.password);
      if (!org) { setError(tr('login_error_invalid')); setLoading(false); return; }
      setCurrentUser(org);
      refresh();
      navigate('/dashboard');
    }, 400);
  };

  const demoLogin = () => setForm({ email: 'arjun@urbancraft.in', password: 'demo123' });

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="animate-fade-up" style={{ width: '100%', maxWidth: '440px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{ width: '44px', height: '44px', background: 'var(--accent)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Leaf size={24} color="#0f1410" />
            </div>
            <span style={{ fontWeight: 800, fontSize: '22px', color: 'var(--text)' }}>MaterialMatch</span>
          </Link>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '8px' }}>{tr('login_subtitle')}</p>
        </div>

        <div className="card" style={{ padding: '32px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '24px', color: 'var(--text)' }}>{tr('login_title')}</h2>

          {error && <div className="alert alert-error" style={{ marginBottom: '16px' }}><AlertCircle size={16} /> {error}</div>}

          <form onSubmit={submit}>
            <div className="form-group">
              <label className="form-label">{tr('login_email')}</label>
              <input type="email" name="email" value={form.email} onChange={handle} placeholder="you@organization.com" />
            </div>
            <div className="form-group">
              <label className="form-label">{tr('login_password')}</label>
              <div style={{ position: 'relative' }}>
                <input type={showPass ? 'text' : 'password'} name="password" value={form.password} onChange={handle} placeholder="Enter your password" style={{ paddingRight: '44px' }} />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0' }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }} disabled={loading}>
              {loading ? tr('login_signing') : tr('login_btn')}
            </button>
          </form>

          <hr className="divider" />
          <button onClick={demoLogin} className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', marginBottom: '16px' }}>
            {tr('login_demo')}
          </button>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center' }}>Demo: arjun@urbancraft.in / demo123</p>
        </div>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: 'var(--text-muted)' }}>
          {tr('login_no_account')}{' '}
          <Link to="/register" style={{ color: 'var(--accent)', fontWeight: 600 }}>{tr('login_register_link')}</Link>
        </p>
      </div>
    </div>
  );
}
