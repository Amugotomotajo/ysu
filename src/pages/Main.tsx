import React from 'react';
import { Link } from 'react-router-dom';
import style from '../css/Main.module.css';
import loginStyle from '../Login.module.css';
import ysuLogo from '../L_img/ysu_logo2.png';


export const Main = (): JSX.Element => (
    
  <>
    <div className={style.logoDiv}>
      <img id="logo" className={style.logo} src={ysuLogo} alt={"logo"} />
      <Link to="/Login">
        <button>로그인</button>
      </Link>
    </div>
    <div className={style.backGround}>
      <div className={style.mainBox}>
        {/* <img src={require(`./img/ysu_emblem.jpg`)} alt="로고" loading="lazy" /> */}
        <h1>연성대학교 학식 주문 시스템</h1>
      <Link to="https://www.yeonsung.ac.kr/ko/cms/FR_CON/index.do?MENU_ID=850&CONTENTS_NO=1">
        <button>학식 메뉴 보러 가기</button>
      </Link>
      </div>
      
    </div>
  </>
);

export default Main;

