import { useEffect, useState } from 'react';
import Header from '../../components/layout/Header';
import api from '../../lib/api';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('/users').then((res) => setUsers(res.data));
  }, []);

  return (
    <>
      <Header />
      <main className="container">
        <h2>관리자 대시보드</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th align="left">이름</th>
              <th align="left">이메일</th>
              <th align="left">역할</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.firstName} {u.lastName}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}


