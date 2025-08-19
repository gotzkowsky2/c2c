import { useState } from 'react';
import Header from '../../components/layout/Header';
import api from '../../lib/api';
import { saveAuth } from '../../lib/auth';

export default function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isProvider, setIsProvider] = useState(false);
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const providerProfile = isProvider ? { bio, skills: skills.split(',').map((s) => s.trim()).filter(Boolean) } : undefined;
      const res = await api.post('/auth/register', { firstName, lastName, email, password, isProvider, providerProfile });
      saveAuth(res.data.token, res.data.user);
      window.location.href = '/';
    } catch (err) {
      setError(err.response?.data?.message || '회원가입 실패');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main className="container">
        <h2>회원가입</h2>
        <form onSubmit={handleRegister} style={{ display: 'grid', gap: 12, maxWidth: 640 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <input className="input" placeholder="이름" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input className="input" placeholder="성" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <input className="input" type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="input" type="password" placeholder="비밀번호(8자 이상)" value={password} onChange={(e) => setPassword(e.target.value)} />
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input type="checkbox" checked={isProvider} onChange={(e) => setIsProvider(e.target.checked)} />
            <span>나는 서비스를 제공할 계획이 있습니다(선택)</span>
          </label>
          {isProvider && (
            <div style={{ display: 'grid', gap: 12 }}>
              <textarea className="input" rows={4} placeholder="소개(한 줄 자기소개 또는 전문 분야)" value={bio} onChange={(e) => setBio(e.target.value)} />
              <input className="input" placeholder="보유 스킬(쉼표로 구분, 예: 번역,비자,안멜둥)" value={skills} onChange={(e) => setSkills(e.target.value)} />
            </div>
          )}
          {error && <div style={{ color: 'crimson' }}>{error}</div>}
          <button className="btn" disabled={loading}>{loading ? '진행 중...' : '가입하기'}</button>
        </form>
      </main>
    </>
  );
}


