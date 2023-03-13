import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { StatsPage } from './routes/Stats/StatsPage'
import { HomePage } from './routes/Home/HomaPage';
import { BettingPage } from './routes/Betting/BettingPage';
import { Header } from './components/Header/Header';
import { useEffect, useState } from 'react';
import { getTablePositions } from './services/getData';

function App() {
  const [positionData, setPositionData] = useState('');
  const [resultData, setResultData] = useState('');
  const [calendarData, setCalendarData] = useState('');


  console.log(positionData)
  console.log(resultData)
  console.log(calendarData)


  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/stats' element={<StatsPage calendar={calendarData} results={resultData} positionsData={positionData} />} />
        <Route path='/betting' element={<BettingPage calendar={calendarData} />} />
      </Routes>
    </HashRouter>
  )
}

export default App
