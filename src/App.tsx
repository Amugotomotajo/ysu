import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AdminMainPage } from "./pages/AdminMainPage";
import { UsertListPage } from "./pages/UserListPage";
import { AdminPage } from "./pages/AdminPage";
import { MainPage } from "./pages/MainPage";
import { MenuListPage } from "./pages/MenuListPage";
import { MenuInsert } from "./pages/MenuInsert";
import { MenuDetail } from "./pages/MenuDetail";
import { Main } from "./pages/Main";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminMainPage />} />
        <Route path="/user" element={<UsertListPage />} />
        <Route path="/adminmenu" element={<MenuListPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/adminmenu/menuinsert" element={<MenuInsert />} />
        <Route path="/adminmenu/menudetail" element={<MenuDetail />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;