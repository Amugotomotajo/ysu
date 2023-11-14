
import { BsHandbagFill } from "react-icons/bs"
import { MdOutlineRestaurant } from "react-icons/md"
import { Link } from 'react-router-dom';
import { JSX } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
// import './main.css'


export const MainPage = (): JSX.Element => {
    const navigate = useNavigate();

    const Mainpage = () => {
        navigate("/");
    };

    const [admin, setAdmin] = useState([]);
    

    return (
        <div className='body'>

            <div className='content'>

                <div className='btnArea'>


                    <Link to='/cafeteria'>
                        <button className='cfBtn'> <MdOutlineRestaurant /> 학생식당 </button> </Link>

                    <Link to='/packaging'>
                        <button className='pkBtn'> <BsHandbagFill />  포장주문 </button> </Link>
                </div>

            </div>

        </div>
    )
}

export default MainPage;