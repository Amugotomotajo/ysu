import { Button, Card } from "antd"
import { useNavigate } from "react-router-dom";
import { BsHandbagFill } from "react-icons/bs"
import { MdOutlineRestaurant } from "react-icons/md"
import { Link } from 'react-router-dom';
import './css/main.css'
import LOGO from './img/YSU_LOGO.png'


export const YsuMenuPage =  ():JSX.Element => {
    const navigate = useNavigate();

    const studentPage = () => {
        navigate("/student");
      };    
    
      const menuPage = () => {
        navigate("/menu");
      }

      const adminPage = () => {
        navigate("/admin");
      }

      const mainPage = () => {
        navigate("/mainpage");
      }

    return (
      <div className='body'>
       <div className='content'>
        <div className='btnArea'>
        <img className='img' src={LOGO}/>
            <a className="te">ID/PW는 연성대학교 홈페이지와 동일합니다.</a>
        <Card></Card>
        <Button type="primary" onClick={studentPage}>포장</Button>

        <Button type="primary" onClick={menuPage}>메뉴</Button>

        <Button type="primary" onClick={adminPage}>관리자</Button>

        <Button type="primary" onClick={mainPage}>메인</Button>
        </div>
    </div>
    
</div>
    )
}