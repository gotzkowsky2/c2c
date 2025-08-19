import Link from 'next/link';
import { getUser, logout } from '../../lib/auth';

export default function Header() {
  const user = typeof window !== 'undefined' ? getUser() : null;
  return (
    <header className="border-b border-slate-200 sticky top-0 bg-white/90 backdrop-blur z-10">
      <div className="container flex items-center justify-between h-14">
        <Link href="/" className="text-primary font-bold">Expat Connect</Link>
        <nav className="flex items-center gap-4 text-slate-700">
          <Link href="/search" className="hover:text-ink">검색</Link>
          {user ? (
            <>
              {user.role === 'provider' && <Link href="/provider/dashboard" className="hover:text-ink">제공자 대시보드</Link>}
              {user.role === 'admin' && <Link href="/admin/dashboard" className="hover:text-ink">관리자</Link>}
              <Link href={`/profile/${user.id}`} className="hover:text-ink">프로필</Link>
              <a href="#" onClick={() => { logout(); window.location.href = '/'; }} className="hover:text-ink">로그아웃</a>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="hover:text-ink">로그인</Link>
              <Link href="/auth/register" className="btn">회원가입</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}


