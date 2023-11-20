import { JSX } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom';
import style from '../css/UserList.module.css';
import { faArrowLeft, faPlus, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import ysuLogo from '../img/ysu_logo.jpg';
import Select from "react-select"

export const UsertListPage = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('S');
  const [menu_id, setMenuId] = useState<number>(0); // 메뉴 ID 상태 (숫자)
  const [sections, setSections] = useState<{
    u_id: string,
    u_pw: string,
    u_name: string,
    u_dept: string
  }[]>([]);

  const userId = sessionStorage.getItem("user_id");
  const userName = sessionStorage.getItem("user_name");
  const userDept = sessionStorage.getItem("user_dept")

  const [originalSections, setOriginalSections] = useState<{
    u_id: string,
    u_pw: string,
    u_name: string,
    u_dept: string
  }[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get("/user").then((res) => {
      setSections(res.data);
      setOriginalSections(res.data);
      console.log(res);
    })
  }, [])

  const MainPage = () => {
    navigate("/");
  };

  const handleSectionClick = (section: string) => {
    setActiveSection(section);
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    // 세션 초기화
    sessionStorage.setItem("user_id", '');
    sessionStorage.setItem("user_name", '');
    sessionStorage.setItem("user_dept", '');

    // 로그인 페이지로 이동
    navigate('/');
  };

  const options = [
    {
        label: '학과', options: [
            { value: 'elect', label: '전기과' },
            { value: 'jungbo', label: '정보통신과' },
            { value: 'comso', label: '컴퓨터소프트웨어과' }
        ]
    }
]


  const handleOptionChange = (selectedOption: any) => {
    if (selectedOption && selectedOption.value === 'elect') {
        // 판매가능메뉴확인이 선택되었을 때, menu_pack 1인 메뉴만 필터링
        const filteredSections = originalSections.filter(section => section.u_dept === '전기과');
        setSections(filteredSections);
        console.log(filteredSections);
    }
    else if (selectedOption && selectedOption.value === 'jungbo') {
        // 판매가능메뉴확인이 선택되었을 때, menu_pack 0인 메뉴만 필터링
        const filteredSections = originalSections.filter(section => section.u_dept === '정보통신과');
        setSections(filteredSections);
        console.log(filteredSections);
    }
    else if (selectedOption && selectedOption.value === 'comso') {
        // 판매가능메뉴확인이 선택되었을 때, menu_sales 1인 메뉴만 필터링
        const filteredSections = originalSections.filter(section => section.u_dept === '컴퓨터소프트웨어학과');
        setSections(filteredSections);
        console.log(filteredSections);
    }
     else {
        // 다른 옵션이 선택되었을 때, 모든 메뉴를 보여줌
        setSections(originalSections);
    }
};


  return (
    <>

      <head>
        <script src="https://use.fontawesome.com/releases/v5.2.0/js/all.js"></script>
      </head>
      <body className={style.body}>
        <div>
          <div id="head" className={style.head}>
            <Link className={style.link} to="/">
              <FontAwesomeIcon id="faArrowLeft" icon={faArrowLeft} className={style.faArrowLeft} />
            </Link>
            <Link className={style.link} to="">
              <FontAwesomeIcon id="faArrowRightFromBracket" className={style.faArrowRightFromBracket} icon={faArrowRightFromBracket} style={{ color: 'transparent' }} />
            </Link>

            <img id="logo" className={style.logo} src={ysuLogo} alt={"logo"} onClick={MainPage} />
            <Link to="/" className={style.link} onClick={handleLogout}>
              <FontAwesomeIcon id="faArrowRightFromBracket" icon={faArrowRightFromBracket} className={style.faArrowRightFromBracket} />
            </Link>
            <Link className={style.link} to="./menuinsert">
              <FontAwesomeIcon id="faPlus" icon={faPlus} className={style.faPlus} />
            </Link>

          </div>
          <nav className={style.nav}>
            <ul className={style.ul}>
            </ul>
          </nav>
        </div>

        <div className={style.selectMenu}>
          <div className={style.MainpriceIcons}>
            <span className={style.MainredCircle} /><a className={style.CircleText}>포장가능메뉴</a>
            <span className={style.MainblueCircle} /><a className={style.CircleText}>등록메뉴</a>
            <Select options={options} className={style.selectoption} onChange={handleOptionChange} />
          </div>
        </div>

        <div className={style.menuList} >
          {sections.map((section, idx) => (
            <>
            <button>
              <hr id="menuHr" className={style.menuHr}></hr>
              <div className={style.menuInfo}>
                <div className={style.menuName}>이름 : {section['u_name']}</div>
                <div className={style.menuPrice}>학번 : {section['u_id']}</div>
                <div className={style.menuPrice}>학과 : {section['u_dept']}</div>
                <div className={style.menuPrice}>이름 : {section['u_pw']}</div>
              </div>
            </button>
            </>
          ))}
        </div>
      </body >
    </>
  );
}
