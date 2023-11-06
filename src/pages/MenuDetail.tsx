import React, { useState, useEffect } from 'react';
import './MenuDetail.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const MenuDetail = (): JSX.Element => {
    const [u_id, setUid] = useState(""); // 사용자 ID 상태
    const [menu_id, setMenuId] = useState<number>(0); // 메뉴 ID 상태 (숫자)
    const location = useLocation();
    const navigate = useNavigate();
    const [section, setSection] = useState<{
        menu_id: number,
        menu_name: string,
        menu_corner: string,
        menu_price: number,
        menu_pack: number,
        menu_image: string,
        menu_sales: number,
        menu_regist: number
    }>();

    useEffect(() => {
        const menuId = location.state && location.state.menu_id;
        if (menuId !== undefined) {
            // menu_id가 정의되어 있으면 해당 메뉴 데이터를 가져옵니다.
            axios.get(`/menu/${menuId}`)
                .then((res) => {
                    setSection(res.data);
                    console.log(res);
                })
                .catch((error) => {
                    console.error('Failed to fetch menu data', error);
                });
        }
    }, [location.state]);

      const handleAddToCart = (menuId:number, userId:string) => {
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
        <div id="head">
            <Link to="/Menu">
                <FontAwesomeIcon id="faArrowLeft" icon={faArrowLeft} />
            </Link>
        </div>
        <div className="menuDetail">
            {section && (
                <div id={section['menu_corner']}>
                    <img id="menuDetailImg" src={require(`./img/${decodeURIComponent(section['menu_image'])}`)} alt={section['menu_name']} />
                    <hr id="menuDetailHr"></hr>
                    <div className="menuDetailInfo">
                        <div className="menuDetailName">{section['menu_name']}</div>
                        <div className="menuDetailPrice">가격 : {section['menu_price'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</div>
                    </div>
                </div>
            )}
            <button>메뉴 리뷰</button>
        </div>
        
        <footer>
            <div id="footer-buttons">
                <button>이전 페이지로</button>
                <input
                    type="text"
                    placeholder="사용자 ID"
                    value={u_id}
                    onChange={(e) => setUid(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="메뉴 ID"
                    value={menu_id}
                    onChange={(e) => {
                        const inputValue = e.target.value;
                        const numericValue = Number(inputValue);
                
                        if (!isNaN(numericValue)) {
                            setMenuId(numericValue);
                        } else {
                            console.log("fail");
                        }
                    }}
                />
                <button onClick={() => handleAddToCart(menu_id, u_id)}>Add to Cart</button>
            </div>
        </footer>
        </>
    );
}

export default MenuDetail;