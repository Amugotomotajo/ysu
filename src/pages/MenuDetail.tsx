import React, { useState, useEffect } from 'react';
import style from '../css/MenuDetail.module.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ysuLogo from '../img/ysu_logo.jpg';

export const MenuDetail = (): JSX.Element => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
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
    const [selectedImage, setSelectedImage] = useState<File | null>(null); // 추가: 선택한 이미지 파일을 저장

    const MainPage = () => {
        navigate("/");
    };

    const MenuListPage = () => {
        navigate("/adminmenu");
    };

    useEffect(() => {
        const menuId = location.state && location.state.menu_id;
        if (menuId !== undefined) {
            // menu_id가 정의되어 있으면 해당 메뉴 데이터를 가져옵니다.
            axios.get(`/adminmenu/menudetail/${menuId}`)
                .then((res) => {
                    setSection(res.data);
                    console.log(res);
                })
                .catch((error) => {
                    console.error('Failed to fetch menu data', error);
                });
        }
    }, [location.state]);

    const handleBackClick = () => {
        const shouldBack = window.confirm("메뉴 수정을 취소하시겠습니까?");
        if (shouldBack) {
            alert("메뉴 수정이 취소되었습니다.");
            window.location.href = "/adminmenu";
        } else {
            alert("취소하였습니다.");
        }
    };

    const handleUpdateFormClick = () => {
        setIsEditing(true);
    }

    const handleImageChangeAndSubmit = () => {
        const shouldUpdate = window.confirm("메뉴를 수정하시겠습니까?");
        if (shouldUpdate) {
        // 서버로 데이터를 전송하기 위한 FormData 객체를 생성
        const formData = new FormData();
        formData.append('menu_name', section!.menu_name);
        formData.append('menu_corner', section!.menu_corner);
        formData.append('menu_price', section!.menu_price.toString());
        formData.append('menu_pack', section!.menu_pack.toString());
        formData.append('menu_sales', section!.menu_sales.toString());
        formData.append('menu_regist', section!.menu_regist.toString());
        // 이미지 파일이 선택된 경우 FormData에 추가
        if (selectedImage) {
            formData.append('menu_image', selectedImage || "");
        }else {
            // 이미지 파일이 선택되지 않은 경우, 기존 이미지 파일명을 서버에 전달
            formData.append('menu_image', section!.menu_image);
        }
    

        if (section) {
            axios.post(`/adminmenu/menudetail/${section.menu_id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // 폼 데이터로 보냄
                },
            })
                .then((res) => {
                    console.log('메뉴 업데이트 성공:', res.data, section.menu_image, selectedImage);
                    setIsEditing(false);
                })
                .catch((error) => {
                    console.error('메뉴 업데이트 오류:', error, formData);
                    console.log(section.menu_id, section.menu_name, section.menu_corner,
                        section.menu_price, section.menu_pack, section.menu_sales
                        , section.menu_regist, section.menu_image, selectedImage);
                });
        }
        alert("메뉴가 수정되었습니다.");
      window.location.href = "/adminmenu";
    } else {
      alert("취소하였습니다.");
    }
    };

    const handleDeleteClick = () => {
        const shouldDelete = window.confirm("메뉴를 삭제하시겠습니까?");
        if (shouldDelete) {
            const menuId = location.state && location.state.menu_id;
            axios.delete(`/adminmenu/menudetail/${menuId}`)
                .then((res) => {
                    console.log('메뉴 삭제 성공:', res.data);
                })
                .catch((error) => {
                    console.error('메뉴 삭제 오류:', error, menuId);
                });
            alert("메뉴가 삭제되었습니다.");
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
            <body className={style.bodydetail}>
            <div id="head" className={style.head}>
                <Link to="/adminmenu">
                    <FontAwesomeIcon id="faArrowLeft" icon={faArrowLeft} />
                </Link>
                <img id="logo" className={style.logo} src={ysuLogo} alt={"logo"} onClick={MenuListPage} />
                <Link to="/adminmenu">
                    <FontAwesomeIcon id="faArrowLeft" icon={faArrowLeft} />
                </Link>
            </div>
            <div className={style.menuDetail}>
                {section && (
                    <div id={section['menu_corner']}>
                        {isEditing ? (
                            // 이미지 업로드 입력
                            <>
                                <img
                                    id="menuDetailImg"
                                    className={style.menuDetailImg}
                                    src={selectedImage ? URL.createObjectURL(selectedImage) : require(`../img/${decodeURIComponent(section['menu_image'])}`)}
                                    alt={section['menu_name']}
                                />
                                <br />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const files = e.target.files;
                                        if (files && files.length > 0) {
                                            setSelectedImage(files[0]);
                                        }
                                    }}
                                />
                            </>
                        ) : (
                            <img id="menuDetailImg" className={style.menuDetailImg} src={require(`../img/${decodeURIComponent(section['menu_image'])}`)} alt={section['menu_name']} />
                        )}
                        <hr id="menuDetailHr" className={style.menuDetailHr}></hr>
                        {isEditing ? (
                            // 편집 모드일 때, input을 렌더링
                            <div className={style.menuDetailInfo}>
                                메뉴이름 <input type="text" value={section['menu_name']} onChange={(e) => setSection({ ...section, menu_name: e.target.value })} />
                                코너종류 <label>B<input type="radio" name="corner" value="B" checked={section['menu_corner'] === 'B'} onChange={(e) => setSection({ ...section, menu_corner: e.target.value })} /></label>
                                <label>S<input type="radio" name="corner" value="S" checked={section['menu_corner'] === 'S'} onChange={(e) => setSection({ ...section, menu_corner: e.target.value })} /></label>
                                <label>F<input type="radio" name="corner" value="F" checked={section['menu_corner'] === 'F'} onChange={(e) => setSection({ ...section, menu_corner: e.target.value })} /></label>
                                메뉴가격 <input type="text" value={section['menu_price']} onChange={(e) => setSection({ ...section, menu_price: parseInt(e.target.value, 10) || 0 })} />
                                포장가능여부 <label>O<input type="radio" name="pack" value="1" checked={section['menu_pack'] === 1} onChange={(e) => setSection({ ...section, menu_pack: parseInt(e.target.value, 10) || 0 })} /></label>
                                <label>X<input type="radio" name="pack" value="0" checked={section['menu_pack'] === 0} onChange={(e) => setSection({ ...section, menu_pack: parseInt(e.target.value, 10) || 0 })} /></label>
                                판매가능여부 <label>O<input type="radio" name="sales" value="1" checked={section['menu_sales'] === 1} onChange={(e) => setSection({ ...section, menu_sales: parseInt(e.target.value, 10) || 0 })} /></label>
                                <label>X<input type="radio" name="sales" value="0" checked={section['menu_sales'] === 0} onChange={(e) => setSection({ ...section, menu_sales: parseInt(e.target.value, 10) || 0 })} /></label>
                                등록여부 <label>O<input type="radio" name="regist" value="1" checked={section['menu_regist'] === 1} onChange={(e) => setSection({ ...section, menu_regist: parseInt(e.target.value, 10) || 0 })} /></label>
                                <label>X<input type="radio" name="regist" value="0" checked={section['menu_regist'] === 0} onChange={(e) => setSection({ ...section, menu_regist: parseInt(e.target.value, 10) || 0 })} /></label>
                            </div>
                        ) : (
                            // 편집 모드가 아닐 때, div를 렌더링
                            <div className={style.menuDetailInfo}>
                                <div className={style.menuDetailName}>{section['menu_name']}</div>
                                <div className={style.menuDetailPrice}>가격 : {section['menu_price'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</div>
                            </div>
                        )}
                    </div>
                )}
                {isEditing ? (
                    // 편집 모드일 때, 저장 버튼을 표시
                    <>
                        <button onClick={handleImageChangeAndSubmit}>저장</button>
                        <button onClick={handleBackClick}>취소</button>
                    </>
                ) : (
                    // 편집 모드가 아닐 때, 메뉴 수정 및 삭제 버튼 표시
                    <>
                        <button onClick={handleUpdateFormClick}>메뉴 수정</button>
                        <button onClick={handleDeleteClick}>메뉴 삭제</button>
                    </>
                )}
            </div>
            </body>
        </>
    );
}

export default MenuDetail;