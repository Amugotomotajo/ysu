import { JSX } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { Button, Card, List } from 'antd';
import { useNavigate } from 'react-router-dom';

export const StudentListPage = (): JSX.Element => {
  const navigate = useNavigate();

  const Mainpage = () => {
    navigate("/");
  };

  const [students, setStudents] = useState([]);


  useEffect(() => {
    // fetch(url, options) : Http 요청 함수
    axios.get("/student").then((res) => {
      setStudents(res.data)
      console.log(res)
    })
  }, [])

  return (
    <div className="App">
      <Card>학생<Button type="primary" onClick={Mainpage}>home</Button></Card>
      <List>
        {students.map(student => (
          <List.Item key={student['u_id']}>
            <List.Item>{student['u_id']}</List.Item>
            <List.Item>{student['u_pw']}</List.Item>
            <List.Item>({student['u_name']})</List.Item>
            <List.Item>({student['u_dept']})</List.Item>
          </List.Item>
        ))}
      </List>
    </div>
  );
}
