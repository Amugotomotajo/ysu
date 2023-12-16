import React from 'react';
import { Space } from 'antd';
import { JSX } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ysuLogo from '../img/ysu_logo.jpg';
import { BiArrowBack } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import { faPlus, faArrowLeft, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MStyle from '../css/Menu.module.css'
import style from '../css/AdminMenuInsert.module.css'
import WrongApproach from './WrongApproach';

export const AdminMenuInsert = (): JSX.Element => {
  const [menu_name, setMenuName] = useState('');
  const [menu_corner, setMenuCorner] = useState('');
  const [menu_price, setMenuPrice] = useState < number > (0);
  const [menu_pack, setMenuPack] = useState < number | 2 > (2);
  const [menu_image, setMenuImage] = useState < File | null > (null);
  const [menuNameError, setMenuNameError] = useState('');
  const [menuCornerError, setMenuCornerError] = useState('');
  const [menuPriceError, setMenuPriceError] = useState('');
  const [menuPackError, setMenuPackError] = useState('');
  const [menuImageError, setMenuImageError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const userDept = localStorage.getItem('user_dept');

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
    localStorage.removeItem('activeSection');

    setIsLoggedIn(false);

    // 로그인 페이지로 이동
    navigate('/login');
    window.alert("로그아웃 되었습니다.");
  };

  const handleBackClick = () => {
    navigate(-1);
  }

  

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
    openCheckModal();

  };

  const [checkModal, setCheckModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const openCheckModal = () => {
    setCheckModal(true);
  }


  const openModal = () => {
    setShowModal(true);

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
      axios.post('/adminmenu/menuinsert', formData, {
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
      console.error('Menu Insert Error:', error, formData);
    }

    const timeoutId = setTimeout(() => {

      setShowModal(false);
      localStorage.removeItem('activeSection');
      navigate('/adminmenu');
    }, 3000);

    // 컴포넌트가 언마운트되면 타이머를 클리어하여 메모리 누수를 방지
    return () => clearTimeout(timeoutId);
  };

  const closeChceckModal = () => {
    setCheckModal(false);
  }

  const closeModal = () => {
    setShowModal(false);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // 이미지를 Blob으로 변환
      const blobImage = await convertFileToBlob(file);
      // Blob을 File 객체로 생성
      const fileName = generateFileName(menu_name || "");
      const blobFile = new File([blobImage], fileName);

      setMenuImage(blobFile);
      setMenuImageError('');
    }
  };

  // 이미지 파일 이름 생성 함수
  const generateFileName = (menu_name: string) => {
    const sanitizedMenuName = menu_name.replace(/\s+/g, '_');
    const fileName = `${sanitizedMenuName}.jpg`;
    return fileName;
};

  const convertFileToBlob = (file: File): Promise<Blob> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const blob = new Blob([arrayBuffer], { type: file.type });
        resolve(blob);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <>
      <head>
        <script src="https://use.fontawesome.com/releases/v5.2.0/js/all.js"></script>
      </head>
      {userDept == 'admin' ? (
      <body className={MStyle.body}>
        <div id="head" className={MStyle.head}>
          <Link className={MStyle.link} to="/adminMenu">
            <BiArrowBack className={MStyle.faArrowLeft} />
          </Link>

          <img id="logo" className={MStyle.logo} src={ysuLogo} alt={"logo"} onClick={MenuListPage} />

          <Link to="/login" className={MStyle.link}>
            <MdLogout className={MStyle.faArrowRightFromBracket} onClick={handleLogout} style={{ color: 'transparent' }} />
          </Link>
        </div>
        <div className={style.pageHead}>
          메뉴 등록
        </div>

        <div className={style.signupform}>
          {/* 제목 */}
          {/* <div className={style.formheader}>
            <h1>메뉴 등록</h1>
            <hr className={style.hrline1}></hr>
          </div> */}

          <div className={style.formbody}>
            {/* 메뉴이름 */}
            <div className={style.formgroup}>
              <label className={style.labeltitle}>메뉴 이름</label><br />
              <input className={`${style.forminput} ${menuNameError ? style.error : ''}`} value={menu_name} placeholder="메뉴이름을 입력하세요."
                onChange={(e) => {
                  setMenuName(e.target.value);
                  setMenuNameError('');
                }} />
              {menuNameError && <p className={style.errorMsg}>{menuNameError}</p>}
            </div>


            {/* 코너종류 */}
            <div className={style.horizontalgroup}>
              <div className={style.formgroup}>
                <label className={style.labeltitle}>코너 종류</label>
                <div className={style.inputgroup}>
                  <label><input type="radio" name="corner" value="S" onChange={(e) => {
                    setMenuCorner(e.target.value);
                    setMenuCornerError(''); 
                  }} /> S</label>
                  <label><input type="radio" name="corner" value="B" onChange={(e) => {
                    setMenuCorner(e.target.value);
                    setMenuCornerError(''); 
                  }} /> B</label>
                  <label><input type="radio" name="corner" value="F" onChange={(e) => {
                    setMenuCorner(e.target.value);
                    setMenuCornerError(''); 
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
                  setMenuPriceError(''); 
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
                <input type="file" accept="image/*" onChange={(e) => handleImageChange(e)} />
                {menuImageError && <p className={style.errorMsg}>{menuImageError}</p>}
              </div>
            </div>
          </div>
          <hr className={style.hrline2}></hr>
          <div className={style.formfooter}>
            <button type="submit" className={style.btncancel} onClick={() => { handleBackClick(); }}>취소</button>
            <button type="submit" className={style.btninsert} onClick={() => { handleAddToMenu(); }}>등록</button>
          </div>
        </div>


        {/* 모달 창 */}
        {checkModal && (
          <div className={style.modal}>
            <div className={style.modalContent}>
              <span className={style.close} onClick={closeChceckModal}>&times;</span>
              <p>메뉴를 등록하시겠습니까?</p>
              <button type="submit" className={style.btncancel} onClick={closeChceckModal}>취소</button>
              <button type="submit" className={style.btninsert} onClick={openModal}>등록</button>
            </div>
          </div>
        )}


        {showModal && (
          <div className={style.modal}>
            <div className={style.modalContent}>
              <img src={require(`../img/${decodeURIComponent('InMenu.gif')}`)} />
              <p>메뉴를 추가하였습니다.</p>
            </div>
          </div>
        )}

      </body>

      ) : (
                   <WrongApproach />

                )}
    </>
  );
}
export default AdminMenuInsert;