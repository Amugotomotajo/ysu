import { BrowserRouter, Route, Routes } from "react-router-dom"
import { YsuMenuPage } from "./YsuMenuPage";
import { StudentListPage } from "./pages/StudentListPage";
import { AdminPage } from "./pages/AdminPage";
import { MainPage } from "./pages/MainPage";
import { MenuListPage } from "./pages/MenuListPage";
import { MenuInsert } from "./pages/MenuInsert";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<YsuMenuPage />} />
        <Route path="/student" element={<StudentListPage />} />
        <Route path="/menu" element={<MenuListPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/menu/menuinsert" element={<MenuInsert />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;