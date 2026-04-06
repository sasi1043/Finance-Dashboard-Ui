import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/user/Home';
import AdHome from './components/admin/AdHome';
import AdTransactions from './components/admin/AdTransactions';
import AdAnalytics from './components/admin/AdAnalytics';
import AdUserManagement from './components/admin/AdUserManagement';
import Transactions from './components/user/Transactions';
import Analytics from './components/user/Analytics';
import ThemeContext from './components/context/ThemeContext';

function App() {
    localStorage.setItem("role","user");
  return (
    <div>
      <ThemeContext>
        <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/admin/home' element={<AdHome/>}></Route>
        <Route path='/admin/transacion' element={<AdTransactions/>}></Route>
        <Route path='/admin/analytics' element={<AdAnalytics/>}></Route>
        <Route path='/admin/usermanagement' element={<AdUserManagement/>}></Route>
        <Route path='/user/transacion' element={<Transactions/>}></Route>
        <Route path='/user/analytics' element={<Analytics/>}></Route>
        
      </Routes>
      </ThemeContext>
      
   </div>
  );
}

export default App;
