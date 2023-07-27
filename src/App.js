import './App.css';
import {BrowserRouter,Routes, Route} from "react-router-dom";
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import User from './components/User/User';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/:userId" element={<User />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
