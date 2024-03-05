import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './Signup';
import Signin from './Signin';
import Home from '../core/Home';
import Menu from '../core/Menu';

const AppRoutes = () => {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
