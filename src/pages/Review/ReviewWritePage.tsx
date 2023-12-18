import { Button, Card, Divider, Input, Rate, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MenuStyle from '../../css/Menu.module.css';
import { faArrowLeft, faArrowRightFromBracket, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ysuLogo from '../img/ysu_logo.jpg';
import imageAdd from '../img/image_add.png'
import RwStyle from '../../css/ReviewWrite.module.css'


interface IProps {
  detail: { review_writing: string; review_star: number; };
}

// 허용가능한 확장자 목록
const ALLOW_FILE_EXTENSION = "jpg, jpeg, png, bmp";
const FILE_SIZE_MAX_LIMIT = 10 * 1024 * 1024;  // 10MB

export const ReviewWritePage = (): JSX.Element => {
  const navigate = useNavigate();

  const [section, setSection] = useState<{
    menu_id: number,
    menu_name: string,
    menu_corner: string
    menu_price: number,
    menu_pack: number,
    menu_image: string,
    menu_sales: number,
    menu_regist: number
  }>();

  // const menuId = location.state.menu_id;
  const { menu_id } = useParams();

  const [previewImgUrl, setPreviewImgUrl] = useState('');
  const [review_img, setReview_img] = useState('');
  const [previewImg, setPreviewImg] = useState('');

  const [inputs, setInputs] = useState<IProps['detail']>({
    review_writing: '',
    review_star: 0,
  })

  const { review_writing, review_star } = inputs;

  const onChange = (e: any) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });

  };

  const handleStarChange = (value: number) => {
    setInputs({
      ...inputs,
      review_star: value,
    });
  };

  // 이미지 삭제
  const deleteImgHandler = (e: any): void => {
    e.preventDefault();
    setPreviewImgUrl('');
    setReview_img('');
    e.target.value = null;
  };

  const fileExtensionValid = ({ name }: { name: string }): boolean => {
    if (!(ALLOW_FILE_EXTENSION.indexOf(name.split('.').pop() || '') > -1) || name === '') {
      return false;
    }
    return true;
  }

  const onChangeImg = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    if (e.target.files) {
      const uploadFile = e.target.files[0];
      formData.append('file', uploadFile);

      if (!fileExtensionValid(uploadFile)) {
        e.target.value = '';
        message.error(
          `업로드 가능한 확장자가 아닙니다. [가능한 확장자 : ${ALLOW_FILE_EXTENSION}]`
        )
        return;
      }

      if (uploadFile.size > FILE_SIZE_MAX_LIMIT) {
        e.target.value = '';
        message.error("업로드 가능한 최대 용량은 10MB입니다.")
        return;
      }
      setReview_img(uploadFile);
      setPreviewImg(uploadFile);
      console.log(uploadFile);
    }
  }


  const baseUrl = 'C:/Users/user/ysu/src/pages/img';

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    if (!review_writing.trim()) {
      message.error("리뷰를 작성해주세요.");
      return;
    } else if (review_star === 0) {
      message.error("별점을 입력해주세요.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append('review_img', review_img);
      formData.append('review_writing', inputs.review_writing);
      formData.append('review_star', (inputs.review_star).toString());
      console.log(formData);
      console.log(review_writing);
      axios.post(`/menu/${menu_id}/review/write`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          message.success("리뷰를 등록했습니다.");
          console.log(res);
          if (res.status === 200) {
            navigate(`/menu`)
          }
        })
    } catch (err) {
      message.error("리뷰 등록에 실패했습니다.");

      console.error(err);
    }
  };


  useEffect(() => {
    if (menu_id !== undefined) {
      // menu_id가 정의되어 있으면 해당 메뉴 데이터를 가져오기
      axios.get(`/menu/${menu_id}`)
        .then((res) => {
          setSection(res.data);
          console.log("데이터 가져오기 성공!");
          console.log(res.data);
        })
        .catch((error) => {
          console.error('메뉴 데이터를 불러오는 데 실패했습니다.', error);
        });
    };
  }, [menu_id])


  return (
    <><div id="head" className={MenuStyle.head}>
      <Link className={MenuStyle.link} to="/Menu">
        <FontAwesomeIcon id="faArrowLeft" icon={faArrowLeft} className={MenuStyle.faArrowLeft} />
      </Link>
      <Link className={MenuStyle.link} to="">
        <FontAwesomeIcon id="faArrowRightFromBracket" className={MenuStyle.faArrowRightFromBracket} icon={faArrowRightFromBracket} style={{ color: 'transparent' }} />
      </Link>

      <img id="logo" className={MenuStyle.logo} src={ysuLogo} alt={"logo"} />
      <Link to="/" className={MenuStyle.link}>
        <FontAwesomeIcon id="faArrowRightFromBracket" icon={faArrowRightFromBracket} className={MenuStyle.faArrowRightFromBracket} />
      </Link>
      <Link className={MenuStyle.link} to="/">
        <FontAwesomeIcon id="faCartShopping" icon={faCartShopping} className={MenuStyle.faCartShopping} />
      </Link>
    </div>
      <form className={RwStyle.reviewForm}>
        <div className={RwStyle.menuDetail}>
          {section && (
            <div id={section['menu_corner']}>
              <img id="menuDetailImg" className={RwStyle.menuDetailImg} src={require(`../img/${decodeURIComponent(section['menu_image'])}`)} alt={section['menu_name']} />
              <div className={RwStyle.menuDetailName}>{section['menu_name']}</div>
            </div>

          )}
          <div>
            <Rate
              className={RwStyle.reviewRate}
              value={review_star}
              onChange={handleStarChange} />
          </div>
          <div>
            <Input.TextArea
              showCount
              maxLength={100}
              placeholder="리뷰를 작성해주세요."
              name="review_writing"
              onChange={onChange}
              style={{ height: 100 }} />
          </div>
          <div className={RwStyle.imgWrap}>
            {review_img ? (

              <><div className={RwStyle.imgBox}>
                <img
                  className={RwStyle.previewImg}
                  src={URL.createObjectURL(new Blob([review_img]))} />
              </div><button className={RwStyle.deleteBtn} onClick={deleteImgHandler}>✕</button></>

            ) : (
              <><label htmlFor="imgUpload"><img className={RwStyle.imgAdd} src={imageAdd} />
                <input
                  type="file"
                  accept="image/*"
                  id="imgUpload"
                  onChange={onChangeImg}
                  className={RwStyle.reviewFile}
                />
              </label>
              </>
            )}
          </div>
        </div>
        <div className={RwStyle.reviewWriteBtnWrapper}>
          <button className={RwStyle.reviewWriteBtn} onClick={handleFormSubmit}>
            리뷰 등록
          </button>
        </div>
      </form >



    </>
  );
};

