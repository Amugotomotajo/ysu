import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import style from '../css/Menu.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ysuLogo from '../img/ysu_logo.jpg';
import { BiArrowBack } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import { IoCartSharp } from "react-icons/io5";
import { BsFillPersonFill } from "react-icons/bs";

export const Menu = (): JSX.Element => {
    const corner = ['S', 'B', 'F', 'P']
    const navigate = useNavigate();
    const location = useLocation();
    const [menu_id, setMenuId] = useState<number>(0); // 메뉴 ID 상태 (숫자)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [sections, setSections] = useState<{
        menu_id: number,
        menu_name: string,
        menu_corner: string,
        menu_price: number,
        menu_pack: number,
        menu_image: string,
        menu_sales: number,
        menu_regist: number
    }[]>([]);

    const userId = localStorage.getItem("user_id");
    const userName = localStorage.getItem("user_name");
    const userDept = localStorage.getItem("user_dept")

    const [activeSection, setActiveSection] = useState(() => {
        // localStorage에서 값을 가져오거나 기본값 'S'를 사용합니다.
        const savedSection = localStorage.getItem('activeSection');
        return savedSection || 'S';
    });
    
    useEffect(() => {
        window.scrollTo(0, 0);
        if (location.state && location.state.activeSection) {
            // 로그아웃 상태에서 새로운 사용자가 접속할 때, localStorage에 값이 없으면 'S'로 초기화합니다.
            setActiveSection(location.state.activeSection);
            localStorage.setItem('activeSection', 'S'); // 값이 있어도 무조건 'S'로 초기화
        } else if (!localStorage.getItem('activeSection')) {
            // 값이 없으면 무조건 'S'로 초기화
            setActiveSection('S');
            localStorage.setItem('activeSection', 'S');
        } else {
            // 페이지가 로드될 때마다 localStorage에 activeSection을 저장합니다.
            localStorage.setItem('activeSection', activeSection);
        }
        axios.get("/menu").then((res) => {
            setSections(res.data);
            console.log(res);
        });
    }, [location.state, activeSection]);

    const handleSectionClick = (section: string) => {
        setActiveSection(section);
        window.scrollTo(0, 0);
    };

    const handleLogout = () => {
        // 세션 초기화
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_name");
        localStorage.removeItem("user_dept");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem('activeSection');

        setIsLoggedIn(false);
        // 로그인 페이지로 이동
        navigate('/');
    };

    return (
        <>

            <head>
                <script src="https://use.fontawesome.com/releases/v5.2.0/js/all.js"></script>
            </head>
            <body className={style.mnbody}>
                <div>
                    <div id="head" className={style.head}>
                        <Link className={style.link} to="/MyPage">
                            <BsFillPersonFill className={style.faArrowLeft}/>
                        </Link>
                        <Link className={style.link} to="" style={{cursor:'default'}}>
                            <BiArrowBack className={style.faArrowLeft} style={{color: 'transparent'}} />
                        </Link>

                        <img id="logo" className={style.logo} src={ysuLogo} alt={"logo"} />
                        <Link to="/" className={style.link} onClick={handleLogout}>
                            <MdLogout className={style.faArrowRightFromBracket} />
                        </Link>
                        <Link className={style.link} to="/">
                            <IoCartSharp className={style.faCartShopping} />
                        </Link>
                    </div>
                    <nav className={style.menuNav}>
                        <ul className={style.menuUl}>
                            {corner.map((section) => (
                                <li key={section} className={style.li}>
                                    <a
                                        href={`#${section}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleSectionClick(section);
                                        }}
                                        className={activeSection === section ? style.active : ''}
                                    >
                                        {section === 'S' && '면분식류'}
                                        {section === 'B' && '비빔밥덮밥류'}
                                        {section === 'F' && '돈까스라이스류'}
                                        {section === 'P' && '포장'}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <div className={style.menuList} >
                    {sections.map((section, idx) => (
                        <div key={`${idx}-${section['menu_corner']}`} id={section['menu_corner']} className={activeSection === section['menu_corner'] || (activeSection === 'P' && section['menu_pack'] === 1) ? style.active : style.hidden}>
                            <button
                                key={section['menu_id']}
                                onClick={() => {
                                    if (section['menu_sales'] === 0) {
                                        return;
                                    }

                                    navigate('/MenuDetail', {
                                        state: {
                                            u_id: userId,
                                            menu_id: section['menu_id'],
                                            menu_pack: (activeSection === 'P' && section['menu_pack'] === 1) ? 1 : 0
                                        },
                                    });
                                }}
                            >
                                {/* Sold Out 오버레이 */}
                                {section['menu_sales'] === 0 && (
                                    <div className={style.soldOutOverlay}>
                                        <img src={require(`../img/${decodeURIComponent(section['menu_image'])}`)} alt={section['menu_name']} loading="lazy"/>
                                    </div>
                                )}

                                {section['menu_sales'] === 1 && (
                                    <img src={require(`../img/${decodeURIComponent(section['menu_image'])}`)} alt={section['menu_name']} loading="lazy" />
                                )}

                                <hr id="menuHr" className={style.menuHr}></hr>
                                <div className={style.menuInfo}>
                                    <div className={style.menuName}>{section['menu_name']}</div>
                                    <div className={style.menuPrice}>가격 : {(activeSection === 'P' && section['menu_pack'] === 1) ? (section['menu_price'] + 500).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : section['menu_price'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</div>
                                </div>
                            </button>
                        </div>
                    ))}
                </div>


            </body>

            {/* <footer>
                <div id="cart">
                    <h3>장바구니</h3>
                    <ul id="cart-items" style={{ maxHeight: '80%', overflowY: 'auto' }}>
                        장바구니 아이템들을 여기에 렌더링합니다. 
                    </ul>
                    <p id="total">합계: 원</p> {cart.total}
                </div>
                <div id="footer-buttons">
                    <button>이전 페이지로</button>
                </div>
            </footer> */}
        </>
    );
}

export default Menu;