import './App.css'
import ChartSpireReact from './ChartSpireReact.tsx'
import { useState } from 'react'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100vh'
  },
  statusBar: {
    backgroundColor: '#ff6b6b',
    color: 'white',
    padding: '8px 16px',
    textAlign: 'center' as const,
    fontWeight: 'bold',
    fontSize: '14px',
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000020,
    width: '100%',
    boxSizing: 'border-box' as const
  },
  closeButton: {
    position: 'absolute' as const,
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    fontSize: '18px',
    padding: '2px 6px'
  },
  chartContainer: {
    flex: 1
  }
}

function App() {
  const [showStatusBar, setShowStatusBar] = useState(true);

  return (
    <>
      {showStatusBar && (
        <div style={styles.statusBar}>
          ⚠️ Alpha v1.0.0-alpha14: Data from Binance API. This is a pre-release version for testing purposes only.
          <button 
            style={styles.closeButton} 
            onClick={() => setShowStatusBar(false)}
            title="Hide status bar"
          >
            ✕
          </button>
        </div>
      )}
      <ChartSpireReact/>
    </>
  )
}

export default App
