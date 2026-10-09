import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Leaf, AlertCircle, CheckCircle } from 'lucide-react';
import { register } from '../data/store';
import { useApp } from '../context/AppContext';

const ORG_TYPES = ['Workshop', 'NGO', 'Business', 'Institution', 'Event Organizer', 'Community Group', 'Makerspace', 'Repair Group', 'Other'];

export default function RegisterPage() {
  const { setCurrentUser, refresh } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', type: '', contact: '', email: '', password: '', city: '', description: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    const required = ['name', 'type', 'contact', 'email', 'password', 'city'];
    for (const f of required) {
      if (!form[f].trim()) return `Please fill in ${f.replace(/([A-Z])/g, ' $1').toLowerCase()}.`;
    }
    if (!form.email.includes('@')) return 'Please enter a valid email.';
    if (form.password.length < 6) return 'Password must be at least 6 characters.';
    return null;
  };

  const submit = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setError('');
    setLoading(true);
    setTimeout(() => {
      const result = register(form);
      if (result.error) { setError(result.error); setLoading(false); return; }
      setCurrentUser(result.org);
      refresh();
      navigate('/dashboard');
    }, 400);
  };

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px 20px',
    }}>
      <div className="animate-fade-up" style={{ width: '100%', maxWidth: '560px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{ width: '40px', height: '40px', background: 'var(--accent)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Leaf size={22} color="#0f1410" />
            </div>
            <span style={{ fontWeight: 800, fontSize: '20px', color: 'var(--text)' }}>MaterialMatch</span>
          </Link>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '6px' }}>Register your organization</p>
        </div>

        <div className="card" style={{ padding: '32px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '6px' }}>Create Account</h2>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px' }}>Join the circular economy network</p>

          {error && (
            <div className="alert alert-error" style={{ marginBottom: '16px' }}>
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <form onSubmit={submit}>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Organization Name *</label>
                <input name="name" value={form.name} onChange={handle} placeholder="e.g. UrbanCraft Workshop" />
              </div>
              <div className="form-group">
                <label className="form-label">Organization Type *</label>
                <select name="type" value={form.type} onChange={handle}>
                  <option value="">Select type...</option>
                  {ORG_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Contact Person *</label>
                <input name="contact" value={form.contact} onChange={handle} placeholder="Your name" />
              </div>
              <div className="form-group">
                <label className="form-label">City *</label>
                <input name="city" value={form.city} onChange={handle} placeholder="e.g. Delhi" />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input type="email" name="email" value={form.email} onChange={handle} placeholder="org@example.com" />
              </div>
              <div className="form-group">
                <label className="form-label">Password *</label>
                <input type="password" name="password" value={form.password} onChange={handle} placeholder="Min 6 characters" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Short Description</label>
              <textarea
                name="description" value={form.description} onChange={handle}
                placeholder="What does your organization do? What materials do you typically generate or need?"
                rows={3}
                style={{ resize: 'vertical' }}
              />
            </div>

            {/* What you get */}
            <div style={{ background: 'var(--surface-2)', borderRadius: '8px', padding: '14px', marginBottom: '20px', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Joining gives you access to:
              </div>
              {['Post surplus materials for free', 'Request materials from other organizations', 'Track your sustainability impact', 'Connect with 14+ organizations'].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <CheckCircle size={13} color="var(--green)" /> {item}
                </div>
              ))}
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--accent)', fontWeight: 600 }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}
