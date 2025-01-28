import './App.css'
import { Background } from './components/Background'
import "./index.css"
import "./App.css"
import { DevMock } from './components/DevMock'
import { SessionDataProvider } from './components/SessionDataProvider'
import { ElementParams } from './config/ElementParams'
import { ProgressBarRenderer } from './renderers/ProgressBarRenderer'
import { CanvasRenderer } from './components/CanvasRenderer'
import { ProgressCountRenderer } from './renderers/ProgressCountRenderer'

function App() {
  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <SessionDataProvider>
        <DevMock />
        <Background />
        <CanvasRenderer renderer={(canvas) => new ProgressBarRenderer(canvas, ElementParams.ProgressBars.subs)} />
        <CanvasRenderer renderer={(canvas) => new ProgressBarRenderer(canvas, ElementParams.ProgressBars.donos)} />
        <CanvasRenderer renderer={(canvas) => new ProgressCountRenderer(canvas, ElementParams.ProgressCounts.subs)} />
        <CanvasRenderer renderer={(canvas) => new ProgressCountRenderer(canvas, ElementParams.ProgressCounts.donos)} />
      </SessionDataProvider>
    </div>
  )
}

export default App
