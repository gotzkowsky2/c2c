import { useEffect, useState } from 'react';
import Header from '../../components/layout/Header';
import api from '../../lib/api';

export default function ProviderDashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/projects').then((res) => setProjects(res.data));
  }, []);

  return (
    <>
      <Header />
      <main className="container">
        <h2>제공자 대시보드</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {projects.map((p) => (
            <li key={p._id} style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: 12, marginBottom: 12 }}>
              <div><b>{p.service?.title}</b> — 상태: {p.status}</div>
              <div style={{ color: '#475569' }}>요청자: {p.consumer?.firstName} {p.consumer?.lastName}</div>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}


