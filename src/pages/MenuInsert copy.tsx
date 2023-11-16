import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { JSX } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ysuLogo from '../img/ysu_logo.jpg';
import { faPlus, faArrowLeft, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './MenuInsert.css';
import style from '../css/NewMenu.module.css'

export const MenuInsert = (): JSX.Element => {
  const navigate = useNavigate();

  const MainPage = () => {
    navigate("/");
  };

  const MenuListPage = () => {
    navigate("/adminmenu");
  };
  const [menu_name, setMenuName] = useState('');
  const [menu_corner, setMenuCorner] = useState('');
  const [menu_price, setMenuPrice] = useState<number>(0);
  const [menu_pack, setMenuPack] = useState<number>(0);
  const [menu_image, setMenuImage] = useState<File | null>(null);

  const handleAddToMenu = () => {
    const shouldInsert = window.confirm("메뉴를 추가하시겠습니까?");
    if (shouldInsert) {
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
      alert("메뉴가 추가되었습니다.");
      window.location.href = "/adminmenu";
    } else {
      alert("취소하였습니다.");
    }
  };


  return (
    <>
      <head>
        <script src="https://use.fontawesome.com/releases/v5.2.0/js/all.js"></script>
      </head>
      <body className={style.body}>
        <div id="head">
          <Link to="/adminmenu">
            <FontAwesomeIcon id="faArrowLeft" icon={faArrowLeft} />
          </Link>
          <img id="logo" src={ysuLogo} alt={"logo"} onClick={MenuListPage} />
          <Link to="./menuinsert">
            <FontAwesomeIcon id="faPlus" icon={faPlus} />
          </Link>
          <Link to="/">
            <FontAwesomeIcon id="faCartShopping" icon={faCartShopping} />
          </Link>
        </div>
        <div className={style.signupform}>
          {/* 제목 */}
          <div className={style.formheader}>
            <h1>메뉴등록</h1>
          </div>

          <div className={style.formbody}>
            {/* 메뉴이름 */}
            <div className={style.formgroup}>
              <label className={style.labeltitle}>메뉴이름*</label><br />
              <input id="email" className={style.forminput} placeholder="enter your email" />
            </div>

            {/* 메뉴가격 */}
            <div className={style.formgroup}>
              <label className={style.labeltitle}>메뉴가격*</label><br />
              <input id="email" className={style.forminput} placeholder="enter your email" />
            </div>

            {/* 코너종류 */}
            <div className={style.horizontalgroup}>
              <div className={style.formgroup}>
                <label className={style.labeltitle}>Gender:</label>
                <div className={style.inputgroup}>
                  <label id={style.male}><input type="radio" name="gender" value="male" id="male" /> Male</label>
                  <label id={style.female}><input type="radio" name="gender" value="female" id="female" /> Female</label>
                  <label id={style.female}><input type="radio" name="gender" value="female" id="female" /> Female</label>
                </div>
              </div>
            </div>
            {/* 포장가능유무 */}
            <div className={style.formgroup}>
              <label className={style.labeltitle}>Gender:</label>
              <div className={style.inputgroup}>
                <label id={style.male}><input type="radio" name="gender" value="male" id="male" /> Male</label>
                <label id={style.female}><input type="radio" name="gender" value="female" id="female" /> Female</label>
              </div>
            </div>

            {/* 이미지 사진 */}
            <div className={style.horizontalgroup}>
              <div className={style.formgroup}>
                <label className={style.labeltitle}>Upload Profile Picture</label><br />
                <input type="file" id={style.choosefile} />
              </div>
            </div>

            {/* 판매가능여부 */}
            <div className={style.formgroup}>
              <label className={style.labeltitle}>Gender:</label>
              <div className={style.inputgroup}>
                <label id={style.male}><input type="radio" name="gender" value="male" id="male" /> Male</label>
                <label id={style.female}><input type="radio" name="gender" value="female" id="female" /> Female</label>
              </div>
            </div>

            {/* 등록여부 */}
            <div className={style.formgroup}>
              <label className={style.labeltitle}>Gender:</label>
              <div className={style.inputgroup}>
                <label id={style.male}><input type="radio" name="gender" value="male" id="male" /> Male</label>
                <label id={style.female}><input type="radio" name="gender" value="female" id="female" /> Female</label>
              </div>
            </div>

            <div className={style.formfooter}>
              <button type="submit" className={style.btn}>등록</button>
            </div>

          </div>
        </div>
        <div className="menuDetail">
          <div className='content'>
            <div className='btnArea'>
              <form>
                <a>메뉴이름</a>
                <br />
                <input type="text"
                  placeholder="메뉴이름"
                  value={menu_name}
                  onChange={(e) => setMenuName(e.target.value)} />
                <br />

                <a>코너종류</a>
                <br />
                <label>B
                  <input
                    type="radio"
                    name="corner"
                    value="B"
                    onChange={(e) => setMenuCorner(e.target.value)} />
                </label>
                <label>S
                  <input
                    type="radio"
                    name="corner"
                    value="S"
                    onChange={(e) => setMenuCorner(e.target.value)} />
                </label>
                <label>F
                  <input
                    type="radio"
                    name="corner"
                    value="F"
                    onChange={(e) => setMenuCorner(e.target.value)} />
                </label>
                <br />

                <a>메뉴가격</a>
                <br />
                <input type="text"
                  placeholder="메뉴가격"
                  value={menu_price}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    const numericValue = Number(inputValue);

                    if (!isNaN(numericValue)) {
                      setMenuPrice(numericValue);
                    } else {
                      console.log("fail");
                    }
                  }} />
                <br />

                <a>포장가능여부</a>
                <br />
                <label>
                  <input type="radio"
                    name="pack"
                    value="1"
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      const numericValue = Number(inputValue);

                      if (!isNaN(numericValue)) {
                        setMenuPack(numericValue);
                      } else {
                        console.log("fail");
                      }
                    }} />O
                </label>
                <label>
                  <input type="radio"
                    name="pack"
                    value="0"
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      const numericValue = Number(inputValue);

                      if (!isNaN(numericValue)) {
                        setMenuPack(numericValue);
                      } else {
                        console.log("fail");
                      }
                    }} />X
                </label>
                <br />

                <a>메뉴이미지</a>
                <br />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setMenuImage(file);
                    }
                  }}
                />
                <br />
                <button type="button" onClick={handleAddToMenu}>메뉴추가</button>
              </form>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}
export default MenuInsert;