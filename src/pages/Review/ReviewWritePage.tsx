import { Button, Card, Divider, Input, Rate, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import MenuStyle from '../../css/Menu.module.css';
import { faArrowLeft, faArrowRightFromBracket, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ysuLogo from '../img/ysu_logo.jpg';
import RwStyle from '../../css/ReviewWrite.module.css'

export interface IProps {
  detail: { review_writing: string; review_star: number };
}

export const ReviewWritePage = (): JSX.Element => {
  const [section, setSection] = useState<{
    menu_id: number,
    menu_name: string,
    menu_corner: string,
    menu_price: number,
    menu_pack: number,
    menu_image: string,
    menu_sales: number,
    menu_regist: number
  }>();;


  const [inputs, setInputs] = useState<IProps['detail']>({
    review_writing: '',
    review_star: 0,
  })

  const navigate = useNavigate();
  const location = useLocation();

  const menuId = location.state.menu_id;

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


  const handleSubmit = (e: any) => {
    e.preventDefault();

    // if (!review_writing.trim() || review_star === 0) {
    //   // 리뷰 작성 또는 별점이 입력되지 않은 경우
    //   message.error("리뷰 내용과 별점을 입력해주세요.");
    //   return;
    // }
    if (!review_writing.trim()) {
      message.error("리뷰를 작성해주세요.");
      return;
    } else if (review_star === 0) {
      message.error("별점을 입력해주세요.");
      return;
    }
    // order_id랑 u_id 가져와서 주문했을 경우 주문하는 생성 (리뷰쓰는 버튼 생성)
    try {
      axios.post(`/menu/${menuId}/review/write`, JSON.stringify(inputs), {
        headers: {
          "Content-Type": `application/json`,
        },
      })
        .then((res) => {
          message.success("리뷰를 등록했습니다.");
          console.log(res);
          if (res.status === 200){
            navigate(`/menu`)
          }
        })
    } catch (err) {
      message.error("리뷰 등록에 실패했습니다.");
      console.error(err);
    }
  };



  useEffect(() => {
    if (menuId !== undefined) {
      // menu_id가 정의되어 있으면 해당 메뉴 데이터를 가져오기
      axios.get(`/menu/${menuId}`)
        .then((res) => {
          setSection(res.data);
          console.log("데이터 가져오기 성공!");
          console.log(res.data);
        })
        .catch((error) => {
          console.error('메뉴 데이터를 불러오는 데 실패했습니다.', error);
        });
    };
  }, [menuId])


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
      <div className={RwStyle.menuDetail}>
        {section && (
          <div id={section['menu_corner']}>
            <img id="menuDetailImg" className={RwStyle.menuDetailImg} src={require(`../img/${decodeURIComponent(section['menu_image'])}`)} alt={section['menu_name']} />
            <div className={RwStyle.menuDetailName}>{section['menu_name']}</div>
            <Divider />
          </div>

        )}

        <Card className={RwStyle.reviewCard}>
          <div id="reviewWriting">
            <Input.TextArea
              showCount
              maxLength={100}
              placeholder="리뷰를 작성해주세요."
              name="review_writing"
              onChange={onChange}
              style={{ height: 100 }} />
          </div>
          <Divider />
          <div>
            <Rate
              className={RwStyle.reviewRate}
              value={review_star}
              onChange={handleStarChange} />
          </div>
          <Button className={RwStyle.reviewWriteBtn} onClick={handleSubmit}>
            리뷰 등록
          </Button>
        </Card>
      </div>


    </>
  );
};
