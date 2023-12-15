import { useEffect, useState } from "react";
import { OrderDetail, Orders } from "../Order/state/order.state";
import axios from "axios";
import "./css/complete.css";
import { IoHomeSharp } from "react-icons/io5";
import { LiaCheckCircle } from "react-icons/lia";
import React from "react";

export const OrderComplete = (): JSX.Element => {
  const [orderList, setOrderList] = useState<Orders[]>([]);
  const [orderDetail, setOrderDetail] = useState<OrderDetail[]>([]);

  // 주문 목록
  useEffect(() => {
    axios.get("/order/list").then((res) => {
      setOrderList(res.data);
    })
  }, []);

  // 주문 상세 정보 가져오기
  useEffect(() => {
    // orderList가 비어있거나 첫 번째 주문의 id만을 고려
    if (orderList.length > 0) {
      const orderId = orderList[0].order_id;

      axios.get(`/order/detail/${orderId}`).then((res) => {
        setOrderDetail((prevOrderDetail) => [...prevOrderDetail, res.data]);

      });
    }
  }, [orderList]);



  return (
    <div className="body">
      {orderList.map((order, index) => (
        <div className="body" key={order.order_id}>

          <div className="orderTop">
            <div className="odTopHome" >
              <IoHomeSharp fontSize="1.2em" style={{ color: 'transparent' }} />
            </div>
            <p className="topTxt"> 주문완료</p>
            <div className="odTopHome">
              <IoHomeSharp fontSize="1.2em" />
            </div>
          </div>

          <div className="odContent">
            <div className="cplBox">
              <div className="txt">
                <div className="oIcon"><LiaCheckCircle className="checkIcon" fontSize="4em" color="rgb(80, 176, 209)" /></div>
                <div className="ocTxt">주문이 완료되었습니다.</div>
                <div className="oTxt">주문일시: {order.order_date}</div>
                <div className="oTxt">주문번호: {order.order_id}</div>
              </div>
            </div>

            <div className="infoBox">

              <div className="infoBoxTop">
                <div className="orderInfoTxt"> 주문 상세</div>
              </div>

              <div className="odMenuBox">
                {orderDetail[0] && orderDetail[0].length > 0 ? (
                  orderDetail[0].map((detail) => (
                    <div className="odInfoDiv" key={detail.order_detail_id}>


                      <div className="odMenuImgDiv">
                        <div><img className="odMenuImg" src={require(`../image/${decodeURIComponent(detail['menu_image'])}`)}
                          alt={detail['menu_name']} /> </div>
                      </div>


                      <div style={{ width: "100%", marginTop: "10px" }}>
                        <div className="odMenuInfo">
                          <div style={{ display: "flex" }}>
                            <div className="odMenuName"> {detail.menu_name} </div>
                          </div>
                          <div>
                            <div className="odMenuPrice"> {detail.menu_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</div>
                          </div>
                        </div>

                        <div>
                          <div className="orderMenuInfoBox">
                            <div> ┕ 수량 : {detail.quantity}개 </div>
                            {
                              detail.is_packed === 0 ? (
                                <div> ┕ 방법 : 식당 </div>
                              ) : (
                                <div> ┕ 방법 : 포장 </div>
                              )}
                            <div> ┕ 코너 : {detail.menu_corner} </div>
                          </div>
                        </div>

                      </div>

                    </div>
                  ))
                ) : (
                  <p>주문 상세 내역이 없습니다.</p>
                )}

                <div className="odPriceBox">
                  <div className="odTotalPriceTxt"> 총 결제금액</div>
                  <div className="odTotalPrice"> {order.total_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원 </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default OrderComplete;