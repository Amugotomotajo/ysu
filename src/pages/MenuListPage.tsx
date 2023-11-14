import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import style from '../css/MenuList.module.css';
import axios from 'axios';
import { faArrowLeft, faPlus, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import ysuLogo from '../img/ysu_logo.jpg';

export const MenuListPage = (): JSX.Element => {
    const corner = ['S', 'B', 'F', 'P']
    const navigate = useNavigate();
    const location = useLocation();
    const [activeSection, setActiveSection] = useState('S');
    const [menu_id, setMenuId] = useState<number>(0); // 메뉴 ID 상태 (숫자)
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

    const userId = sessionStorage.getItem("user_id");
    const userName = sessionStorage.getItem("user_name");
    const userDept = sessionStorage.getItem("user_dept")

    useEffect(() => {
        window.scrollTo(0, 0);
        axios.get("/adminmenu").then((res) => {
            setSections(res.data);
            console.log(res);
        })
    }, [])

    const handleSectionClick = (section: string) => {
        setActiveSection(section);
        window.scrollTo(0, 0);
    };

    const handleLogout = () => {
        // 세션 초기화
        sessionStorage.setItem("user_id", '');
        sessionStorage.setItem("user_name", '');
        sessionStorage.setItem("user_dept", '');
    
        // 로그인 페이지로 이동
        navigate('/');
      };


    return (
        <>
    
            <head>
                <script src="https://use.fontawesome.com/releases/v5.2.0/js/all.js"></script>
            </head>
            <body className={style.body}>
                <div>
                    <div id="head" className={style.head}>
                        <Link className={style.link} to="/">
                            <FontAwesomeIcon id="faArrowLeft" icon={faArrowLeft} className={style.faArrowLeft}/>
                        </Link>
                        <Link className={style.link} to="">
                            <FontAwesomeIcon id="faArrowRightFromBracket" className={style.faArrowRightFromBracket} icon={faArrowRightFromBracket} style={{color: 'transparent'}} />
                        </Link>
                        
                        <img id="logo" className={style.logo} src={ysuLogo} alt={"logo"} />
                        <Link to="/" className={style.link} onClick={handleLogout}>
                            <FontAwesomeIcon id="faArrowRightFromBracket" icon={faArrowRightFromBracket} className={style.faArrowRightFromBracket} />
                        </Link>
                        <Link className={style.link} to="./menuinsert">
                            <FontAwesomeIcon id="faPlus" icon={faPlus} />
                        </Link>

                    </div>
                    <nav className={style.nav}>
                        <ul className={style.ul}>
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
                                    navigate('/adminmenu/menudetail', {
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
                                        <img src={require(`../img/${decodeURIComponent(section['menu_image'])}`)} alt={section['menu_name']} />
                                    </div>
                                )}

                                {section['menu_sales'] === 1 && (
                                    <img src={require(`../img/${decodeURIComponent(section['menu_image'])}`)} alt={section['menu_name']} />
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
        </>
    );
}

export default MenuListPage;