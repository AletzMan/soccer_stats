import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { StatsPage } from './routes/Stats/StatsPage'
import { useStats } from './Hooks/UseData';
import { HomePage } from './routes/Home/HomaPage';
import { BettingPage } from './routes/Betting/BettingPage';
import { Header } from './components/Header/Header';

function App() {
  
  const { statsData} = useStats();
  console.log(statsData.resultData)
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/stats' element={<StatsPage calendar={statsData?.calendarData} results={statsData?.resultData} positionsData={statsData?.positionsData}/>}/>
        <Route path='/betting' element={<BettingPage calendar={statsData?.calendarData} />}/>
      </Routes>
    </HashRouter>
  )
}

export default App
