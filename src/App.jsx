import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { StatsPage } from './routes/Stats/StatsPage'
import { useStats } from './Hooks/UseData';

function App() {
  
  const { statsData} = useStats();
  //console.log(statsData.calendarData)
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<StatsPage calendar={statsData.calendarData} results={statsData.matchesData} positionsData={statsData.positionsData}/>}/>
      </Routes>
    </HashRouter>
  )
}

export default App
