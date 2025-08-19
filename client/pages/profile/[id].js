import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '../../components/layout/Header';
import api from '../../lib/api';

export default function ProfilePage() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!id) return;
    api.get(`/users/${id}`).then((res) => setUser(res.data));
  }, [id]);

  return (
    <>
      <Header />
      <main className="container">
        {!user ? (
          <div>로딩...</div>
        ) : (
          <div>
            <h2>{user.firstName} {user.lastName}</h2>
            <div>역할: {user.role}</div>
            <div>이메일: {user.email}</div>
          </div>
        )}
      </main>
    </>
  );
}


