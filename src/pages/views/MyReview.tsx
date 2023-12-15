import React, { useState, useEffect } from 'react';
import MenuStyle from '../css/Menu.module.css';
import ysuLogo from '../img/ysu_logo.jpg';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { BiArrowBack, BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import { IoCartSharp } from "react-icons/io5";
import { FaStar } from 'react-icons/fa';
import style from '../css/MyReview.module.css';
import axios from 'axios';
import noOrders from '../img/noOrders.png';
import WrongApproach from './WrongApproach';
import { Rate } from 'antd';

export const MyReview = (): JSX.Element => {
    const [menu_id, setMenuId] = useState < number > (0); // 메뉴 ID 상태 (숫자)
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const starArray = [0, 1, 2, 3, 4];
    const [score, setScore] = useState([false, false, false, false, false]);
    const [reviewCount, setReviewCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [myReviews, setMyReviews] = useState < {
        u_id: string,
        order_id: number,
        menu_id: number,
        review_id: number,
        review_writing: string,
        review_star: number,
        review_time: string,
        review_regist: number,
        menu_name: string,
        menu_corner: string,
        menu_price: number,
        menu_pack: number,
        menu_image: string,
        menu_sales: string,
        menu_regist: number,
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

    const userId = localStorage.getItem("user_id") || '';
    const userName = localStorage.getItem("user_name") || '';
    const userDept = localStorage.getItem("user_dept") || '';

    useEffect(() => {

        console.log(userId);
        setUserInfo({
            u_id: userId,
            u_name: userName,
            u_dept: userDept
        });

        axios.get(`/myreviews/${userId}`)
            .then((res) => {
                console.log(res.data);
                const data = res.data;
                console.log(data);
                if (data && data.length === 0) {
                    setIsLoading(false);
                    console.log("데이터 가져오기 실패!");
                } else {
                    setMyReviews(data);
                    setReviewCount(data.length);
                    console.log(data.length);
                    console.log("데이터 가져오기 성공!");
                    console.log(data);
                    setIsLoading(false);
                }

            })
            .catch((error) => {
                console.error('메뉴 데이터를 불러오는 데 실패했습니다.', error);
            });

        const orderIds = Array.from(new Set(myReviews.map(review => review.order_id)));

        if (myReviews.length > 0) {
            // 모든 주문을 기본적으로 확장되도록 초기화 (한 번만)
            const initialExpandedState: { [orderId: number]: boolean } = {};

            myReviews.forEach(review => {
                initialExpandedState[review.order_id] = true;
            });
            setExpandedOrders(initialExpandedState);
        }
        return () => {
            const isMounted = false; // 컴포넌트가 언마운트되면 isMounted 값을 false로 변경하여 setState 호출 방지
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

    const starScore = (index: number) => {
        let star = [...score];
        for (let i = 0; i < 5; i++) {
            star[i] = i <= index ? true : false;
        }
        setScore(star);
    };


    const handleLogout = () => {
        // 세션 초기화
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
            {userId ? (
                <div>
                    <div id="head" className={MenuStyle.head}>
                        <Link className={MenuStyle.link} to="/MyPage">
                            <BiArrowBack className={MenuStyle.faArrowLeft} />
                        </Link>
                        <img id="logo" className={MenuStyle.logo} src={ysuLogo} alt={"logo"} />
                        <Link className={MenuStyle.link} to="/">
                            <IoCartSharp className={MenuStyle.faCartShopping} />
                        </Link>
                    </div>

                    <div className={style.pageHead}>
                        마이 리뷰
                    </div>

                    <div className={style.MyOrderList}>
                        {myReviews.length !== 0 ? (
                            <div className={style.orderContainer}>
                                <span className={style.reviewCount}><span className={style.countHead}>내가 작성한 리뷰</span> <span style={{fontWeight:'500'}}>{reviewCount}</span> 개</span>
                            </div>
                        ) : (
                            <span></span>
                        )}

                        {isLoading ? (
                            <p>&nbsp;</p>
                        ) :
                            myReviews.length === 0 ? (
                                <div className={style.noOrders}>
                                    <img id="noOrdersImg" className={style.noOrdersImg} src={noOrders} alt={"logo"} />
                                    <p>작성한 리뷰가 없습니다.</p>
                                </div>
                            ) : (
                                Array.from(new Set(myReviews.map(review => review.order_id))).map(orderId => (
                                    <div key={orderId} className={style.orderContainer}>
                                        {/* 주문 번호를 클릭하여 상세 정보를 펼치거나 접는 부분 */}
                                        <div className={style.orderHeader}>

                                            <span style={{ fontSize: '20px' }}>&nbsp;주문 번호 &nbsp;{orderId}</span>

                                            {/* 주문 날짜 */}
                                            {Array.from(new Set(myReviews.filter(review => review.order_id === orderId).map(order => order.review_time))).map(orderDate => (
                                                <div key={`${orderId}-${orderDate}`} className={style.orderDateHeader}>

                                                    {/* 날짜 표시 */}
                                                    <p className={style.orderDate}>&nbsp;&nbsp;&nbsp;{formatOrderDate(orderDate)} </p>

                                                    {myReviews
                                                        .filter(review => review.order_id === orderId && review.review_time === orderDate)
                                                        .map((myReview, idx) => (
                                                            <><div key={`${orderId}-${orderDate}-${idx}`} className={style.menuItem}>
                                                                {/* 메뉴 상세 정보 표시 */}
                                                                <div className={style.menuImage}>
                                                                    <img src={require(`../img/${decodeURIComponent(myReview['menu_image'])}`)} alt={myReview['menu_name']} />
                                                                </div>
                                                                <div className={style.menuDetails}>
                                                                    <div className={style.menuName}>{myReview.menu_name}</div>
                                                                    <div className={style.menuCorner}>• 코너 : {myReview.menu_corner}</div>

                                                                    <div className={style.menuPrice}>
                                                                        <span style={{fontWeight: '500'}}>{myReview.menu_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                                                        원
                                                                    </div>
                                                                </div>

                                                            </div>
                                                            </>
                                                        ))}


                                                    <>
                                                        {myReviews
                                                            .filter(review => review.order_id === orderId && review.review_time === orderDate)
                                                            .map((myReview, idx) => (
                                                                <>
                                                                <div style={{display:'flex', justifyContent: 'flex-end', textAlign:'right'}}>
                                                                    <div className={style.Review}>
                                                                        <div className={style.reviewStar}>
                                                                            &nbsp;

                                                                            <Rate
                                                                                allowHalf={false} 
                                                                                count={5} // 별 개수
                                                                                value={myReview.review_star} // 현재 평점 값
                                                                                style={{ fontSize: '20px', margin: '10px 0' }} 
                                                                            />

                                                                            &nbsp; {myReview.review_star}.0
                                                                        </div>

                                                                        <div className={style.reviewWriting}>&nbsp;{myReview.review_writing}</div>
                                                                    </div>
                                                                </div>
                                                                </>
                                                            ))
                                                        }
                                                    </>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            )}
                    </div>
                </div>
            ) : (
                <WrongApproach />
            )}
        </>
    );
}

export default MyReview;