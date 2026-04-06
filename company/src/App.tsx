import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Layout from './layout/layout';
import MannageBanner from './pages/ManageBanner';
import Dashboard from './pages/dashboard';
import MannageSupport from './pages/ManageSupport';
import Customer from './pages/ManageCustomer';
import NationalDistributer from './pages/ManageNationalDistributer';
import SuperDistributer from './pages/Manage_SuperDistributer';
import Distributer from './pages/ManageDistributer';
import Retailer from './pages/ManageRetailer';
import AllTransaction from './pages/AllTransaction';
import MyTransaction from './pages/MyTransaction';
import ChangePassword from './components/profile/ChangePassword';
import { LoaderProvider } from './components/ui/LoaderContext';
import AdminProfile from './components/profile/AdminProfile';
import Settings from './components/settings/settings';
import CustomerEdit from './components/customerEdit/EditCustomer';
import NotFound from './pages/NotFound'
import Transfer from './pages/Transfer';
import Login from './pages/Login.tsx';

function App() {
  

  return (
    <LoaderProvider>
   <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/dashboard' element={<Layout><Dashboard/></Layout>}/>
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
        <Route path='/profile' element={<Layout><AdminProfile/></Layout>}/>
        <Route path='/settings' element={<Layout><Settings/></Layout>}/>
        <Route path='/customer/edit' element={<Layout><CustomerEdit/></Layout>}/>
        <Route path='/notFound' element={<NotFound/>} />
      </Routes>
   </BrowserRouter>
   </LoaderProvider>
  )
}

export default App
