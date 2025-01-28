import './App.css'
import { Background } from './components/Background'
import "./index.css"
import "./App.css"
import { DevMock } from './components/DevMock'
import { SessionDataProvider } from './components/SessionDataProvider'
import { ProgressBar } from './components/ProgressBar'
import { ElementParams } from './config/ElementParams'
import { ProgressCount } from './components/ProgressCount'

function App() {
  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <SessionDataProvider>
        <DevMock />
        <Background />
        <ProgressBar config={ElementParams.ProgressBars.subs}/>
        <ProgressBar config={ElementParams.ProgressBars.donos}/>
        <ProgressCount config={ElementParams.ProgressCounts.subs}/>
        <ProgressCount config={ElementParams.ProgressCounts.donos}/>
      </SessionDataProvider>
    </div>
  )
}

export default App
