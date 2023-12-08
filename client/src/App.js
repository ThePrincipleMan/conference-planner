import './App.css';
import Home from './pages/Home';
import Planner from './pages/Planner';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/planner' element={<Planner/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
