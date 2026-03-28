import { useEffect, useState } from 'react'
import axios from 'axios'
import Header from './components/Header'
import KPITiles from './components/KPITiles'
import RevenueChart from './components/RevenueChart'
import ForecastGauge from './components/ForecastGauge'
import PipelineFunnel from './components/PipelineFunnel'
import RepLeaderboard from './components/RepLeaderboard'
import DealAging from './components/DealAging'
import './App.css'

const API = 'http://localhost:8000/api'

export default function App() {
  const [summary, setSummary] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [revenueOverTime, setRevenueOverTime] = useState([])
  const [funnel, setFunnel] = useState([])
  const [reps, setReps] = useState([])
  const [aging, setAging] = useState([])

  useEffect(() => {
    axios.get(`${API}/revenue/summary`).then(r => setSummary(r.data))
    axios.get(`${API}/forecast/summary`).then(r => setForecast(r.data))
    axios.get(`${API}/revenue/over-time`).then(r => setRevenueOverTime(r.data))
    axios.get(`${API}/pipeline/funnel`).then(r => setFunnel(r.data))
    axios.get(`${API}/reps/leaderboard`).then(r => setReps(r.data))
    axios.get(`${API}/deals/aging`).then(r => setAging(r.data))
  }, [])

  return (
    <div className="app">
      <Header />
      <main className="content">
        <KPITiles summary={summary} forecast={forecast} />
        <div className="charts-row">
          <RevenueChart data={revenueOverTime} />
          <ForecastGauge forecast={forecast} />
        </div>
        <PipelineFunnel data={funnel} />
        <RepLeaderboard reps={reps} />
        <DealAging deals={aging} />
      </main>
    </div>
  )
}