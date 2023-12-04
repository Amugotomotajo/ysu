import { Button, Empty } from "antd";
import '../css/cartCss.css'
import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi"
import CartList from "./CartList";
import { Cart, Orders } from "./state/cart.state";
import { IoHomeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export const CartMain = ():JSX.Element => {
    const [cartList, setCartList] = useState<Cart[]>([]);
    const [orderList, setOrderList] = useState<Orders[]>([]);
    const navigate = useNavigate();

return (
    <>
        <div className="body">
                <div className="cartTop">
                    <div className="backBtn" > <BiArrowBack fontSize="1.5em"/>  </div>
                    <p className="topTxt"> 장바구니</p>  
                    <div className="odTopHome">
              <IoHomeSharp fontSize="1.2em" />
            </div>
                </div>
            <div className="content">
               <CartList /> 
            </div>
        </div>
        </>
    )
}

export default CartMain;