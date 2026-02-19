import {BrowserRouter,Route,Routes} from 'react-router-dom';
// import './App.css'
import Login from './pages/login';
import Layout from './layout/layout';
import MannageBanner from './pages/manage_banner';
import Dashboard from './pages/dashboard';
import MannageSupport from './pages/manage_support';
import Customer from './pages/manage_customer';
import NationalDistributer from './pages/manage_NationalDist';
import SuperDistributer from './pages/manage_superDist';
import Distributer from './pages/manage_Distributer';
import Retailer from './pages/manage_Retailer';
import Transfer from './pages/Transfer';
import AllTransaction from './pages/AllTransaction';
import MyTransaction from './pages/MyTransaction';
import ChangePassword from './components/profile/change_password';

function App() {
  

  return (
   <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/admin' element={<Layout><Dashboard/></Layout>}/>
        <Route path='/banner' element={<Layout><MannageBanner/></Layout>}/>
        <Route path='/users/support' element={<Layout><MannageSupport/></Layout>}/>
        <Route path='/users/national' element={<Layout><NationalDistributer/></Layout>}/>
        <Route path='/users/superdis' element={<Layout><SuperDistributer/></Layout>}/>
        <Route path='/users/distributor' element={<Layout><Distributer/></Layout>}/>
        <Route path='/users/retailer' element={<Layout><Retailer/></Layout>}/>
        <Route path='/users/customer' element={<Layout><Customer/></Layout>}/>
        <Route path='/transaction/all' element={<Layout><AllTransaction/></Layout>}/>
        <Route path='/transaction/my' element={<Layout><MyTransaction/></Layout>}/>
        <Route path='/transfer' element={<Layout><Transfer/></Layout>}/>
        <Route path='/changepassword' element={<Layout><ChangePassword/></Layout>}/>


      </Routes>
   </BrowserRouter>
  )
}

export default App
