import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Route path='/' element={<Dashboard />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
        </div>
      </Router>
    </>
  );
}

export default App;
