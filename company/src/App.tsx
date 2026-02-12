import {BrowserRouter,Route,Routes} from 'react-router-dom';
// import './App.css'
import Login from './pages/login';
import Layout from './components/layout';
import MannageBanner from './pages/mannage_banner';
import Dashboard from './pages/dashboard';

function App() {
  

  return (
   <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/admin' element={<Layout><Dashboard/></Layout>}/>
        <Route path='/banner' element={<Layout><MannageBanner/></Layout>}/>
      </Routes>
   </BrowserRouter>
  )
}

export default App
