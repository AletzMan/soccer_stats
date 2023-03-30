import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { StatsPage } from './routes/Stats/StatsPage'
import { HomePage } from './routes/Home/HomaPage';
import { BettingPage } from './routes/Betting/BettingPage';


function App() {


  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/stats' element={<StatsPage />} />
        <Route path='/betting' element={<BettingPage />} />
      </Routes>
    </HashRouter>
  )
}

export default App
