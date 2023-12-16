import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AdminMainPage } from "./pages/AdminMainPage";
import { UsertListPage } from "./pages/UserListPage";
import { AdminMenuListPage } from "./pages/AdminMenuListPage";
import { AdminMenuInsert } from "./pages/AdminMenuInsert";
import { AdminMenuDetail } from "./pages/AdminMenuDetail";
import { Main } from "./pages/Main";
import { Login } from "./pages/Login";
import WrongApproach from './pages/WrongApproach';
import { MyPage } from './pages/MyPage';
import { MyOrderList } from './pages/MyOrderList';
import { MenuDetail } from './pages/MenuDetail';
import { Menu } from './pages/Menu';


const App = ():JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} /> {/* 메인페이지 */}
        <Route path="/adminmain" element={<AdminMainPage />} /> {/* 관리자메인 */}
        <Route path="/user" element={<UsertListPage />} /> {/* 사용자관리 */}
        <Route path="/adminmenu" element={<AdminMenuListPage />} /> {/* 메뉴관리 */}
        <Route path="/adminmenu/menuinsert" element={<AdminMenuInsert />} /> {/* 메뉴등록 */}
        <Route path="/adminmenu/menudetail" element={<AdminMenuDetail />} /> {/* 메뉴정보(수정, 삭제) */}
        <Route path="/login" element={<Login />} /> {/* 로그인 */}
        <Route path='/wrongApproach' element={<WrongApproach/>} />
        <Route path="/Menu" element={<Menu />} /> {/* 사용자메뉴 */}
        <Route path="/MenuDetail" element={<MenuDetail />} /> {/* 메뉴정보 */}
        <Route path="/MyPage" element={<MyPage />} /> {/* 마이페이지 */}
        <Route path="/MyOrderList" element={<MyOrderList />} /> {/* 주문리스트 */}
      </Routes>  
    </BrowserRouter>
  )
}

export default App;