import { Button, Card } from "antd"
import { useNavigate } from "react-router-dom";
import { BsHandbagFill } from "react-icons/bs"
import { MdOutlineRestaurant } from "react-icons/md"
import { Link } from 'react-router-dom';
import { faArrowLeft, faPlus, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from '../css/main.module.css'
import ysuLogo from '../img/ysu_logo.jpg';
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { FaUser } from "react-icons/fa"
import { PiNoteLight } from "react-icons/pi";


export const AdminMainPage = (): JSX.Element => {
  const navigate = useNavigate();

  const studentPage = () => {
    navigate("/student");
  };

  const menuPage = () => {
    navigate("/adminmenu");
  }

  const adminPage = () => {
    navigate("/admin");
  }

  const mainPage = () => {
    navigate("/mainpage");
  }

  const handleLogout = () => {
    // 세션 초기화
    sessionStorage.setItem("user_id", '');
    sessionStorage.setItem("user_name", '');
    sessionStorage.setItem("user_dept", '');

    // 로그인 페이지로 이동
    navigate('/');
  };
  return (
<body className={style.bodymain}>
<div id="head" className={style.head}>
        <Link className={style.link} to="/">
          <FontAwesomeIcon id="faArrowLeft" icon={faArrowLeft} className={style.faArrowLeft} />
        </Link>
        <Link className={style.link} to="">
          <FontAwesomeIcon id="faArrowRightFromBracket" className={style.faArrowRightFromBracket} icon={faArrowRightFromBracket} style={{ color: 'transparent' }} />
        </Link>
        <img id="logo" className={style.logo} src={ysuLogo} alt={"logo"} />
        <Link to="/" className={style.linkicon} onClick={handleLogout}>
          <FontAwesomeIcon id="faArrowRightFromBracket" icon={faArrowRightFromBracket} className={style.faArrowRightFromBracket} />
        </Link>
        <Link to="/" className={style.link} onClick={handleLogout}>
          <FontAwesomeIcon id="faArrowRightFromBracket" icon={faArrowRightFromBracket} className={style.faArrowRightFromBracket} />
        </Link>
      </div>
    <div className={style.container}>
        <div className={style.card}>
            <div className={style.circle}>
                <h2><FaUser /></h2>
            </div>
            <div className={style.content}>
                <a  onClick={studentPage}>사용자 관리</a>
             </div>
        </div>
        <div className={style.card}>
            <div className={style.circle}>
                <h2><MdOutlineRestaurantMenu /></h2>
            </div>
            <div className={style.content}>
                <a onClick={menuPage}>메뉴 관리</a>
             </div>
 
        </div>
        <div className={style.card}>
            <div className={style.circle}>
                <h2><PiNoteLight /></h2>
            </div>
            <div className={style.content}>
                <a onClick={mainPage}>리뷰 관리</a>
            </div>
        </div>
    </div> 
    
</body>
  )
}

export default AdminMainPage;