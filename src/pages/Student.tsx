import { Route, Routes } from 'react-router-dom';
import { JSX } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';
import axios from 'axios'

export const Student =  ():JSX.Element => {
  const [students, setStudents] = useState<{ stu_id: number, stu_name:string, stu_department:string }[]>([]);


  useEffect(() => {
    // fetch(url, options) : Http 요청 함수
    axios.get("/student").then((res) => {
      setStudents(res.data)
    })
  },[])


  const var1 = Object(students)[2]
  const s_id = var1.stu_name
  console.log(s_id)
  
  return (
    <>   
    <div className="App">
      <h1>내 이름은 {s_id}</h1>
      <p></p>
      {students.map((student, index) => (
      <li key={index}>{student.stu_id}</li>
      ))}
      {students.map((student, index) => (
      <li key={index}>{student.stu_name}</li>
      ))}
      {students.map((student, index) => (
      <li key={index}>{student.stu_department}</li>
      ))}
    </div>

    </>
  );
}

export default Student;
 