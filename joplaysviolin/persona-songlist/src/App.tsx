import './App.css'
import "./index.css"
import { DevMock } from './components/DevMock'
import { SessionDataProvider } from './components/SessionDataProvider'
import { CanvasRenderer } from './components/CanvasRenderer'
import { BackgroundImageRenderer } from './renderers/BackgroundImageRenderer'
import { SonglistContainerRenderer } from './renderers/SonglistContainerRenderer'

function App() {
  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <SessionDataProvider>
        <DevMock />
        <CanvasRenderer renderer={(canvas) => new SonglistContainerRenderer(canvas, { borderWidth: 50 })} />
      </SessionDataProvider>
    </div>
  )
}

export default App
