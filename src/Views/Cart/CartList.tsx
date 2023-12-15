import { Button } from "antd";
import '../css/cartCss.css'
import { useEffect, useState } from "react";
import axios from "axios";
import Input from "antd/es/input/Input";
import { Cart, Orders } from './state/cart.state'
import { useNavigate } from "react-router-dom";
import { RequestPayResponseCallback } from "../Order/Payment";

export const CartList = (): JSX.Element => {
  const [cartList, setCartList] = useState<Cart[]>([]);
  const [orderList, setOrderList] = useState<Orders[]>([]);
  const navigate = useNavigate();
  //장바구니 목록 불러오기  
  useEffect(() => {
    axios.get("/cart/list").then((res) => {
      setCartList(res.data);
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

  const handleOrder = () => {
    axios.put("cart/update", cartItems)
      .then((updateRes) => {
        axios.post("/order/insert", orderInfo)
          .then((orderRes) => {
            setOrderList(orderInfo);
            navigate("/order");
          })
          .catch((orderError) => {
            console.error("주문 요청 실패:", orderError);
          });
      }).then(() => {
        axios.delete("/cart/drop")
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
    const { success, error_msg, imp_uid, merchant_uid, pay_method, paid_amount, status } = response;

    if (success) {
      axios.post("/order/insert", orderInfo)
        .then((res) => {
          setOrderList(orderInfo);
          setCartList([]); // 주문 후 장바구니 비우기
          navigate("/order");
        })
        .catch((error) => {
          console.error("주문 요청 실패:", error);
        });
    } else {
      alert(`결제 실패: ${error_msg}`);
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
      m_redirect_url: '{모바일에서 결제 완료 후 리디렉션 될 URL}',
      escrow: true, //에스크로 결제인 경우 설정
      vbank_due: 'YYYYMMDD',
      bypass: {
        acceptmethod: "noeasypay", // 간편결제 버튼을 통합결제창에서 제외(PC)
        P_RESERVED: "noeasypay=Y",  // 간편결제 버튼을 통합결제창에서 제외(모바일)
      }
    };

    IMP.request_pay(data, callback);

    axios.post("/order/insert", orderInfo)
      .then((res) => {
        setOrderList(orderInfo);
        setCartList([]); // 주문 후 장바구니 비우기
        navigate("/order");
      })
  }

  return (
    <>
      {cartList.map((cart, index) => (
        <div className="menuInfo" key={index}>
          <img className="menuImg" src={require(`../image/${decodeURIComponent(cart['menu_image'])}`)} alt={cart['menu_name']} />

          <div>
            <div className="menuName">{cart.menu_name}</div>
            <div className="menuPrice"> 가격: {cart.menu_price}원</div>
            <div className="menuQuantity">
              <div className="count" >
                {cart.quantity === 1 ? (
                  <Button className="minus" onClick={() => handleDecrement(cart.menu_id)} disabled>-</Button>) :
                  (
                    <Button className="minus" onClick={() => handleDecrement(cart.menu_id)}>-</Button>
                  )}
                < Input className="quantityInput" name="counter" value={cart.quantity} readOnly />
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

      <div className="priceBox">
        <div className="priceTxt">
          총 수량 {totalQuantity}개
        </div>
        <div className="totalPrice">
          총 주문금액 {totalPriceStr}원
        </div>
      </div>

      <div className="bottom">
        <button className="orderBtn" onClick={handleOrder} disabled={totalQuantity === 0}>
          주문하기
        </button>
      </div>
    </>
  );

}
export default CartList;
