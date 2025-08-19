import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '../../lib/api';
import Badge from '../common/Badge';
import { motion } from 'framer-motion';

function getThumb(category) {
  const map = {
    anmeldung: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1600&auto=format&fit=crop',
    visa_extension: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1600&auto=format&fit=crop',
    translation: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1600&auto=format&fit=crop',
    legal: 'https://images.unsplash.com/photo-1528747045269-390fe33c19d3?q=80&w=1600&auto=format&fit=crop',
    life_coaching: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1600&auto=format&fit=crop',
    other: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop'
  };
  return map[category] || map.other;
}

function badgeClass(category) {
  switch (category) {
    case 'anmeldung': return 'bg-sky-100 text-sky-700';
    case 'visa_extension': return 'bg-indigo-100 text-indigo-700';
    case 'translation': return 'bg-emerald-100 text-emerald-700';
    case 'legal': return 'bg-rose-100 text-rose-700';
    case 'life_coaching': return 'bg-amber-100 text-amber-700';
    default: return 'bg-slate-100 text-slate-700';
  }
}

export default function RecommendedExperts() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/services');
        setServices((res.data || []).slice(0, 6));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section className="section">
      <div className="container">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">추천 전문가</h2>
          <Link href="/search" className="text-primary hover:underline">모두 보기</Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="card animate-pulse h-32 bg-slate-50" />
            ))}
          </div>
        ) : services.length === 0 ? (
          <div className="text-slate-500">아직 등록된 추천 전문가가 없습니다. 곧 업데이트됩니다.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {services.map((s) => (
              <motion.div key={s._id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} whileHover={{ y: -4 }} className="relative rounded-2xl overflow-hidden bg-white/70 backdrop-blur border border-slate-200 hover:shadow-2xl transition">
                <div className="aspect-[16/9] overflow-hidden">
                  <img src={getThumb(s.category)} alt="서비스 썸네일" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600" />
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 text-white flex items-center justify-center font-bold">
                      {(s.provider?.firstName || 'E')[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <b className="text-lg line-clamp-1">{s.title}</b>
                        <span className="text-primary font-bold whitespace-nowrap">€{s.priceEUR}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${badgeClass(s.category)}`}>{s.category}</span>
                        {s.city && <Badge variant="outline">{s.city}</Badge>}
                      </div>
                    </div>
                  </div>
                  <div className="text-slate-600 mt-2 line-clamp-2">{s.description}</div>
                  <div className="mt-3 flex gap-2">
                    <Link href={`/quote/${s._id}`} className="btn">의뢰하기</Link>
                    <Link href={`/search?provider=${s.provider?._id || ''}`} className="btn-dark">프로필</Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}


