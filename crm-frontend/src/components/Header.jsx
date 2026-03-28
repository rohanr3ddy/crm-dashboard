export default function Header() {
  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(15,17,23,0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid #2d3154',
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px', height: '64px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '8px',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '16px'
        }}>📊</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: '15px', color: '#f1f5f9' }}>
            NorthStar CRM
          </div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>
            Executive Revenue Dashboard
          </div>
        </div>
      </div>
      <a
        href="http://localhost:8000/api/download"
        download
        style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '8px 16px', borderRadius: '8px',
          border: '1px solid #6366f1', color: '#6366f1',
          textDecoration: 'none', fontSize: '13px', fontWeight: 500,
          transition: 'all 0.2s'
        }}
        onMouseOver={e => e.currentTarget.style.background = '#6366f115'}
        onMouseOut={e => e.currentTarget.style.background = 'transparent'}
      >
        ⬇ Download Dataset
      </a>
    </header>
  )
}