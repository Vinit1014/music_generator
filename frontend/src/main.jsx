import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { useTrackStore } from './store/useTrackStore.js'

function Root() {
  useEffect(()=>{
    useTrackStore.getState().initializeLikes();
    useTrackStore.getState().initializeRecents();
  }, []);

  return <App />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
