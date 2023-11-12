import React, { useState, useEffect } from 'react';
import './MenuDetail.css';
import ysuLogo from './img/ysu_logo.jpg';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { faArrowLeft, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const MenuDetail = (): JSX.Element => {
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
      }>(

      );
      

    const [userInfo, setUserInfo] = useState<{
        u_id: string,
        u_name: string,
        u_dept: string
    }>({
        u_id: "",
        u_name: "",
        u_dept: ""
    });

    const menuId = location.state.menu_id;
    const menuPack = location.state.menu_pack;
    useEffect(() => {

        // sessionStorage에서 유저 정보 가져오기
        const userId = sessionStorage.getItem("user_id") || '';
        const userName = sessionStorage.getItem("user_name") || '';
        const userDept = sessionStorage.getItem("user_dept") || '';

        setMenuId(menuId);
        setUserInfo({ u_id: userId, u_name: userName, u_dept: userDept });

        if (menuId !== undefined) {
            // menu_id가 정의되어 있으면 해당 메뉴 데이터를 가져오기
            axios.get(`/menu/${menuId}`)
                .then((res) => {
                    setSection(res.data);
                    console.log("데이터 가져오기 성공!");
                    console.log(res.data);
                })
                .catch((error) => {
                    console.error('메뉴 데이터를 불러오는 데 실패했습니다.', error);
                });
        }
    }, [location.state, sessionStorage]);


    const handleAddToCart = (userId: string, menuId: number) => {
        // 사용자 ID와 메뉴 ID를 이용해서 InsertCartDTO 객체를 생성
        const insertCartDTO = {
            menu_id: menuId,
            u_id: userId
        };

        console.log(insertCartDTO);

        // 서버로 데이터를 보냄
        axios.post('/cart/insertCart', insertCartDTO)
            .then(response => {
                console.log('Data inserted successfully');
                // Do something after adding to cart if needed
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
                <img id="logo" src={ysuLogo} alt={"logo"} />
                <Link to="/">
                    <FontAwesomeIcon id="faCartShopping" icon={faCartShopping} />
                </Link>
            </div>
            <div className="menuDetail">
                {section && (
                    <div id={section['menu_corner']}>
                        <img id="menuDetailImg" src={require(`./img/${decodeURIComponent(section['menu_image'])}`)} alt={section['menu_name']} />
                        <hr id="menuDetailHr"></hr>
                        <div className="menuDetailInfo">
                            <div className="menuDetailName">{section['menu_name']}</div>
                            <div className="menuDetailPrice">가격 : {(menuPack === 1) ? (section['menu_price']+500).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : section['menu_price'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }원</div>
                        </div>
                    </div>
                )}
                <button id="reviewButton">메뉴 리뷰</button>
            </div>

            <footer>
                <div id="footer-buttons">
                    <button id="inputCart" onClick={() => handleAddToCart(userInfo.u_id, menuId)}> 장바구니에 담기</button>
                </div>
            </footer>
        </>
    );
}

export default MenuDetail;
