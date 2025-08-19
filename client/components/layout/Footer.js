export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #e2e8f0', marginTop: 40 }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
        <div>
          <b>C2C Platform</b>
          <div style={{ color: '#64748b', marginTop: 8 }}>신뢰를 기반으로 전문가와 소비자를 연결합니다.</div>
        </div>
        <div>
          <div><b>플랫폼</b></div>
          <div style={{ color: '#64748b' }}>회사소개 · 공지사항 · 고객센터</div>
        </div>
        <div>
          <div><b>문의</b></div>
          <div style={{ color: '#64748b' }}>contact@c2cplatform.com · +49 1588-0000</div>
        </div>
      </div>
      <div className="container" style={{ color: '#94a3b8', fontSize: 12, paddingBottom: 24, paddingTop: 8 }}>
        © 2025 C2C Platform Inc. All Rights Reserved.
      </div>
    </footer>
  );
}


