import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '../../components/layout/Header';
import api from '../../lib/api';

export default function QuotePage() {
  const router = useRouter();
  const { id } = router.query;
  const [service, setService] = useState(null);
  const [brief, setBrief] = useState('');

  useEffect(() => {
    if (!id) return;
    api.get(`/services/${id}`).then((res) => setService(res.data));
  }, [id]);

  async function requestProject() {
    if (!service) return;
    const payload = { serviceId: service._id, providerId: service.provider._id, brief };
    await api.post('/projects', payload);
    alert('프로젝트가 생성되었습니다.');
    router.push('/');
  }

  return (
    <>
      <Header />
      <main className="container">
        {!service ? (
          <div>로딩...</div>
        ) : (
          <div>
            <h2>프로젝트 요청: {service.title}</h2>
            <div>제안가: €{service.priceEUR}</div>
            <textarea className="input" rows={6} placeholder="요청 상세(한국어/영어/독일어)" value={brief} onChange={(e) => setBrief(e.target.value)} />
            <div style={{ marginTop: 12 }}>
              <button className="btn" onClick={requestProject}>요청 보내기</button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}


