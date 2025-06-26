import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WeatherApp from './pages/WeatherApp';
import App2 from './App2';
import NotFound from './pages/NotFound';
import './App.css'; 


export default function App() {
  useEffect(() => {
    // Set page title
    document.title = "Weather Forecast App";

    // Set theme color
    const metaThemeColor = document.querySelector("meta[name=theme-color]");
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", "#f5f7fa");
    }

    // Handle offline
    const checkOnline = () => {
      if (!navigator.onLine) {
        alert("You are offline. Weather data may not load.");
      }
    };
    window.addEventListener('offline', checkOnline);

    return () => {
      window.removeEventListener('offline', checkOnline);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WeatherApp />} />
        <Route path="/mui-examples" element={<App2 />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
