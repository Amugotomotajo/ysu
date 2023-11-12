import React, { useState, useEffect } from 'react';
import style from './Login.module.css';
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

    useEffect(() => {
        console.log(sessionStorage.getItem('user_name'))
    }, [])
    const [userInfo, setUserInfo] = useState<{
        u_id: String,
        u_pw: String,
        u_name: String,
        u_dept: String
    }>();

    const handleLogin = (userId: string, password: string) => {
        const userInfoDTO = {
            u_id: userId,
            u_pw: password,
            u_name: null,
            u_dept: null
        };

        console.log(u_id);

        // 서버로 데이터를 보냄
        axios.post(`/user/${userId}`, userInfoDTO)
            .then((res) => {
                console.log(res);
                console.log("res.data.userId :: ", res.data.u_id);
                console.log("res.data.u_pw :: ", res.data.u_pw);
                console.log("res.data.u_name :: ", res.data.u_name);
                console.log("res.data.u_dept :: ", res.data.u_dept);
                if (res.data.u_id === userId && res.data.u_pw === password) {
                    // id, pw 모두 일치 userId = userId1, msg = undefined
                    console.log("======================", "로그인 성공");
                    sessionStorage.setItem("user_id", userId);
                    sessionStorage.setItem("user_name", res.data.u_name);
                    sessionStorage.setItem("user_dept", res.data.u_dept);
                    if (res.data.u_dept === "admin") {
                        navigate('/AdminPage', {
                            state: {
                                u_id: userId,
                                u_name: res.data.u_name,
                                u_dept: res.data.u_dept
                            }
                        });
                    } else {
                        navigate('/Menu', {
                            state: {
                                u_id: userId,
                                u_name: res.data.u_name,
                                u_dept: res.data.u_dept
                            }
                        });
                    }
                } else if (password != res.data.pwd) {
                    // id는 있지만, pw 는 다른 경우 userId = null , msg = undefined
                    console.log(
                        "======================",
                        "입력하신 아이디나 비밀번호가 일치하지 않습니다."
                    );
                    window.alert("입력하신 아이디나 비밀번호가 일치하지 않습니다.");
                }
                // // 작업 완료 되면 페이지 이동(새로고침)
                // document.location.href = "/";
            })
            .catch(() => {
                window.alert("입력하신 아이디나 비밀번호가 일치하지 않습니다.");
            });
    };

    return (
        <>
            <body id={style.loginDiv}>
                <div className={style.loginWrapper}>
                    <div id={style.loginForm}>
                        <h2 id={style.loginH2}>Login</h2>
                        <input type="text" name="userName" placeholder="Email" value={u_id} onChange={(e) => setUid(e.target.value)} />
                        <input type="password" name="userPassword" placeholder="Password" value={u_pw} onChange={(e) => setUpw(e.target.value)} />
                        {/* <label htmlFor="remember-check">
                            <input type="checkbox" id={style['remember-check']} />아이디 저장하기
                        </label> */}
                        <input type="submit" value="Login" onClick={() => handleLogin(u_id, u_pw)} />
                    </div>
                </div>
            </body>
        </>
    );
}

export default Login;