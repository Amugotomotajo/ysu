
import './App.css';
import CartMain from './Views/Cart/CartMain';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OrderComplete from './Views/Order/OrderComplete';

export const App = (): JSX.Element =>  {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/cart" element={<CartMain />} />
        <Route path="/order" element={<OrderComplete />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
