import React, { useState, useEffect } from 'react';
import MenuStyle from '../css/Menu.module.css';
import MdStyle from '../css/MenuDetail.module.css';
import ysuLogo from '../img/ysu_logo.jpg';
import profile from '../img/profile.png';
import reviewManage from '../img/reviewManage.png';
import axios from 'axios';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import { MdLogout, MdOutlineRateReview } from "react-icons/md";
import { IoCartSharp } from "react-icons/io5";
import style from '../css/MyPage.module.css';
import { RiFileList3Line } from "react-icons/ri";


export const MyPage = (): JSX.Element => {
    const [menu_id, setMenuId] = useState < number > (0); // 메뉴 ID 상태 (숫자)
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [cookies, setCookie, removeCookie] = useCookies(['rememberUserId']);
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

    const [showMyOrderList, setShowMyOrderList] = useState(false);

    const handleMyOrderListClick = () => {
        setShowMyOrderList(true);
    };

    const handleLogout = () => {
        // removeCookie(userInfo.u_id as keyof typeof cookies);
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

            <div className={style.pageHead}>
                마이페이지
            </div>

            <div className={style.myPage}>

                <div className={style.profileDiv}>
                    <div>
                        <img className={style.profile} src={profile} />
                    </div>
                    <div className={style.userInfo}>
                        <span className={style.nameSpan}>{userInfo.u_name} 님</span>
                        <span className={style.deptSpan}>{userInfo.u_dept}</span>
                        <span className={style.idSpan}>{userInfo.u_id}</span>
                    </div>
                    <div className={style.myPageButtons}>
                        <Link to='/MyOrderList'>
                            <RiFileList3Line className={style.RiFileList3Line} />
                            <button onClick={handleMyOrderListClick}>주문 내역</button>
                        </Link>
                        <Link to='/MyOrderList'>
                            <MdOutlineRateReview className={style.RiFileList3Line} />
                            <button>리뷰 관리</button>
                        </Link>
                    </div>
                </div>
                {/* {showMyOrderList && <MyOrderList />} */}
            </div>
        </>
    );
}

export default MyPage;