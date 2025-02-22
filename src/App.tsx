import './App.css'
import ChartSpireReact from './ChartSpireReact.tsx'

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
    fontSize: '14px'
  },
  chartContainer: {
    flex: 1
  }
}

function App() {

  return (
    <>
      <div style={styles.statusBar}>
        ⚠️ Alpha Version v1.0.0-Alpha2: This is a pre-release version for testing purposes only.
      </div>
      <ChartSpireReact/>
      {/*<div>*/}
      {/*  <a href="https://vite.dev" target="_blank">*/}
      {/*    <img src={viteLogo} className="logo" alt="Vite logo" />*/}
      {/*  </a>*/}
      {/*  <a href="https://react.dev" target="_blank">*/}
      {/*    <img src={reactLogo} className="logo react" alt="React logo" />*/}
      {/*  </a>*/}
      {/*</div>*/}
      {/*<h1>Vite + React</h1>*/}
      {/*<div className="card">*/}
      {/*  <button onClick={() => setCount((count) => count + 1)}>*/}
      {/*    count is {count}*/}
      {/*  </button>*/}
      {/*  <p>*/}
      {/*    Edit <code>src/App.tsx</code> and save to test HMR*/}
      {/*  </p>*/}
      {/*</div>*/}
      {/*<p className="read-the-docs">*/}
      {/*  Click on the Vite and React logos to learn more*/}
      {/*</p>*/}
    </>
  )
}

export default App
