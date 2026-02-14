import {BrowserRouter,Route,Routes} from 'react-router-dom';
// import './App.css'
import Login from './pages/login';
import Layout from './components/layout';
import MannageBanner from './pages/manage_banner';
import Dashboard from './pages/dashboard';
import MannageSupport from './pages/manage_support';
import Customer from './pages/manage_customer';
import NationalDistributer from './pages/manage_NationalDist';
import SuperDistributer from './pages/manage_superDist';
import Distributer from './pages/manage_Distributer';
import Retailer from './pages/manage_Retailer';

function App() {
  

  return (
   <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/admin' element={<Layout><Dashboard/></Layout>}/>
        <Route path='/banner' element={<Layout><MannageBanner/></Layout>}/>
        <Route path='/ss' element={<Layout><MannageSupport/></Layout>}/>
        <Route path='/nd' element={<Layout><NationalDistributer/></Layout>}/>
        <Route path='/sd' element={<Layout><SuperDistributer/></Layout>}/>
        <Route path='/d' element={<Layout><Distributer/></Layout>}/>
        <Route path='/r' element={<Layout><Retailer/></Layout>}/>
        <Route path='/c' element={<Layout><Customer/></Layout>}/>
      </Routes>
   </BrowserRouter>
  )
}

export default App
