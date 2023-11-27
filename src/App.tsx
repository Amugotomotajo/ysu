
import './App.css';
import Menu from './pages/Menu';
import Main from './pages/Main';
import MenuDetail from './pages/MenuDetail';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import MyOrderList from './pages/MyOrderList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export const App =  ():JSX.Element => {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <>
    
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Menu" element={<Menu />} />
        <Route path="/MenuDetail" element={<MenuDetail />} />
        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/MyOrderList" element={<MyOrderList />} />
      </Routes>
    </Router>
    </>
);
  
}

export default App;
