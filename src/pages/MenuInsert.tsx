import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { JSX } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ysuLogo from '../L_img/ysu_logo.jpg';
import { faPlus, faArrowLeft, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from '../css/MenuInsert.module.css'

export const MenuInsert = (): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const MainPage = () => {
    navigate("/");
  };

  const MenuListPage = () => {
    navigate("/adminmain");
  };

  const handleLogout = () => {
    // 세션 초기화
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_dept");
    localStorage.removeItem("isLoggedIn");

    setIsLoggedIn(false);

    // 로그인 페이지로 이동
    navigate('/login');
    window.alert("로그아웃 되었습니다.");
  };

  const handleBackClick = () => {
    navigate(-1);
  }

  const [menu_name, setMenuName] = useState('');
  const [menu_corner, setMenuCorner] = useState('');
  const [menu_price, setMenuPrice] = useState<number>(0);
  const [menu_pack, setMenuPack] = useState<number | 2>(2);
  const [menu_image, setMenuImage] = useState<File | null>(null);
  const [menuNameError, setMenuNameError] = useState('');
  const [menuCornerError, setMenuCornerError] = useState('');
  const [menuPriceError, setMenuPriceError] = useState('');
  const [menuPackError, setMenuPackError] = useState('');
  const [menuImageError, setMenuImageError] = useState('');

  const handleAddToMenu = async () => {
    setMenuNameError('');
    setMenuCornerError('');
    setMenuPriceError('');
    setMenuPackError('');
    setMenuImageError('');

    let hasError = false;

    if (!menu_name) {
      setMenuNameError('메뉴 이름을 입력하세요.');
      hasError = true;  // 에러 발생 시 플래그 설정
    }
  
    if (!menu_corner) {
      setMenuCornerError('코너 종류를 선택하세요.');
      hasError = true;
    }
  
    if (menu_price <= 0) {
      setMenuPriceError('메뉴 가격을 입력하세요.');
      hasError = true;
    }
  
    if (menu_pack === 2) {
      setMenuPackError('포장가능여부를 선택하세요.');
      hasError = true;
    }
  
    if (!menu_image) {
      setMenuImageError('이미지를 선택하세요.');
      hasError = true;
    }

    if (hasError) {
      return;
    }
      // FormData 객체 생성
      const formData = new FormData();

      // 폼 데이터에 필드 추가
      formData.append('menu_name', menu_name);
      formData.append('menu_corner', menu_corner);
      formData.append('menu_price', menu_price.toString());
      formData.append('menu_pack', menu_pack.toString());
      if (menu_image) {
        // 이미지 파일 추가 (menu_image)
        formData.append('menu_image', menu_image);
      }

      // Axios를 사용하여 서버로 폼 데이터를 보냄
      try {
        await axios.post('/adminmenu/menuinsert', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // 폼 데이터로 보냄
          },
        })
          .then(response => {
            console.log('Data inserted successfully', response.data, formData);
          })
          .catch(error => {
            console.error('Failed to insert data', error, formData);
          });
      } catch (error) {
        console.error('메뉴 업데이트 오류:', error, formData);
      }
  };

  const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);

        const timeoutId = setTimeout(() => {
            setShowModal(false);
            navigate('/adminmenu');
        }, 3000);

        // 컴포넌트가 언마운트되면 타이머를 클리어하여 메모리 누수를 방지
        return () => clearTimeout(timeoutId);
    };

    const closeModal = () => {
        setShowModal(false);
    };


  return (
    <>
      <head>
        <script src="https://use.fontawesome.com/releases/v5.2.0/js/all.js"></script>
      </head>
      <body className={style.body}>
        <div id="head" className={style.head}>
          <Link className={style.link} to="/adminmenu">
            <FontAwesomeIcon id="faArrowLeft" icon={faArrowLeft} className={style.faArrowLeft} />
          </Link>
          <Link className={style.link} to="">
            <FontAwesomeIcon id="faArrowRightFromBracket" className={style.faArrowRightFromBracket} icon={faArrowRightFromBracket} style={{ color: 'transparent' }} />
          </Link>

          <img id="logo" className={style.logo} src={ysuLogo} alt={"logo"} onClick={MenuListPage} />
          <Link to="/" className={style.link}>
            <FontAwesomeIcon id="faArrowRightFromBracket" icon={faArrowRightFromBracket} className={style.faArrowRightFromBracketopacity} />
          </Link>
          <Link to="/login" className={style.link}>
            <FontAwesomeIcon id="faArrowRightFromBracket" icon={faArrowRightFromBracket} className={style.faArrowRightFromBracket} onClick={handleLogout} />
          </Link>
        </div>
        <div className={style.signupform}>
          {/* 제목 */}
          <div className={style.formheader}>
            <h1>메뉴등록</h1>
            <hr className={style.hrline1}></hr>
          </div>

          <div className={style.formbody}>
            {/* 메뉴이름 */}
            <div className={style.formgroup}>
              <label className={style.labeltitle}>메뉴이름</label><br />
              <input className={`${style.forminput} ${menuNameError ? style.error : ''}`} value={menu_name} placeholder="메뉴이름을 입력하세요."
              onChange={(e) => {
                  setMenuName(e.target.value);
                  setMenuNameError(''); // 에러 메시지 초기화
                }}/>
                 {menuNameError && <p className={style.errorMsg}>{menuNameError}</p>}
            </div>


            {/* 코너종류 */}
            <div className={style.horizontalgroup}>
              <div className={style.formgroup}>
                <label className={style.labeltitle}>코너종류</label>
                <div className={style.inputgroup}>
                  <label><input type="radio" name="corner" value="S" onChange={(e) => {
                        setMenuCorner(e.target.value);
                        setMenuCornerError(''); // 에러 메시지 초기화
                      }} /> S</label>
                  <label><input type="radio" name="corner" value="B" onChange={(e) => {
                        setMenuCorner(e.target.value);
                        setMenuCornerError(''); // 에러 메시지 초기화
                      }} /> B</label>
                  <label><input type="radio" name="corner" value="F" onChange={(e) => {
                        setMenuCorner(e.target.value);
                        setMenuCornerError(''); // 에러 메시지 초기화
                      }} /> F</label>
                </div>
                {menuCornerError && <p className={style.errorMsg}>{menuCornerError}</p>}
              </div>
              
            </div>

            {/* 메뉴가격 */}
            <div className={style.formgroup}>
              <label className={style.labeltitle}>메뉴가격</label><br />
              <input className={`${style.forminput} ${menuPriceError ? style.error : ''}`} value={menu_price === 0 ? '' : menu_price} placeholder="메뉴가격을 입력하세요." onChange={(e) => {
                const inputValue = e.target.value;
                const numericValue = Number(inputValue);

                if (!isNaN(numericValue)) {
                  setMenuPrice(numericValue);
                  setMenuPriceError(''); // 에러 메시지 초기화
                }
              }}
            />
            {menuPriceError && <p className={style.errorMsg}>{menuPriceError}</p>}
          </div>

            {/* 포장가능유무 */}
            <div className={style.horizontalgroup}>
              <div className={style.formgroup}>
                <label className={style.labeltitle}>포장가능여부</label>
                <div className={style.inputgroup}>
                  <label id={style.male}><input type="radio" name="pack" value="1" onChange={(e) => {
                    const inputValue = e.target.value;
                    const numericValue = Number(inputValue);

                    if (!isNaN(numericValue)) {
                      setMenuPack(numericValue);
                      setMenuPackError('');
                    }
                  }} /> O</label>
                  <label id={style.female}><input type="radio" name="pack" value="0" onChange={(e) => {
                    const inputValue = e.target.value;
                    const numericValue = Number(inputValue);

                    if (!isNaN(numericValue)) {
                      setMenuPack(numericValue);
                      setMenuPackError('');
                    }
                  }} /> X</label>
                </div>
                {menuPackError && <p className={style.errorMsg}>{menuPackError}</p>}
              </div>
            </div>

            {/* 이미지 사진 */}
            <div className={style.horizontalgroup}>
              <div className={style.formgroup}>
                <label className={style.labeltitle}>메뉴이미지</label><br />
                <input type="file" accept="image/*" onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setMenuImage(file);
                    setMenuImageError('');
                    }
                }} />
                 {menuImageError && <p className={style.errorMsg}>{menuImageError}</p>}
              </div>
            </div>


            <hr className={style.hrline2}></hr>
          </div>
          <div className={style.formfooter}>
            <button type="submit" className={style.btncancel} onClick={() => { handleBackClick();}}>취소</button>
            <button type="submit" className={style.btninsert} onClick={() => { handleAddToMenu();}}>등록</button>
          </div>
        </div>

        {/* 모달 창 */}
        {showModal && (
                <div className={style.modal}>
                    <div className={style.modalContent}>
                        <span className={style.close} onClick={closeModal}>&times;</span>
                        <img src={require(`../img/${decodeURIComponent('InMenu.gif')}`)} />
                        <p>메뉴를 추가하였습니다.</p>
                    </div>
                </div>
            )}

      </body>
    </>
  );
}
export default MenuInsert;