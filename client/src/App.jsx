import NavigationBar from './components/nav-bar';
import './App.css';
import './styles/nav-bar.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Page1 from './pages/Page1';
import FormToFindTeamComponent from './components/ui/formToFindTeam';

function App() {

  return (
    <div className="app-container">
      <div className="navigation-bar">
        <NavigationBar />
      </div>
      <div className="page-content">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/page1" element={<Page1 />} />
            <Route path="/findTeam" element={<FormToFindTeamComponent />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
