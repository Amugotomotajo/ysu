import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export const Menu = (): JSX.Element => {

    const [sections, setSections] = useState<{
        menu_num: number,
        menu_name: string,
        menu_corner: string,
        menu_price: number,
        menu_pack: number,
        menu_image: string,
        menu_sales: number,
        menu_regist: number
    }[]>([]);

    useEffect(() => {
        axios.get("/cart").then((res) => {
            setSections(res.data)
            console.log(res)
        })
    }, [])


    return (
        <>
        
        </>
    );
}

export default Menu;