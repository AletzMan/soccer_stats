
import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { StatsPage } from './routes/Stats/StatsPage'

function App() {
  

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<StatsPage/>}/>
      </Routes>
    </HashRouter>
  )
}

export default App
