import { JSX } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { Button, Card, List } from 'antd';
import { useNavigate } from 'react-router-dom';

export const MenuListPage =  ():JSX.Element => {
    const navigate = useNavigate();

    const Mainpage = () => {
      navigate("/");
      };  
        
    const MenuInsertpage = () => {
      navigate("/menu/menuinsert");
      };  

    const MenuUpdatepage = () => {
      navigate("/menu/menuupdate");
      };  

    const MenuDeletepage = () => {
      navigate("/menu/menudelete");
      };  
    const [menu, setMenu] = useState([]);


    
    useEffect(() => {
        // fetch(url, options) : Http 요청 함수
        axios.get("/menu").then((res) => {
          setMenu(res.data)
        console.log(res)
        })
    },[])

  return (
    <body>
    <div className="App">
      <Card>메뉴<Button type="primary" onClick={Mainpage}>home</Button></Card>
      <Button type="primary" onClick={MenuInsertpage}>메뉴추가</Button>
      <Button type="primary" onClick={MenuUpdatepage}>메뉴수정</Button>
      <Button type="primary" onClick={MenuDeletepage}>메뉴삭제</Button>
        <List>
          {menu.map(menu => (
            <List.Item key={menu['menu_id']}>
              <List.Item>{menu['menu_id']}</List.Item>
              <List.Item>{menu['menu_name']}</List.Item>
              <List.Item>({menu['menu_corner']})</List.Item>
              <List.Item>({menu['menu_price']})</List.Item>
              <List.Item>({menu['menu_pack']})</List.Item>
              <List.Item> <img className='M_Img' src={require(`../img/${decodeURIComponent(menu['menu_image'])}`)} alt={menu['menu_name']} /></List.Item>
              <List.Item>({menu['menu_sales']})</List.Item>
              <List.Item>({menu['menu_regist']})</List.Item>
            </List.Item>
          ))}
        </List>
    </div>
    </body>
  );
}

 