import React, {useState} from 'react';
import './Menu.css';
import 유부우동 from "./img/유부우동.jpg";
import 새우튀김우동 from "./img/새우튀김우동.jpg";
import 꼬치어묵우동 from "./img/꼬치어묵우동.jpg";
import 라면 from "./img/라면.jpg";

function Menu() {
    const [activeSection, setActiveSection] = useState('S');

    const sections = [
        {
            id: 'S',
            title: '면분식류',
            items: [
                { name: '유부우동', price: 5000, image: 유부우동 },
                { name: '새우튀김우동', price: 5000, image: 새우튀김우동 },
                { name: '꼬치어묵우동', price: 5000, image: 꼬치어묵우동 },
                { name: '라면', price: 5000, image: 라면 },
            ],
        },
        {
            id: 'B',
            title: '비빔밥덮밥류',
            items: [
                { name: '유부b우동', price: 5000, image: 유부우동 },
                { name: '새우튀김우동', price: 5000, image: 새우튀김우동 },
                { name: '꼬치어묵우동', price: 5000, image: 꼬치어묵우동 },
                { name: '라면', price: 5000, image: 라면 },
            ],
        },
        {
            id: 'F',
            title: '돈까스라이스류',
            items: [
                { name: '유부f우동', price: 5000, image: 유부우동 },
                { name: '새우튀김우동', price: 5000, image: 새우튀김우동 },
                { name: '꼬치어묵우동', price: 5000, image: 꼬치어묵우동 },
                { name: '라면', price: 5000, image: 라면 },
            ],
        },
        {
            id: 'pojang',
            title: '포장',
            items: [
                { name: '유부p우동', price: 5000, image: 유부우동 },
                { name: '새우튀김우동', price: 5000, image: 새우튀김우동 },
                { name: '꼬치어묵우동', price: 5000, image: 꼬치어묵우동 },
                { name: '라면', price: 5000, image: 라면 },
                { name: '라면', price: 5000, image: 라면 },
            ],
        },
    ];
    

    return (
        <>
            <nav>
                <ul>
                    {sections.map((section) => (
                        <li key={section.id}>
                            <a
                                href={`#${section.id}`}
                                onClick={() => setActiveSection(section.id)}
                                className={activeSection === section.id ? 'active' : ''}
                            >
                                {section.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="menuList">
                {sections.map((section) => (
                    <div key={section.id} id={section.id} className={activeSection === section.id ? 'active' : 'hidden'}>
                        <div className="menuButton">
                            {section.items.map((item, index) => (
                                <button key={index}>
                                    <img src={item.image} alt={item.name} />
                                    <p>{item.name}</p>
                                    <span>₩{item.price}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <footer>
                <div id="cart">
                    <h3>장바구니</h3>
                    <ul id="cart-items" style={{ maxHeight: '80%', overflowY: 'auto' }}>
                        {/* 장바구니 아이템들을 여기에 렌더링합니다. */}
                    </ul>
                    <p id="total">합계: 원</p> {/*{cart.total} */}
                </div>
                <div id="footer-buttons">
                    <button>이전 페이지로</button>
                    <button>주문 완료</button>
                </div>
            </footer>
        </>
    );
}

export default Menu;
