import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AdminMainPage } from "./pages/AdminMainPage";
import { UsertListPage } from "./pages/UserListPage";
import { MenuListPage } from "./pages/MenuListPage";
import { MenuInsert } from "./pages/MenuInsert";
import { MenuDetail } from "./pages/MenuDetail";
import { Main } from "./pages/Main";
import { Login } from "./pages/Login";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} /> {/* 메인페이지 */}
        <Route path="/adminmain" element={<AdminMainPage />} /> {/* 관리자메인 */}
        <Route path="/user" element={<UsertListPage />} /> {/* 사용자관리 */}
        <Route path="/adminmenu" element={<MenuListPage />} /> {/* 메뉴관리 */}
        <Route path="/adminmenu/menuinsert" element={<MenuInsert />} /> {/* 메뉴등록 */}
        <Route path="/adminmenu/menudetail" element={<MenuDetail />} /> {/* 메뉴정보(수정, 삭제) */}
        <Route path="/login" element={<Login />} /> {/* 로그인 */}
      </Routes> 
    </BrowserRouter>
  )
}

export default App;