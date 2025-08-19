import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import dynamic from 'next/dynamic';
const Hero = dynamic(() => import('../components/home/Hero'), { ssr: false });
const RegionMap = dynamic(() => import('../components/home/RegionMap'), { ssr: false });
const RecommendedExperts = dynamic(() => import('../components/home/RecommendedExperts'), { ssr: false });
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />

        <RecommendedExperts />

        <section className="section">
          <div className="container">
            <h2 className="text-2xl font-semibold mb-4">전문가를 분야별로 찾아보세요</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { key: 'anmeldung', label: '안멜둥(거주지 등록)' },
                { key: 'visa_extension', label: '비자 연장' },
                { key: 'translation', label: '통번역' },
                { key: 'legal', label: '법률/행정 상담' },
                { key: 'life_coaching', label: '생활/정착 코칭' },
                { key: 'other', label: '기타' },
              ].map((c) => (
                <Link key={c.key} href={`/search?category=${c.key}`} className="card hover:shadow-lg transition border-transparent ring-1 ring-slate-100 hover:ring-primary/30">
                  <b className="text-ink">{c.label}</b>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <RegionMap />
          </div>
        </section>

        <section className="section-muted">
          <div className="container">
            <h2 className="text-2xl font-semibold mb-6">플랫폼 이용 방법</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="card"><b>1. 전문가 탐색</b><div className="text-slate-600">검색/카테고리로 필요한 전문가를 찾아보세요.</div></div>
              <div className="card"><b>2. 프로필 비교</b><div className="text-slate-600">경력, 제공 서비스, 후기를 꼼꼼히 비교하세요.</div></div>
              <div className="card"><b>3. 안전하게 의뢰</b><div className="text-slate-600">안전 결제로 완료까지 대금을 보호해드립니다.</div></div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}


