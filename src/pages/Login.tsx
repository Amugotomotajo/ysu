import React, { useState, useEffect } from 'react';
import './Login.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const Login = (): JSX.Element => {
    const [u_id, setUid] = useState(""); // 사용자 ID 상태
    const [u_pw, setUpw] = useState(""); // 메뉴 ID 상태 (숫자)
    const location = useLocation();
    const navigate = useNavigate();
    const [section, setSection] = useState<{
        menu_id: number,
        menu_name: string,
        menu_corner: string,
        menu_price: number,
        menu_pack: number,
        menu_image: string,
        menu_sales: number,
        menu_regist: number
    }>();

    const handleLogin = (userId: string, password: string) => {
        const userInfoDTO = {
            u_id: userId,
            u_pw: password
        };

        console.log(u_id);

        // 서버로 데이터를 보냄
        axios.post(`/user/${userId}`, userInfoDTO)
            .then((res) => {
                console.log(res);
                console.log("res.data.userId :: ", res.data.u_id);
                console.log("res.data.msg :: ", res.data.msg);
                if (res.data.u_id === undefined) {
                    // id 일치하지 않는 경우 userId = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
                    console.log("======================", res.data.msg);
                    alert("입력하신 id 가 일치하지 않습니다.");
                } else if (res.data.u_id === null) {
                    // id는 있지만, pw 는 다른 경우 userId = null , msg = undefined
                    console.log(
                        "======================",
                        "입력하신 비밀번호 가 일치하지 않습니다."
                    );
                    alert("입력하신 비밀번호 가 일치하지 않습니다.");
                } else if (res.data.u_id === userId && res.data.u_pw === password) {
                    // id, pw 모두 일치 userId = userId1, msg = undefined
                    console.log("======================", "로그인 성공");
                    sessionStorage.setItem("user_id", userId); // sessionStorage에 id를 user_id라는 key 값으로 저장
                    navigate('/Menu', {
                        state: {
                            u_id: userId
                        }
                    });

                }
                // // 작업 완료 되면 페이지 이동(새로고침)
                // document.location.href = "/";
            })
            .catch();
    };

    return (
        <>
            <body>
                <div className="login-wrapper">
                    <h2>Login</h2>
                    <input type="text" name="userName" placeholder="Email" value={u_id} onChange={(e) => setUid(e.target.value)} />
                    <input type="password" name="userPassword" placeholder="Password" value={u_pw} onChange={(e) => setUpw(e.target.value)} />
                    <label htmlFor="remember-check">
                        <input type="checkbox" id="remember-check" />아이디 저장하기
                    </label>
                    <input type="submit" value="Login" onClick={() => handleLogin(u_id, u_pw)} />
                </div>
            </body>
        </>
    );
}

export default Login;