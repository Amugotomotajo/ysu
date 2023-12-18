import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignUpPage } from "./pages/Login/SignUpPage";
import { UserListPage } from "./pages/User/UserListPage";
import { ReviewListPage } from "./pages/Review/ReviewListPage";
import { ReviewWritePage } from "./pages/Review/ReviewWritePage";
import { Menu } from "./pages/Menu/Menu";
import { MenuDetail } from "./pages/Menu/MenuDetail";
import { MenuReviewTab } from "./pages/MenuReviewTab";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MenuReviewTab />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/auth/signup" element={<SignUpPage />} />
        <Route path="/users" element={<UserListPage />} />
        <Route path="/MenuDetail" element={<MenuReviewTab />} />
        <Route path="/menu/:menu_id/review" element={<MenuReviewTab />} />
        <Route path="/menu/:menu_id" element={<MenuDetail />} />
        <Route path="/menu/:menu_id/review" element={<ReviewListPage />} />
        <Route path="/menu/:menu_id/review/write" element={<ReviewWritePage />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App;
