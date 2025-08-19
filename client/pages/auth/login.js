import { useState } from 'react';
import Header from '../../components/layout/Header';
import api from '../../lib/api';
import { saveAuth } from '../../lib/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/login', { email, password });
      saveAuth(res.data.token, res.data.user);
      window.location.href = '/';
    } catch (err) {
      setError(err.response?.data?.message || '로그인 실패');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main className="container">
        <h2>로그인</h2>
        <form onSubmit={handleLogin} style={{ display: 'grid', gap: 12, maxWidth: 420 }}>
          <input className="input" type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="input" type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <div style={{ color: 'crimson' }}>{error}</div>}
          <button className="btn" disabled={loading}>{loading ? '진행 중...' : '로그인'}</button>
        </form>
      </main>
    </>
  );
}


