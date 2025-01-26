import './App.css'
import { Main } from './components/Main'
import "./index.css"
import "./App.css"
import { DevMock } from './components/DevMock'

function App() {
  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <Main />
      <DevMock />
    </div>
  )
}

export default App
