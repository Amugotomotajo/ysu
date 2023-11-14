import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AdminMainPage } from "./pages/AdminMainPage";
import { StudentListPage } from "./pages/StudentListPage";
import { AdminPage } from "./pages/AdminPage";
import { MainPage } from "./pages/MainPage";
import { MenuListPage } from "./pages/MenuListPage";
import { MenuInsert } from "./pages/MenuInsert";
import { MenuDetail } from "./pages/MenuDetail";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminMainPage />} />
        <Route path="/student" element={<StudentListPage />} />
        <Route path="/adminmenu" element={<MenuListPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/adminmenu/menuinsert" element={<MenuInsert />} />
        <Route path="/adminmenu/menudetail" element={<MenuDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;