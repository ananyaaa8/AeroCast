import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import WeatherApp from './WeatherApp'
import App2 from './App2'
import NotFound from './NotFound'

export default function App() {
  useEffect(() => {
    document.title = "Weather Forecast App"
    const metaThemeColor = document.querySelector("meta[name=theme-color]")
    metaThemeColor.setAttribute("content", "#f5f7fa")
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WeatherApp />} />
        <Route path="/mui-examples" element={<App2 />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}
