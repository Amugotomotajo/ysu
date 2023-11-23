import React, { useState, useEffect } from 'react';
import style from '../css/Login.module.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import ysuLogo from '../L_img/ysu_logo2.png';

export const Login = (): JSX.Element => {
    const [u_id, setUid] = useState(""); // 사용자 ID 상태
    const [u_pw, setUpw] = useState(""); // 메뉴 ID 상태 (숫자)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(["rememberUserId"]);
    const [isRemember, setIsRemember] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(localStorage.getItem('user_name'));
        const storedInformation = localStorage.getItem("isLoggedIn");

        if (storedInformation) {
            setIsLoggedIn(true);
        }
        console.log(cookies.rememberUserId);

        if (cookies.rememberUserId !== undefined) {
            setUid(cookies.rememberUserId);
            setIsRemember(true);
        }

    }, [cookies.rememberUserId])

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsRemember(e.target.checked);
        if (e.target.checked) {
            setCookie('rememberUserId', u_id, { maxAge: 2000 });
        } else {
            removeCookie('rememberUserId');
        }
    };

    const [userInfo, setUserInfo] = useState<{
        u_id: String,
        u_pw: String,
        u_name: String,
        u_dept: String
    }>();

    const MainPage = () => {
        navigate('/');
    }

    const handleLogin = (userId: string, password: string) => {
        const userInfoDTO = {
            u_id: userId,
            u_pw: password,
            u_name: null,
            u_dept: null
        };

        localStorage.setItem("isLoggedIn", "LOGGED_IN");
        setIsLoggedIn(true);

        // 서버로 데이터를 보냄
        axios.post(`/user/${userId}`, userInfoDTO)
            .then((res) => {
                console.log(res);
                console.log("res.data.userId :: ", res.data.u_id);
                console.log("res.data.u_pw :: ", res.data.u_pw);
                console.log("res.data.u_name :: ", res.data.u_name);
                console.log("res.data.u_dept :: ", res.data.u_dept);

                if (res.data.u_id == userId && res.data.u_pw == password) {
                    // id, pw 모두 일치 userId = userId1, msg = undefined
                    console.log("======================", "로그인 성공");
                    localStorage.setItem("user_id", userId);
                    localStorage.setItem("user_name", res.data.u_name);
                    localStorage.setItem("user_dept", res.data.u_dept);
                    if (res.data.u_id === "admin") {
                        navigate('/adminmain', {
                            state: {
                                u_id: userId,
                                u_name: res.data.u_name,
                                u_dept: res.data.u_dept
                            }
                        });
                        window.alert("관리자님 반갑습니다.");
                    } else {
                        navigate('/adminmenu', {
                            state: {
                                u_id: userId,
                                u_name: res.data.u_name,
                                u_dept: res.data.u_dept
                            }
                        });
                        window.alert(res.data.u_name + "님 반갑습니다.");
                    }
                } else if (password != res.data.pwd) {
                    // id는 있지만, pw 는 다른 경우 userId = null , msg = undefined
                    console.log(
                        "======================",
                        "입력하신 아이디나 비밀번호가 일치하지 않습니다."
                    );
                    window.alert("입력하신 아이디나 비밀번호가 일치하지 않습니다.");
                }
            })
            .catch(() => {
                window.alert("입력하신 아이디나 비밀번호가 일치하지 않습니다.");
                console.log(userInfoDTO);
            });
    };

    return (
        <>
            <body className={style.bodyCSS}>
                <div className={style.logoDiv}>
                    <img id="logo" className={style.logo} src={ysuLogo} alt={"logo"} onClick={MainPage} />
                </div>
                <div id={style.loginDiv}>
                    <div className={style.loginWrapper}>
                        <div id={style.loginForm}>
                            <h2 id={style.loginH2}>Login</h2>
                            <input type="text" name="userName" placeholder="아이디" value={u_id} onChange={(e) => {
                                setUid(e.target.value);
                            }} />
                            <input type="password" name="userPassword" placeholder="비밀번호" value={u_pw} onChange={(e) => setUpw(e.target.value)} />

                            <label htmlFor="saveId">
                                <input
                                    type="checkbox"
                                    className="saveId-cb"
                                    id="saveId"
                                    name="saveId"
                                    onChange={(e) => {
                                        handleOnChange(e);
                                    }}
                                checked={isRemember}
                                />{" "}
                                아이디 저장하기
                            </label>
                            <input type="submit" value="Login" onClick={() => handleLogin(u_id, u_pw)} />
                        </div>
                    </div>
                </div>
            </body>
        </>
    );
}

export default Login;