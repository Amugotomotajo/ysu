import { Button, Card } from "antd"
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { BsHandbagFill } from "react-icons/bs"
import { MdOutlineRestaurant } from "react-icons/md"
import { Link } from 'react-router-dom';
import { faArrowLeft, faPlus, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from '../css/AdminMain.module.css'
import ysuLogo from '../L_img/ysu_logo.jpg';
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { FaUser } from "react-icons/fa"
import { PiNoteLight } from "react-icons/pi";


export const AdminMainPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const userPage = () => {
    navigate("/user");
  };

  const menuPage = () => {
    navigate("/adminmenu");
  }

  const reviewPage = () => {
    navigate("/review");
  }

  const MainListPage = () => {
    navigate("/adminmain");
  }

  const userId = localStorage.getItem("user_id");
  const userName = localStorage.getItem("user_name");
  const userDept = localStorage.getItem("user_dept");

  const handleLogout = () => {
    // 세션 초기화
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_dept");
    localStorage.removeItem("isLoggedIn");

    setIsLoggedIn(false);

    // 로그인 페이지로 이동
    navigate('/login');
    window.alert("로그아웃 되었습니다.");
  };
  return (
<body className={style.bodymain}>
<div id="head" className={style.head}>
        <Link className={style.link} to="/">
          <FontAwesomeIcon id="faArrowLeft" icon={faArrowLeft} className={style.faArrowLeft} />
        </Link>
        <Link className={style.link} to="">
          <FontAwesomeIcon id="faArrowRightFromBracket" className={style.faArrowRightFromBracket} icon={faArrowRightFromBracket} style={{ color: 'transparent' }} />
        </Link>
        <img id="logo" className={style.logo} src={ysuLogo} alt={"logo"} onClick={MainListPage} />
        <Link to="/" className={style.linkicon} onClick={handleLogout}>
          <FontAwesomeIcon id="faArrowRightFromBracket" icon={faArrowRightFromBracket} className={style.faArrowRightFromBracket} />
        </Link>
        <Link to="/login" className={style.link} onClick={handleLogout}>
          <FontAwesomeIcon id="faArrowRightFromBracket" icon={faArrowRightFromBracket} className={style.faArrowRightFromBracket} />
        </Link>
      </div>
    <div className={style.container}>
        <div className={style.card}>
            <div className={style.circle}>
                <h2><FaUser /></h2>
            </div>
            <div className={style.content}>
                <a onClick={userPage}>사용자 관리</a>
             </div>
        </div>
        <div className={style.card}>
            <div className={style.circle}>
                <h2><MdOutlineRestaurantMenu /></h2>
            </div>
            <div className={style.content}>
                <a onClick={menuPage}>메뉴 관리</a>
             </div>
 
        </div>
        <div className={style.card}>
            <div className={style.circle}>
                <h2><PiNoteLight /></h2>
            </div>
            <div className={style.content}>
                <a onClick={reviewPage}>리뷰 관리</a>
            </div>
        </div>
    </div> 
    
</body>
  )
}

export default AdminMainPage;