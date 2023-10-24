import { JSX } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { Button, Card, List } from 'antd';
import { useNavigate } from 'react-router-dom';

export const AdminPage =  ():JSX.Element => {
    const navigate = useNavigate();

    const Mainpage = () => {
        navigate("/");
        };  

    const [admin, setAdmin] = useState([]);

    const MenuInsertpage = () => {
      navigate("/admin/menuinsert");
      };  
    
    useEffect(() => {
        // fetch(url, options) : Http 요청 함수
        axios.get("/admin").then((res) => {
          setAdmin(res.data)
        console.log(res)
        })
    },[])
  
  return (
    <body>
    <div className="App">
      <Card>관리자<Button type="primary" onClick={Mainpage}>home</Button></Card>
        <List>
          <td>관리자 계정</td>
          {admin.map(admin => (
            <List.Item key={admin['admin_id']}>
              <List.Item>{admin['admin_id']}</List.Item>
              <List.Item>{admin['admin_pw']}</List.Item>
              <List.Item>({admin['admin_name']})</List.Item>
            </List.Item>
          ))}
        </List>
        <Button type="primary" onClick={MenuInsertpage}>메뉴등록</Button>
    </div>
    </body>
  );
}

 