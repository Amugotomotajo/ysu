import React, { useState, useEffect } from 'react';
import MenuStyle from './Menu.module.css';
import ysuLogo from './img/ysu_logo.jpg';
import profile from './img/profile.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import { IoCartSharp } from "react-icons/io5";
import style from './MyReview.module.css';

export const MenuDetail = (): JSX.Element => {
    const [menu_id, setMenuId] = useState < number > (0); // 메뉴 ID 상태 (숫자)
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [userInfo, setUserInfo] = useState < {
        u_id: string,
        u_name: string,
        u_dept: string
    } > ({
        u_id: "",
        u_name: "",
        u_dept: ""
    });

    useEffect(() => {

        // localStorage에서 유저 정보 가져오기
        const userId = localStorage.getItem("user_id") || '';
        const userName = localStorage.getItem("user_name") || '';
        const userDept = localStorage.getItem("user_dept") || '';

        console.log(userId);
        setUserInfo({
            u_id: userId,
            u_name: userName,
            u_dept: userDept
        });

    }, [localStorage]);


    const handleLogout = () => {
        // 세션 초기화
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_name");
        localStorage.removeItem("user_dept");
        localStorage.removeItem("isLoggedIn");

        setIsLoggedIn(false);
        // 로그인 페이지로 이동
        navigate('/');
    };

    return (
        <>
            <div id="head" className={MenuStyle.head}>
                <Link className={MenuStyle.link} to="/Menu">
                    <BiArrowBack className={MenuStyle.faArrowLeft} />
                </Link>
                <Link className={MenuStyle.link} to="">
                    <BiArrowBack className={MenuStyle.faArrowLeft} style={{ color: 'transparent' }} />
                </Link>

                <img id="logo" className={MenuStyle.logo} src={ysuLogo} alt={"logo"} />
                <Link to="/" className={MenuStyle.link} onClick={handleLogout}>
                    <MdLogout className={MenuStyle.faArrowRightFromBracket} />
                </Link>
                <Link className={MenuStyle.link} to="/">
                    <IoCartSharp className={MenuStyle.faCartShopping} />
                </Link>
            </div>
            <div className={style.myPage}>

                <div className={style.myPageButtons}>
                    <Link to="/MyOrderList"><button>주문 내역</button></Link>
                    <Link to="/MyReview"><button>리뷰 관리</button></Link>
                </div>
            </div>
        </>
    );
}

export default MenuDetail;