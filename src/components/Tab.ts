import styled from "styled-components";

export const TabMenu = styled.li`
  background-color: #dcdcdc;
  color: rgb(232, 234, 237);
  font-weight: bold;
   display: flex;
  //flex-direction: row;
  align-items: center;
  list-style: none;
  margin-bottom: -50px;
  margin-top: -2px;
  text-align: center;
  align-items: center;

  @media screen and (max-width: 700px){
    margin-top: -11px;
  }

  .submenu {
  // 기본 Tabmenu 에 대한 CSS를 구현
    //display: flex;
    justify-content: space-between;
    // heigth: 30px;
    width: calc(100% /2);
    padding: 15px;
    font-size: 18px;
    transition: 0.6s;
    border-radius: 0px 0px 0px 0px;
    display: inline-block;
  }

  .focused {
   //선택된 Tabmenu 에만 적용되는 CSS를 구현
    background-color: rgb(255,255,255);
    color: rgb(21,20,20);
  }

  & div.desc {
    text-align: center;
  }
`;

export const Desc = styled.div`
  text-align: center;
`;

