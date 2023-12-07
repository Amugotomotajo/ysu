import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import style from '../css/AdminMenuList.module.css';
import axios from 'axios';
import { faArrowLeft, faPlus, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";
import { MdLogout, MdOutlineRateReview } from "react-icons/md";
import ysuLogo from '../img/ysu_logo.jpg';
import Select from "react-select"

export const AdminMenuListPage = (): JSX.Element => {
    const corner = ['S', 'B', 'F', 'P']
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
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

    const [originalSections, setOriginalSections] = useState<{
        menu_id: number,
        menu_name: string,
        menu_corner: string,
        menu_price: number,
        menu_pack: number,
        menu_image: string,
        menu_sales: number,
        menu_regist: number
    }[]>([]); // 초기 데이터를 저장할 상태

    useEffect(() => {
        window.scrollTo(0, 0);
        axios.get("/adminmenu").then((res) => {
            setSections(res.data);
            setOriginalSections(res.data);
            console.log(res);
        })
    }, [])

    const MenuListPage = () => {
        navigate("/adminmain");
    };

    const [resetSelect, setResetSelect] = useState<undefined | null>(undefined);

    const handleSectionClick = (section: string) => {
        setActiveSection(section);
        setResetSelect(undefined);
        window.scrollTo(0, 0);

        if (section === 'P' || section === 'B' || section === 'S' || section === 'F') {
            setSections(originalSections);
            setResetSelect(null);
        }
    };


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


    const options = [
        {
            label: '포장 여부', options: [
                { value: 'packtrue', label: '포장가능메뉴' },
                { value: 'packfalse', label: '포장불가능메뉴' }
            ]
        },
        {
            label: '판매 여부', options: [
                { value: 'saletrue', label: '판매가능메뉴' },
                { value: 'salefalse', label: '판매불가능메뉴' }
            ]
        },
        {
            label: '등록 여부', options: [
                { value: 'registtrue', label: '등록메뉴' },
                { value: 'registfalse', label: '미등록메뉴' }
            ]
        },
        {
            label: '기타', options: [
                { value: 'allmenulist', label: '전체메뉴' }
            ]
        }
    ]

    const handleOptionChange = (selectedOption: any) => {
        if (selectedOption && selectedOption.value === 'packtrue') {
            // 판매가능메뉴확인이 선택되었을 때, menu_pack 1인 메뉴만 필터링
            const filteredSections = originalSections.filter(section => section.menu_pack === 1);
            setSections(filteredSections);
            console.log(filteredSections);
        }
        else if (selectedOption && selectedOption.value === 'packfalse') {
            // 판매가능메뉴확인이 선택되었을 때, menu_pack 0인 메뉴만 필터링
            const filteredSections = originalSections.filter(section => section.menu_pack === 0);
            setSections(filteredSections);
            console.log(filteredSections);
        }
        else if (selectedOption && selectedOption.value === 'saletrue') {
            // 판매가능메뉴확인이 선택되었을 때, menu_sales 1인 메뉴만 필터링
            const filteredSections = originalSections.filter(section => section.menu_sales === 1);
            setSections(filteredSections);
            console.log(filteredSections);
        }
        else if (selectedOption && selectedOption.value === 'salefalse') {
            // 판매가능메뉴확인이 선택되었을 때, menu_sales 0인 메뉴만 필터링
            const filteredSections = originalSections.filter(section => section.menu_sales === 0);
            setSections(filteredSections);
            console.log(filteredSections);
        }
        else if (selectedOption && selectedOption.value === 'registtrue') {
            // 판매가능메뉴확인이 선택되었을 때, menu_regist가 1인 메뉴만 필터링
            const filteredSections = originalSections.filter(section => section.menu_regist === 1);
            setSections(filteredSections);
            console.log(filteredSections);
        }
        else if (selectedOption && selectedOption.value === 'registfalse') {
            // 판매가능메뉴확인이 선택되었을 때, menu_regist가 0인 메뉴만 필터링
            const filteredSections = originalSections.filter(section => section.menu_regist === 0);
            setSections(filteredSections);
            console.log(filteredSections);

        } else {
            // 다른 옵션이 선택되었을 때, 모든 메뉴를 보여줌
            setSections(originalSections);
            setResetSelect(undefined);
        }
    };


    return (
        <>

            <head>
                <script src="https://use.fontawesome.com/releases/v5.2.0/js/all.js"></script>
            </head>
            <body className={style.body}>
                <div>
                    <div id="head" className={style.head}>
                        <Link className={style.link} to="/adminmain">
                        <BiArrowBack className={style.faArrowLeft} />
                        </Link>
                        <Link className={style.link} to="">
                            <FontAwesomeIcon id="faArrowRightFromBracket" className={style.faArrowRightFromBracket} icon={faArrowRightFromBracket} style={{ color: 'transparent' }} />
                        </Link>

                        <img id="logo" className={style.logo} src={ysuLogo} alt={"logo"} onClick={MenuListPage} />
                        <Link to="/login" className={style.link} >
                        <MdLogout className={style.faArrowRightFromBracket} onClick={handleLogout} /> 
                        </Link>
                        <Link className={style.link} to="./menuinsert">
                            <FiPlus className={style.faPlus} /> 
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
                                        {section === 'S' && '면분식류(S)'}
                                        {section === 'B' && '비빔밥덮밥류(B)'}
                                        {section === 'F' && '돈까스라이스류(F)'}
                                        {section === 'P' && '포장(P)'}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                {(activeSection === 'S' || activeSection === 'B' || activeSection === 'F') && (
                    <div className={style.selectMenu}>
                        <div className={style.MainpriceIcons}>
                            <span className={style.MainredCircle} /><a className={style.CircleText}>포장가능메뉴</a>
                            <span className={style.MainblueCircle} /><a className={style.CircleText}>등록메뉴</a>
                        </div>
                        <Select options={options} className={style.selectoption} onChange={handleOptionChange} isClearable
                            isSearchable
                            value={resetSelect} 
                            placeholder="메뉴를 선택하세요"/>
                    </div>
                )}

                {activeSection === 'P' && (
                    <div className={style.selectMenu}>
                        <div className={style.MainpriceIcons}>
                            <span className={style.MainredCircle} /><a className={style.CircleText}>포장가능메뉴</a>
                            <span className={style.MainblueCircle} /><a className={style.CircleText}>등록메뉴</a>
                        </div>
                        <Select options={options}
                            className={style.selectoptionP}
                            onChange={handleOptionChange}
                            isClearable
                            isSearchable
                            placeholder="메뉴를 선택하세요"
                            value={resetSelect} />
                    </div>
                )}



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
                                <div className={style.priceIcons}>
                                        {section['menu_pack'] === 1 && (
                                            <span className={style.redCircle}></span>
                                        )}
                                        {section['menu_regist'] === 1 && (
                                            <span className={style.blueCircle}></span>
                                        )}
                                    </div>
                            </button>
                        </div>
                    ))}
                </div>


            </body>
        </>
    );
}

export default AdminMenuListPage;