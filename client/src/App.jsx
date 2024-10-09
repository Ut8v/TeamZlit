import NavigationBar from './components/nav-bar';
import './App.css';
import './styles/nav-bar.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Page1 from './pages/Page1';

function App() {

  return (
    <>
    <NavigationBar />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
        </Route>
        <Route path="/page1" element={ <Page1/> } />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
