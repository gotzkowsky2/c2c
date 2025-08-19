import Link from 'next/link';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const bg = 'https://images.unsplash.com/photo-1526481280698-8fcc13fdbe87?q=80&w=1920&auto=format&fit=crop'; // Berlin skyline
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 60]);
  return (
    <section className="relative h-[420px] md:h-[520px] overflow-hidden">
      <motion.img style={{ y }} src={bg} alt="독일 도시 전경" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-sky-900/70 via-sky-700/50 to-transparent" />
      <div className="container relative z-10 h-full flex items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow">
            독일 정착, 복잡한 절차는 전문가와 함께.
          </h1>
          <p className="mt-3 text-slate-100/90">
            안멜둥, 비자, 통번역, 집 구하기. 검증된 현지 전문가와 안전하게 의뢰하세요.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/search" className="btn bg-white text-ink hover:brightness-95">전문가 찾기</Link>
            <Link href="/provider/services" className="btn">전문가 등록</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


