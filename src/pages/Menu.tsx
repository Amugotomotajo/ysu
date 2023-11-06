import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu.css';
import axios from 'axios';
import { faArrowLeft, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import ysuLogo from './img/ysu_logo.jpg';

export const Menu = (): JSX.Element => {
    const corner = ['S', 'B', 'F']
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('S');
    const [u_id, setUid] = useState(""); // 사용자 ID 상태
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

    useEffect(() => {
        axios.get("/menu").then((res) => {
            setSections(res.data)
            console.log(res)
        })
    }, [])

    const handleAddToCart = (menuId: number, userId: string) => {
        // 사용자 ID와 메뉴 ID를 이용해서 InsertCartDTO 객체를 생성
        const insertCartDTO = {
            u_id: userId,
            menu_id: menuId
        };

        // 서버로 데이터를 보냄
        axios.post('/cart/insertCart', insertCartDTO)
            .then(response => {
                console.log('Data inserted successfully');
                // Navigate to MenuDetail with u_id and menu_id
                navigate('/MenuDetail', {
                    state: {
                        u_id: userId,
                        menu_id: menuId
                    }
                });
            })
            .catch(error => {
                console.error('Failed to insert data', error);
            });
    };

    return (
        <>
            <head>
                <script src="https://use.fontawesome.com/releases/v5.2.0/js/all.js"></script>
            </head>
            <body>
                <div>
                    <div id="head">
                        <Link to="/">
                            <FontAwesomeIcon id="faArrowLeft" icon={faArrowLeft} />
                        </Link>
                        <img id="logo" src={ysuLogo} alt={"logo"} />
                        <Link to="/">
                            <FontAwesomeIcon id="faCartShopping" icon={faCartShopping} />
                        </Link>
                    </div>
                    <nav>
                        <ul>
                            <li>
                                <a href='#S' onClick={() => { setActiveSection('S'); }} className={activeSection === 'S' ? 'active' : ''}>
                                    면분식류
                                </a>
                            </li>
                            <li>
                                <a href='#B' onClick={() => { setActiveSection('B'); }} className={activeSection === 'B' ? 'active' : ''}>
                                    비빔밥덮밥류
                                </a>
                            </li>
                            <li>
                                <a href='#F' onClick={() => { setActiveSection('F'); }} className={activeSection === 'F' ? 'active' : ''}>
                                    돈까스라이스류
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="menuList">
                    {sections.map((section, idx) => (
                        <div key={`${idx}-${section['menu_corner']}`} id={section['menu_corner']} className={activeSection === section['menu_corner'] ? 'active' : 'hidden'}>
                            <div className="menuButton">
                                <button key={section['menu_id']}
                                    onClick={() => {
                                        navigate('/MenuDetail', {
                                            state: {
                                                u_id: u_id,
                                                menu_id: section['menu_id']
                                            }
                                        });
                                    }}>

                                    <img src={require(`./img/${decodeURIComponent(section['menu_image'])}`)} alt={section['menu_name']} />
                                    <hr id="menuHr"></hr>
                                    <div className="menuInfo">
                                        <div className="menuName">{section['menu_name']}</div>
                                        <div className="menuPrice">가격 : {section['menu_price'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</div>
                                    </div>
                                </button>
                            </div>
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