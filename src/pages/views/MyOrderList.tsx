import React, { useState, useEffect } from 'react';
import MenuStyle from '../css/Menu.module.css';
import ysuLogo from '../img/ysu_logo.jpg';
import noOrders from '../img/noOrders.png';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { BiArrowBack, BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import { IoCartSharp } from "react-icons/io5";
import style from '../css/MyOrderList.module.css';
import WrongApproach from './WrongApproach';

export const MyOrderList = (): JSX.Element => {
    const [menu_id, setMenuId] = useState < number > (0); // 메뉴 ID 상태 (숫자)
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [myOrders, setMyOrders] = useState < {
        order_detail_id: number,
        order_id: number,
        u_id: string,
        menu_id: number,
        quantity: number,
        price: number,
        is_packed: number,
        menu_name: string,
        menu_corner: string,
        menu_price: number,
        menu_pack: number,
        menu_image: string,
        menu_sales: number,
        menu_regist: number,
        total_price: number,
        order_date: string,
    }[] > ([]);

    const [myReviews, setMyReviews] = useState < {
        u_id: string,
        order_id: number,
        menu_id: number,
    }[] > ([]);

    const [userInfo, setUserInfo] = useState < {
        u_id: string,
        u_name: string,
        u_dept: string
    } > ({
        u_id: "",
        u_name: "",
        u_dept: ""
    });

    // localStorage에서 유저 정보 가져오기
    const userId = localStorage.getItem("user_id") || '';
    const userName = localStorage.getItem("user_name") || '';
    const userDept = localStorage.getItem("user_dept") || '';

    useEffect(() => {

        setUserInfo({
            u_id: userId,
            u_name: userName,
            u_dept: userDept
        });

        let isMounted = true; // 컴포넌트가 마운트되어 있는지 여부를 확인하기 위한 변수

        axios.get(`/myorders/${userId}`)
            .then((res) => {
                if (isMounted) {
                    const data = res.data;
                    if (data && data.length === 0) {
                        // 받아올 데이터가 더 이상 없음을 나타내는 경우
                        setHasMore(false);
                        setIsLoading(false);
                    } else {
                        // 받아온 데이터를 처리하는 로직...
                        setMyOrders(data);
                        console.log("데이터 가져오기 성공!");
                        console.log(data);
                        setIsLoading(false);
                    }
                }
            })
            .catch((error) => {
                console.error('메뉴 데이터를 불러오는 데 실패했습니다.', error);
                setIsLoading(false);
            });

        axios.get(`/myreviews/${userId}`)
            .then((res) => {
                console.log(res.data);
                const data = res.data;

                if (data && data.length === 0) {

                    console.log("리뷰 데이터 가져오기 실패!");
                } else {
                    setMyReviews(data);
                    console.log("리뷰 데이터 가져오기 성공!");
                    console.log(data);
                    setIsLoading(false);
                }

            })
            .catch((error) => {
                console.error('메뉴 데이터를 불러오는 데 실패했습니다.', error);
            });

        const orderIds = Array.from(new Set(myOrders.map(order => order.order_id)));
        if (myOrders.length > 0) {
            // 모든 주문을 기본적으로 확장되도록 초기화 (한 번만)
            const initialExpandedState: { [orderId: number]: boolean } = {};
            myOrders.forEach(order => {
                initialExpandedState[order.order_id] = true;
            });
            setExpandedOrders(initialExpandedState);
        }
        return () => {
            isMounted = false; // 컴포넌트가 언마운트되면 isMounted 값을 false로 변경하여 setState 호출 방지
        };

    }, [localStorage]);

    const [expandedOrders, setExpandedOrders] = useState < { [orderId: number]: boolean } > ({});

    const toggleOrder = (orderId: number) => {
        setExpandedOrders(prevState => ({
            ...prevState,
            [orderId]: !prevState[orderId]
        }));
    };

    const formatOrderDate = (orderDateStr: string): string => {
        const orderDate = new Date(orderDateStr);
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
            hour: 'numeric',
            minute: 'numeric',
        };

        return orderDate.toLocaleDateString('ko-KR', options);
    };


    return (
        <>
            {userId ? (
                <div>
                    <div id="head" className={MenuStyle.head}>
                        <Link className={MenuStyle.link} to="/MyPage">
                            <BiArrowBack className={MenuStyle.faArrowLeft} />
                        </Link>
                        <img id="logo" className={MenuStyle.logo} src={ysuLogo} alt={"logo"} />
                        <Link className={MenuStyle.link} to="/cart">
                            <IoCartSharp className={MenuStyle.faCartShopping} />
                        </Link>
                    </div>

                    <div className={style.pageHead}>
                        주문 내역
                    </div>

                    <div className={style.MyOrderList}>
                        {isLoading ? (
                            <p>&nbsp;</p>
                        ) : (myOrders.length === 0 ? (
                            <div className={style.noOrders}>
                                <img id="noOrdersImg" className={style.noOrdersImg} src={noOrders} alt={"logo"} />
                                <p>주문 내역이 없습니다.</p>
                            </div>
                        ) : (
                            Array.from(new Set(myOrders.map(order => order.order_id))).map(orderId => (
                                <div key={orderId} className={style.orderContainer}>
                                    {/* 주문 번호를 클릭하여 상세 정보를 펼치거나 접는 부분 */}
                                    <div className={style.orderHeader} onClick={() => toggleOrder(orderId)}>
                                        {expandedOrders[orderId] ? (
                                            <BiSolidDownArrow className={style.arrowIcon} style={{ color: '#4D5964' }} />

                                        ) : (
                                            <BiSolidUpArrow className={style.arrowIcon} style={{ color: '#4D5964' }} />
                                        )}
                                        <span style={{ fontSize: '20px' }}> 주문 번호 : {orderId} </span>

                                        {/* 주문 날짜 */}
                                        {Array.from(new Set(myOrders.filter(order => order.order_id === orderId).map(order => order.order_date))).map(orderDate => (
                                            <div key={`${orderId}-${orderDate}`} className={style.orderDateHeader}>
                                                {/* 날짜 표시 */}
                                                <p className={style.orderDate} style={{ fontWeight: '500' }}>&nbsp;&nbsp;{formatOrderDate(orderDate)} </p>

                                                {/* 펼쳐진 상태일 때 주문 정보를 보여줌 */}
                                                {expandedOrders[orderId] && (
                                                    <>
                                                        {myOrders
                                                            .filter(order => order.order_id === orderId && order.order_date === orderDate)
                                                            .map((myOrder, idx) => (
                                                                <><div key={`${orderId}-${orderDate}-${idx}`} className={style.menuItem}>
                                                                    {/* 메뉴 상세 정보 표시 */}
                                                                    <div className={style.menuImage}>
                                                                        <img src={require(`../img/${decodeURIComponent(myOrder['menu_image'])}`)} alt={myOrder['menu_name']} />
                                                                    </div>
                                                                    <div className={style.menuDetails}>

                                                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                                            <span className={style.menuName}>{myOrder.menu_name} {myOrder.quantity}개 &nbsp;</span>
                                                                            {myReviews.filter(review => review.order_id === myOrder.order_id && review.menu_id === myOrder.menu_id).length > 0 ? (
                                                                                <span></span>
                                                                            ) : (
                                                            
                                                                                <button className={style.reviewWriting} onClick={() => navigate(`/review/write`, {
                                                                                    state: {
                                                                                      menu_id: myOrder.menu_id,
                                                                                      user_id: userId,
                                                                                      order_id: myOrder.order_id
                                                                                    }
                                                                                  })}>리뷰 작성</button>
                                                                            )}

                                                                        </div>
                                                                        <div className={style.isPacked}>• 방법 : {myOrder.is_packed == 1 ? '포장' : '매장'}</div>
                                                                        <div className={style.menuCorner}>• 코너 : {myOrder.menu_corner}</div>
                                                                        <div className={style.menuPrice}>{myOrder.menu_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</div>
                                                                    </div>

                                                                </div><hr className={style.Hr}></hr></>
                                                            ))}
                                                    </>
                                                )}
                                            </div>
                                        ))}
                                        {/* 주문의 총 결제 금액 표시 */}
                                        <div className={style.menuPrice}>
                                            결제 금액 : {myOrders.filter(order => order.order_id === orderId).reduce((total, order) => order.total_price, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
                                        </div>
                                    </div>

                                </div>

                            ))
                        )
                        )}
                    </div>
                </div>
            ) : (
                <WrongApproach />
            )}

        </>
    );
}

export default MyOrderList;