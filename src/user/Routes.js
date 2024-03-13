import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './Signup';
import Signin from './Signin';
import Home from '../core/Home';
import Dashboard from './UserDashboard';
import LanguageProvider from '../hooks/LanguageContext';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path='/user/dashboard' element={<Dashboard />} />
    </Routes>
  );
};

const App = () => {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </LanguageProvider>
  );
};

export default App;
