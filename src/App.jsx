import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Bikes from './pages/Bikes';
import BikeDetails from './pages/BikeDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bikes" element={<Bikes />} />
        <Route path="/bikes/:id" element={<BikeDetails />} />
      </Routes>
    </Router>
  );
}

export default App;

