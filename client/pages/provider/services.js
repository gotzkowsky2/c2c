import { useEffect, useState } from 'react';
import Header from '../../components/layout/Header';
import api from '../../lib/api';

export default function ProviderServices() {
  const [services, setServices] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('anmeldung');
  const [priceEUR, setPriceEUR] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  async function load() {
    const res = await api.get('/services', { params: { provider: JSON.parse(localStorage.getItem('user') || '{}')?.id } });
    setServices(res.data);
  }

  useEffect(() => { load(); }, []);

  async function createService(e) {
    e.preventDefault();
    await api.post('/services', { title, description, category, priceEUR: Number(priceEUR), city, postalCode, lat: lat ? Number(lat) : undefined, lng: lng ? Number(lng) : undefined });
    setTitle(''); setDescription(''); setCategory('anmeldung'); setPriceEUR(''); setCity(''); setPostalCode(''); setLat(''); setLng('');
    await load();
  }

  return (
    <>
      <Header />
      <main className="container">
        <h2>내 서비스</h2>
        <form onSubmit={createService} style={{ display: 'grid', gap: 12, maxWidth: 640 }}>
          <input className="input" placeholder="서비스 제목" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea className="input" rows={5} placeholder="설명" value={description} onChange={(e) => setDescription(e.target.value)} />
          <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="anmeldung">Anmeldung</option>
            <option value="visa_extension">Visa Extension</option>
            <option value="translation">Translation</option>
            <option value="legal">Legal</option>
            <option value="life_coaching">Life Coaching</option>
            <option value="other">Other</option>
          </select>
          <input className="input" type="number" min="0" step="1" placeholder="가격(€)" value={priceEUR} onChange={(e) => setPriceEUR(e.target.value)} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <input className="input" placeholder="도시 (예: Berlin)" value={city} onChange={(e) => setCity(e.target.value)} />
            <input className="input" placeholder="우편번호 (예: 10115)" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <input className="input" type="number" step="0.000001" placeholder="위도(lat)" value={lat} onChange={(e) => setLat(e.target.value)} />
            <input className="input" type="number" step="0.000001" placeholder="경도(lng)" value={lng} onChange={(e) => setLng(e.target.value)} />
          </div>
          <button className="btn">등록</button>
        </form>

        <ul style={{ listStyle: 'none', padding: 0, marginTop: 24 }}>
          {services.map((s) => (
            <li key={s._id} style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: 12, marginBottom: 12 }}>
              <b>{s.title}</b> — €{s.priceEUR}
              <div style={{ color: '#475569' }}>{s.description}</div>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}


