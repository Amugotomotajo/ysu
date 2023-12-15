import { Button, Empty, Input } from "antd";
import '../css/cartCss.css'
import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi"
import CartList from "./CartList";
import { Cart, Orders } from "./state/cart.state";
import { IoHomeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { RequestPayResponseCallback } from "../Order/Payment";

export const CartMain = (): JSX.Element => {
  const [cartList, setCartList] = useState<Cart[]>([]);
  const [orderList, setOrderList] = useState<Orders[]>([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  //장바구니 목록 불러오기  
  useEffect(() => {
    axios.get("/cart/list").then((res) => {
      setCartList(res.data);
      setIsLoading(false);
    })

  }, []);

  // 장바구니에서 메뉴 삭제
  const handleDelete = (menu_id: number) => {
    axios.delete(`cart/delete/${menu_id}`).then((res) => {
      setCartList((prevCartList) => prevCartList.filter((cart) => cart.menu_id !== menu_id));
    });
  };

  // 수량 감소
  const handleDecrement = (menu_id: number) => {
    setCartList((prevCartList) =>
      prevCartList.map((cart) =>
        cart.menu_id === menu_id && cart.quantity > 1
          ? { ...cart, quantity: cart.quantity - 1 }
          : cart
      )
    );
  };

  //수량 증가
  const handleIncrement = (menu_id: number) => {
    setCartList((prevCartList) =>
      prevCartList.map((cart) =>
        cart.menu_id === menu_id
          ? { ...cart, quantity: cart.quantity + 1 } : cart
      )
    );
  };

  const totalQuantity = cartList.reduce((totalQ, cart) => totalQ + cart.quantity, 0);
  const totalPrice = cartList.reduce((totalQ, cart) => totalQ + cart.menu_price * cart.quantity, 0);
  const totalPriceStr = totalPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); //1000단위 콤마

  const quantity = cartList.map((cart) => cart.quantity);
  const menu_id = cartList.map((cart) => cart.menu_id)

  const orderInfo = {
    ...orderList,
    order_id: undefined,
    u_id: undefined,
    total_quantity: totalQuantity,
    total_price: totalPrice,
    order_date: undefined
  };

  const cartInfo = {
    menu_id: menu_id,
    quantity: quantity
  }
  const cartItems = cartInfo.menu_id.map((menu_id, index) => ({
    menu_id: menu_id,
    quantity: cartInfo.quantity[index]
  }));

  const cartLength = cartItems.length;

  // 뒤로가기 or 홈 버튼 클릭시 현재 장바구니 수량 저장
  const handleCart = () => {
    axios.put("cart/update", cartItems)
    console.log(cartItems)
  }

  // 메뉴 페이지로 이동
  const goMenuPage = () => {
    navigate(''); //메뉴 목록 페이지
  }

  const [inputQuantity, setInputQuantity] = useState('');

  // 수량 입력
  const handleQuantityChange = (menu_id: number, quantity: number) => {
    let updatedQuantity = '1';

    if (isNaN(quantity) || quantity === 0) {
      updatedQuantity = '1';
    } else if (quantity > 100) {
      updatedQuantity = '100';
    } else if (quantity === 0) {
      updatedQuantity = '1';
    } else {
      updatedQuantity = quantity.toString();
    }

    setInputQuantity(updatedQuantity);

    const updatedCartList = cartList.map((item) => {
      if (item.menu_id === menu_id) {
        return {
          ...item,
          quantity: parseInt(updatedQuantity)
        };
      }
      return item;
    });
    setCartList(updatedCartList);
  };


  // 주문하기 버튼 클릭시 (cart UPDATE -> order INSERT -> cart 비우기)
  const handleOrder = () => {
    axios.put("cart/update", cartItems) //장바구니 업데이트
      .then((updateRes) => {
        axios.post("/order/insert", orderInfo) //주문 insert
          .then((orderRes) => {
            setOrderList(orderInfo); // 주문정보 가져오고
            navigate("/order");      // 주문완료 페이지로 이동
          })
          .catch((orderError) => {
            console.error("주문 요청 실패:", orderError);
          });
      }).then(() => {
        axios.delete("/cart/drop") //장바구니 비우기
      })  
      .catch((updateError) => {
        console.error("수량 업데이트 실패:", updateError);
      });
  };

  // 결제 아임포트
  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "https://cdn.iamport.kr/v1/iamport.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    }
  }, []);


  const callback: RequestPayResponseCallback = (response) => {
    const { success, error_msg, imp_uid, merchant_uid, pay_method, paid_amount, status, error_code } = response;
    
    console.log(response, pay_method, error_code, status)
    
    if (error_code === 'F400') { //중간에 취소시 장바구니 페이지로 이동
      navigate("/cart");
    } else {
      handleOrder();
    }
  };

  const onClickPayment = () => {
    var IMP = window.IMP;
    IMP.init('imp28705024');
    
    const data = {
      pg: 'tosspayments', //'html5_inicis.INIBillTst', tosspayments
      pay_method: 'card',
      merchant_uid: `mid_${new Date().getTime()}`,
      name: '주문명:결제테스트',
      amount: totalPrice,
      buyer_email: 'test@portone.io',
      buyer_name: '구매자이름',
      buyer_tel: '010-1234-5678',   //필수 파라미터 
      buyer_addr: '서울특별시 강남구 삼성동',
      buyer_postcode: '123-456',
      m_redirect_url: 'http://localhost:3000/cart', //IP 주소 바꾸고 하기!!!(모바일 결제 중 X버튼)
      app_scheme: '',
      escrow: true, //에스크로 결제인 경우 설정
      vbank_due: 'YYYYMMDD',
      bypass: {
        acceptmethod: "noeasypay", // 간편결제 버튼을 통합결제창에서 제외(PC)
        P_RESERVED: "noeasypay",  // 간편결제 버튼을 통합결제창에서 제외(모바일)
      }
    };
 
    IMP.request_pay(data, callback);
  }

  return (
    <>
      <div className="body">
        <div className="cartTop">
          <div className="backBtn" onClick={handleCart} > <BiArrowBack fontSize="1.5em" />  </div>
          <p className="topTxt"> 장바구니</p>
          <div className="odTopHome">
            <IoHomeSharp fontSize="1.2em" />
          </div>
        </div>
        <div className="content">
          {
            isLoading ? (
              <></>
            ) : cartLength > 0 ?
              (
                <>
                  {cartList.map((cart, index) => (
                    <div className="menuInfo" key={index}>
                      <img className="menuImg" src={require(`../image/${decodeURIComponent(cart['menu_image'])}`)} alt={cart['menu_name']} />

                      <div>
                        <div className="menuName">{cart.menu_name}</div>
                        <div className="menuPrice"> 가격: {cart.menu_price}원</div>
                        <div className="menuQuantity">
                          <div className="count" >
                            {cart.quantity <= 1 ? (
                              <Button className="minus" onClick={() => handleDecrement(cart.menu_id)} disabled>-</Button>) :
                              (
                                <Button className="minus" onClick={() => handleDecrement(cart.menu_id)}>-</Button>
                              )}
                            <Input
                              className="quantityInput"
                              name="counter"
                              value={isNaN(cart.quantity) ? '' : cart.quantity}
                              onChange={(e: any) => handleQuantityChange(cart.menu_id, parseInt(e.target.value))}
                              onBlur={(e: any) => {
                                const quantity = parseInt(e.target.value);
                                if (isNaN(quantity) || quantity === 0) {
                                  handleQuantityChange(cart.menu_id, 1);
                                }
                              }}
                            />
                            {cart.quantity === 100 ? (
                              <Button className="plus" onClick={() => handleIncrement(cart.menu_id)} disabled>+</Button>
                            ) : (
                              <Button className="plus" onClick={() => handleIncrement(cart.menu_id)}>+</Button>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button className="cartDelBtn" onClick={() => handleDelete(cart.menu_id)}>X</Button>
                    </div>
                  ))}
                </>

              )
              :
              (
                <div className="cartZero">
                  <div>
                    <div className="imgBox">
                      <div className="cartImg"></div>
                    </div>
                    <div className="zeroTxt">
                      장바구니에 담긴 상품이 없습니다.
                    </div>
                    <div className="zeroBtn">
                      <button className="goMenuBtn" onClick={goMenuPage}>메뉴 보러 가기</button> {/* 메뉴 리스트 링크 달기 */}
                    </div>
                  </div>
                </div>
              )
          }


        </div>
        <div className="bottomBox">
          <div className="priceBox">
            <div className="priceTxt">
              총 수량 {totalQuantity}개
            </div>
            <div className="totalPrice">
              총 주문금액 {totalPriceStr}원
            </div>
          </div>

          <div className="bottom">
            <button className="orderBtn" onClick={onClickPayment} disabled={totalQuantity === 0}>
              주문하기
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartMain;