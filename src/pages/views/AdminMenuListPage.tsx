import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import style from '../css/Menu.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import ysuLogo from '../img/ysu_logo.jpg';
import Select from "react-select"
import wrongAstyle from '../css/WrongApproach.module.css';
import WrongApproach from './WrongApproach';

export const AdminMenuListPage = (): JSX.Element => {
    const corner = ['S', 'B', 'F', 'P']
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activeSection, setActiveSection] = useState('S');
    const [menu_id, setMenuId] = useState < number > (0); // 메뉴 ID 상태 (숫자)
    const [selectedOption, setSelectedOption] = useState < any > (null); // 선택된 옵션을 저장할 상태
    const [sections, setSections] = useState < {
        menu_id: number,
        menu_name: string,
        menu_corner: string,
        menu_price: number,
        menu_pack: number,
        menu_image: string,
        menu_sales: number,
        menu_regist: number
    }[] > ([]);

    const userId = localStorage.getItem("user_id");
    const userName = localStorage.getItem("user_name");
    const userDept = localStorage.getItem("user_dept");

    const [originalSections, setOriginalSections] = useState < {
        menu_id: number,
        menu_name: string,
        menu_corner: string,
        menu_price: number,
        menu_pack: number,
        menu_image: string,
        menu_sales: number,
        menu_regist: number
    }[] > ([]); // 초기 데이터를 저장할 상태

    useEffect(() => {
        window.scrollTo(0, 0);
        axios.get("/adminmenu").then((res) => {
            setSections(res.data);
            setOriginalSections(res.data);
            console.log(res);
        })
    }, [])

    const [resetSelect, setResetSelect] = useState < undefined | null > (undefined);

    const handleSectionClick = (section: string) => {
        setActiveSection(section);
        setResetSelect(undefined);
        setSelectedOption(null);
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
        setSelectedOption(selectedOption);
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

    const goToMain = () => {
        navigate('/');
    }


    return (
        <>

            <head>
                <script src="https://use.fontawesome.com/releases/v5.2.0/js/all.js"></script>
            </head>
            {userDept == 'admin' ? (
                <body className={style.body}>
                    <div>
                        <div id="head" className={style.head}>

                            <Link className={style.link} to="./menuInsert">
                                <FiPlus className={style.faArrowRightFromBracket} />
                            </Link>
                            <img id="logo" className={style.logo} src={ysuLogo} alt={"logo"} />
                            <Link to="/login" className={style.link} >
                                <MdLogout className={style.faArrowRightFromBracket} onClick={handleLogout} />
                            </Link>

                        </div>
                    </div>

                    <div>
                        <div>
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
                                    <span className={style.MainredCircle} /><a className={style.CircleText}>포장메뉴</a>
                                    <span className={style.MainblueCircle} /><a className={style.CircleText}>등록메뉴</a>
                                </div>
                                <Select
                                    options={options}
                                    className={style.selectoption}
                                    onChange={handleOptionChange}
                                    isClearable
                                    isSearchable
                                    placeholder={selectedOption ? selectedOption.label : "메뉴를 선택하세요"} // 선택된 옵션을 표시할 부분
                                    value={resetSelect}
                                />
                            </div>
                        )}

                        {activeSection === 'P' && (
                            <div className={style.selectMenu}>
                                <div className={style.MainpriceIcons}>
                                    <span className={style.MainredCircle} /><a className={style.CircleText}>포장메뉴</a>
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

                        <div className={style.menuList} style={{ marginTop: '0px' }} >
                            {sections.map((section, idx) => (
                                <div key={`${idx}-${section['menu_corner']}`} id={section['menu_corner']} className={activeSection === section['menu_corner'] || (activeSection === 'P' && section['menu_pack'] === 1) ? style.active : style.hidden}>
                                    <button
                                        key={section['menu_id']}
                                        onClick={() => {
                                            navigate('/adminMenu/menuDetail', {
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
                                            <div className={style.menuName} style={{ display: 'flex', flexDirection: 'row' }}>{section['menu_name']} &nbsp;
                                                {/* 이 부분이 초록 원, 파란 원 부분 */}
                                                <div className={style.priceIcons}>
                                                    {section['menu_pack'] === 1 && (
                                                        <span className={style.redCircle}></span>
                                                    )}
                                                    {section['menu_regist'] === 1 && (
                                                        <span className={style.blueCircle}></span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className={style.menuPrice}>가격 : {(activeSection === 'P' && section['menu_pack'] === 1) ? (section['menu_price'] + 500).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : section['menu_price'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</div>

                                        </div>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                </body>
             ) : (
                <WrongApproach />
            )}
        </>
    );
}

export default AdminMenuListPage;