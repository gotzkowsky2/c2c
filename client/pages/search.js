import { useEffect, useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import api from '../lib/api';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [useGeo, setUseGeo] = useState(false);
  const [radiusKm, setRadiusKm] = useState(25);
  const [coords, setCoords] = useState(null);
  const [services, setServices] = useState([]);

  async function fetchServices() {
    const params = { q: query };
    if (category) params.category = category;
    if (city) params.city = city;
    if (postalCode) params.postalCode = postalCode;
    if (useGeo && coords) {
      params.lat = coords.lat; params.lng = coords.lng; params.radiusKm = radiusKm;
    }
    const res = await api.get('/services', { params });
    setServices(res.data);
  }

  useEffect(() => { fetchServices(); }, []);

  function detectLocation() {
    if (!navigator.geolocation) return alert('이 브라우저는 위치 정보를 지원하지 않습니다.');
    navigator.geolocation.getCurrentPosition((pos) => {
      setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      setUseGeo(true);
    }, () => alert('위치 권한이 거부되었습니다.'));
  }

  return (
    <>
      <Header />
      <main className="container">
        <h2 className="text-2xl font-semibold mb-3">전문가 검색</h2>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
          <input className="input" placeholder="예: 안멜둥, 비자, 통번역" value={query} onChange={(e) => setQuery(e.target.value)} />
          <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">카테고리 전체</option>
            <option value="anmeldung">안멜둥(거주지 등록)</option>
            <option value="visa_extension">비자 연장</option>
            <option value="translation">통번역</option>
            <option value="legal">법률/행정 상담</option>
            <option value="life_coaching">생활/정착 코칭</option>
            <option value="other">기타</option>
          </select>
          <input className="input" placeholder="도시 (예: 베를린/Berlin)" value={city} onChange={(e) => setCity(e.target.value)} />
          <input className="input" placeholder="우편번호 (예: 10115)" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
          <select className="input" value={radiusKm} onChange={(e) => setRadiusKm(Number(e.target.value))} disabled={!useGeo}>
            {[5, 10, 25, 50, 100].map((r) => <option key={r} value={r}>{r}km</option>)}
          </select>
          <button className="btn" onClick={detectLocation}>내 위치</button>
        </div>
        <div className="mt-2">
          <button className="btn" onClick={fetchServices}>검색</button>
        </div>
        <ul className="mt-4 p-0 list-none grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((s) => (
            <li key={s._id} className="relative rounded-2xl overflow-hidden bg-white/60 backdrop-blur border border-slate-200 hover:shadow-xl transition p-4">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600" />
              <div className="flex items-start justify-between">
                <b className="text-lg line-clamp-1">{s.title}</b>
                <span className="text-primary font-bold whitespace-nowrap">€{s.priceEUR}</span>
              </div>
              <div className="text-slate-600 mt-1 line-clamp-3">{s.description}</div>
              <div className="text-xs text-slate-500 mt-2">카테고리: {s.category}{s.city ? ` · ${s.city}` : ''}{s.postalCode ? ` ${s.postalCode}` : ''}</div>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}


