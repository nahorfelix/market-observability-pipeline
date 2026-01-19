import React, { useState, useEffect } from 'react';
import { RefreshCw, TrendingUp, Activity, ShieldCheck } from 'lucide-react';

function App() {
  const [prices, setPrices] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());

  // Professional Fetch with Error Handling
  const fetchPrices = async () => {
    setLoading(true);
    try {
      // Points to your Node.js backend
      const response = await fetch('http://localhost:5000/api/prices');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setPrices(data);
      setLastUpdated(new Date().toLocaleTimeString());
      setError(null);
    } catch (err) {
      setError("Failed to connect to backend service.");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      {/* Header Section - Sells your "System Mindset" */}
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>SentinelScale <span style={styles.badge}>Live</span></h1>
          <p style={styles.subtitle}>Real-time Market Observability Pipeline</p>
        </div>
        <div style={styles.statusGroup}>
          <div style={styles.statusItem}>
            <ShieldCheck size={16} color="#4ade80" />
            <span>Backend: Online</span>
          </div>
          <button onClick={fetchPrices} style={styles.refreshBtn}>
            <RefreshCw size={16} className={loading ? 'spin' : ''} />
          </button>
        </div>
      </header>

      {/* Main Dashboard */}
      <main style={styles.grid}>
        {error ? (
          <div style={styles.errorCard}>{error}</div>
        ) : prices ? (
          Object.keys(prices).map((coin) => (
            <div key={coin} style={styles.card}>
              <div style={styles.cardHeader}>
                <TrendingUp size={20} color="#6366f1" />
                <span style={styles.coinName}>{coin.toUpperCase()}</span>
              </div>
              <div style={styles.price}>${prices[coin].usd.toLocaleString()}</div>
              <div style={styles.cardFooter}>
                <Activity size={14} />
                <span>Volatile</span>
              </div>
            </div>
          ))
        ) : (
          <p>Loading market data...</p>
        )}
      </main>

      <footer style={styles.footer}>
        Last System Sync: {lastUpdated} | Refreshes every 30s
      </footer>

      {/* Internal CSS to ensure it works without external files */}
      <style>{`
        .spin { animation: rotate 1s linear infinite; }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#0f172a',
    color: '#f8fafc',
    minHeight: '100vh',
    padding: '2rem',
    fontFamily: 'Inter, sans-serif'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '3rem',
    borderBottom: '1px solid #1e293b',
    paddingBottom: '1rem'
  },
  title: { fontSize: '1.5rem', fontWeight: 'bold', margin: 0 },
  badge: { 
    fontSize: '0.75rem', 
    backgroundColor: '#dc2626', 
    padding: '2px 8px', 
    borderRadius: '12px', 
    verticalAlign: 'middle' 
  },
  subtitle: { color: '#94a3b8', fontSize: '0.875rem' },
  statusGroup: { display: 'flex', gap: '1rem', alignItems: 'center' },
  statusItem: { display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' },
  refreshBtn: { 
    background: 'none', border: '1px solid #334155', color: 'white', 
    padding: '8px', borderRadius: '6px', cursor: 'pointer' 
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem'
  },
  card: {
    backgroundColor: '#1e293b',
    padding: '1.5rem',
    borderRadius: '12px',
    border: '1px solid #334155',
    transition: 'transform 0.2s',
  },
  cardHeader: { display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' },
  coinName: { fontWeight: '600', color: '#94a3b8' },
  price: { fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' },
  cardFooter: { display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#64748b' },
  errorCard: { color: '#f87171', gridColumn: '1/-1', textAlign: 'center' },
  footer: { marginTop: '3rem', textAlign: 'center', color: '#475569', fontSize: '0.875rem' }
};

export default App;