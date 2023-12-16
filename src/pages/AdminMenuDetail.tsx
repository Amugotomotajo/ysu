import React, { useState, useEffect } from 'react';
import MenuStyle from '../css/AdminMenuList.module.css';
import MdStyle from '../css/AdminMenuDetail.module.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import ysuLogo from '../img/ysu_logo.jpg';


export const AdminMenuDetail = (): JSX.Element => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [action, setAction] = useState('update');
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

    const [originalSection, setOriginalSection] = useState<{
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
        navigate("/adminmain");
    };

    const menuId = location.state.menu_id;
    const menuPack = location.state.menu_pack;

    useEffect(() => {
        const menuId = location.state && location.state.menu_id;
        if (menuId !== undefined) {
            // menu_id가 정의되어 있으면 해당 메뉴 데이터를 가져옵니다.
            axios.get(`/adminmenu/menudetail/${menuId}`)
                .then((res) => {
                    setSection(res.data);
                    setOriginalSection(res.data);
                    console.log(res);
                })
                .catch((error) => {
                    console.error('Failed to fetch menu data', error);
                });
        }
    }, [location.state]);

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
        setSection(originalSection);
        setIsEditing(false);
    };

    const handleUpdateFormClick = () => {
        setIsEditing(true);
    }

    // 메뉴 update
    const handleUpdateClick = async () => {
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
        } else {
            // 이미지 파일이 선택되지 않은 경우, 기존 이미지 파일명을 서버에 전달
            formData.append('menu_image', section!.menu_image);
        }


        if (section) {
            try {
                await axios.post(`/adminmenu/menudetail/${section.menu_id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // 폼 데이터로 보냄
                    },
                });

                console.log('메뉴 업데이트 성공:', section.menu_image, selectedImage);
                setIsEditing(false);

            } catch (error) {
                console.error('메뉴 업데이트 오류:', error, formData);
            }
        }

    };

    const [updateModal, setUpdateModal] = useState(false);

    const openUpdateModal = () => {
        setUpdateModal(true);
    }

    const openUpModal = () => {
        setAction('update');
        setShowModal(true);

        const timeoutId = setTimeout(() => {
            handleUpdateClick();
            setShowModal(false);
            localStorage.removeItem('activeSection');
            navigate('/adminmenu');
        }, 3000);

        // 컴포넌트가 언마운트되면 타이머를 클리어하여 메모리 누수를 방지
        return () => clearTimeout(timeoutId);

    };


    // 메뉴 delete
    const handleDeleteClick = () => {
        const menuId = location.state && location.state.menu_id;
        axios.delete(`/adminmenu/menudetail/${menuId}`)
            .then((res) => {
                console.log('메뉴 삭제 성공:', res.data);

            })
            .catch((error) => {
                console.error('메뉴 삭제 오류:', error, menuId);
            });

    };

    const [showModal, setShowModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);


    const openDeleteModal = () => {
        setDeleteModal(true);
    }


    const openDeModal = () => {
        setAction('back');
        setShowModal(true);

        const timeoutId = setTimeout(() => {
            handleDeleteClick();
            setShowModal(false);
            localStorage.removeItem('activeSection');
            navigate('/adminmenu');
        }, 3000);

        // 컴포넌트가 언마운트되면 타이머를 클리어하여 메모리 누수를 방지
        return () => clearTimeout(timeoutId);
    };



    const closeUpdateModal = () => {
        setUpdateModal(false);
    }

    const closeDeleteModal = () => {
        setDeleteModal(false);
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
            const fileName = generateFileName(section?.menu_name || "");
            const blobFile = new File([blobImage], fileName);

            setSelectedImage(blobFile);
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
        <html className={MdStyle.html}>
            <>
                <div id="head" className={MenuStyle.head}>
                    <Link className={MenuStyle.link} to="/adminmenu">
                        <BiArrowBack className={MenuStyle.faArrowLeft} />
                    </Link>
                    <Link className={MenuStyle.link} to="adminmain">
                        <FontAwesomeIcon id="faArrowRightFromBracket" className={MenuStyle.faArrowRightFromBracket} icon={faArrowRightFromBracket} style={{ color: 'transparent' }} />
                    </Link>

                    <img id="logo" className={MenuStyle.logo} src={ysuLogo} alt={"logo"} onClick={MenuListPage} />
                    <Link to="/login" className={MenuStyle.link} onClick={handleLogout}>
                        <MdLogout className={MenuStyle.faArrowRightFromBracket} onClick={handleLogout} />
                    </Link>
                </div>
                <div className={MdStyle.menuDetail}>
                    {section && (
                        <div id={section['menu_corner']}>
                            {isEditing ? (
                                <>
                                    <img
                                        id="menuDetailImg"
                                        className={MdStyle.menuDetailImg}
                                        src={selectedImage ? URL.createObjectURL(selectedImage) : 
                                            require(`../img/${decodeURIComponent(section['menu_image'])}`)}
                                        alt={section['menu_name']}
                                    />
                                    <br />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className={MdStyle.fileForm}
                                        onChange={(e) => {
                                            const files = e.target.files;
                                            if (files && files.length > 0) {
                                                setSelectedImage(files[0]);
                                                handleImageChange(e);
                                            }
                                        }}
                                    />
                                </>
                            ) : (
                                <img id="menuDetailImg" className={MdStyle.menuDetailImg} 
                                src={require(`../img/${decodeURIComponent(section['menu_image'])}`)} alt={section['menu_name']} />
                            )}
                            <hr id="menuDetailHr" className={MdStyle.menuDetailHr}></hr>
                            {isEditing ? (
                                // 편집 모드일 때, input을 렌더링
                                <div className={MdStyle.menuDetailInfo}>
                                    <div className={MdStyle.formGroup}>
                                        <label>메뉴이름</label>
                                        <input type="text" value={section['menu_name']} onChange={(e) => setSection({ ...section, menu_name: e.target.value })} />
                                    </div>
                                    <br />
                                    <div className={MdStyle.horizontalgroup}>
                                        <div className={MdStyle.formGroup}>
                                            <label>코너종류</label>
                                            <div className={MdStyle.radioGroup}>
                                                <label><input type="radio" name="corner" value="S" checked={section['menu_corner'] === 'S'} onChange={(e) => setSection({ ...section, menu_corner: e.target.value })} /> S</label>
                                                <label><input type="radio" name="corner" value="B" checked={section['menu_corner'] === 'B'} onChange={(e) => setSection({ ...section, menu_corner: e.target.value })} /> B</label>
                                                <label><input type="radio" name="corner" value="F" checked={section['menu_corner'] === 'F'} onChange={(e) => setSection({ ...section, menu_corner: e.target.value })} /> F</label>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <div className={MdStyle.formGroup}>
                                        <label>메뉴가격</label>
                                        <input type="text" value={section['menu_price']} onChange={(e) => setSection({ ...section, menu_price: parseInt(e.target.value, 10) || 0 })} />
                                    </div>
                                    <br />
                                    <div className={MdStyle.horizontalgroup}>
                                        <div className={MdStyle.formGroup}>
                                            <label>포장가능여부</label>
                                            <div className={MdStyle.radioGroup}>
                                                <label><input type="radio" name="pack" value="1" checked={section['menu_pack'] === 1} onChange={(e) => setSection({ ...section, menu_pack: parseInt(e.target.value, 10) || 0 })} /> O</label>
                                                <label><input type="radio" name="pack" value="0" checked={section['menu_pack'] === 0} onChange={(e) => setSection({ ...section, menu_pack: parseInt(e.target.value, 10) || 0 })} /> X</label>
                                            </div>
                                        </div>
                                    </div>
                                    <br />

                                    <div className={MdStyle.horizontalgroup}>
                                        <div className={MdStyle.formGroup}>
                                            <label>판매가능여부</label>
                                            <div className={MdStyle.radioGroup}>
                                                <label><input type="radio" name="sales" value="1" checked={section['menu_sales'] === 1} onChange={(e) => setSection({ ...section, menu_sales: parseInt(e.target.value, 10) || 0 })} /> O</label>
                                                <label><input type="radio" name="sales" value="0" checked={section['menu_sales'] === 0} onChange={(e) => setSection({ ...section, menu_sales: parseInt(e.target.value, 10) || 0 })} /> X</label>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <div className={MdStyle.horizontalgroup}>
                                        <div className={MdStyle.formGroup}>
                                            <label>메뉴등록여부</label>
                                            <div className={MdStyle.radioGroup}>
                                                <label><input type="radio" name="regist" value="1" checked={section['menu_regist'] === 1} onChange={(e) => setSection({ ...section, menu_regist: parseInt(e.target.value, 10) || 0 })} /> O</label>
                                                <label><input type="radio" name="regist" value="0" checked={section['menu_regist'] === 0} onChange={(e) => setSection({ ...section, menu_regist: parseInt(e.target.value, 10) || 0 })} /> X</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // 편집 모드가 아닐 때, div를 렌더링
                                <div className={MdStyle.menuDetailInfo}>
                                    <div className={MdStyle.menuDetailName}>{section['menu_name']}</div>
                                    <div className={MdStyle.menuDetailPrice}>가격 : {(menuPack === 1) ? (section['menu_price'] + 500).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : section['menu_price'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</div>
                                </div>
                            )}
                        </div>
                    )}
                    {isEditing ? (
                        // 편집 모드일 때, 저장 버튼을 표시
                        <>
                            <button id="optionButton" className={MdStyle.optionButton1} onClick={openUpdateModal}>저장</button>
                            <button id="optionButton" className={MdStyle.optionButton2} onClick={handleBackClick}>취소</button>
                        </>
                    ) : (
                        // 편집 모드가 아닐 때, 메뉴 수정 및 삭제 버튼 표시
                        <>
                            <button id="optionButton" className={MdStyle.optionButton1} onClick={handleUpdateFormClick}>메뉴 수정</button>
                            <button id="optionButton" className={MdStyle.optionButton2} onClick={openDeleteModal}>메뉴 삭제</button>
                        </>
                    )}
                </div>

                {/* 모달 창 */}
                {deleteModal && (
                    <div className={MdStyle.modal}>
                        <div className={MdStyle.modalContent}>
                            <span className={MdStyle.close} onClick={closeDeleteModal}>&times;</span>
                            <p>메뉴를 삭제하시겠습니까?</p>
                            <button type="submit" className={MdStyle.btncancel} onClick={closeDeleteModal}>취소</button>
                            <button type="submit" className={MdStyle.btninsert} onClick={openDeModal}>삭제</button>
                        </div>
                    </div>
                )}

                {updateModal && (
                    <div className={MdStyle.modal}>
                        <div className={MdStyle.modalContent}>
                            <span className={MdStyle.close} onClick={closeUpdateModal}>&times;</span>
                            <p>메뉴를 수정하시겠습니까?</p>
                            <button type="submit" className={MdStyle.btncancel} onClick={closeUpdateModal}>취소</button>
                            <button type="submit" className={MdStyle.btninsert} onClick={openUpModal}>수정</button>
                        </div>
                    </div>
                )}


                {showModal && (
                    <div className={MdStyle.modal}>
                        <div className={MdStyle.modalContent}>
                            {action === 'update' ? (
                                <div>
                                    <img src={require(`../img/${decodeURIComponent('InMenu.gif')}`)} alt="업데이트 이미지" />
                                    <p>메뉴를 수정하였습니다.</p>
                                </div>
                            ) : (
                                <div>
                                    <img src={require(`../img/${decodeURIComponent('DeMenu.gif')}`)} alt="삭제 이미지" />
                                    <p>메뉴를 삭제하였습니다.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </>
        </html>
    );
}

export default AdminMenuDetail;