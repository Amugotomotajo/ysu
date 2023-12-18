import { Button, Card, Divider, Dropdown, List, Rate, Result, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import MenuStyle from '../../css/Menu.module.css';
import Rlstyle from '../../css/ReviewList.module.css';
import { format } from 'date-fns';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ysuLogo from '../img/ysu_logo.jpg';
import { faArrowLeft, faArrowRightFromBracket, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import MdStyle from '../../css/MenuDetail.module.css'
import { ReviewList } from "../../state/review";

export const ReviewListPage = (): JSX.Element => {
  const [reviews, setReviews] = useState<{
    u_id: string,
    u_name: string;
    menu_id: number,
    review_id: number,
    review_writing: string,
    review_star: number,
    review_time: Date,
    order_id: number,
    review_regist: number,
    review_img: string,
  }[]>([]);

  const [triggerEffect, setTriggerEffect] = useState(false);

  const [menu_id, setMenu_id] = useState<{
    menu_id: number,
  }>();

  const [user_id, setUser_id] = useState('')

  const location = useLocation();
  const menuId = location.state.menu_id;
  const userId = '2023200014';

  useEffect(() => {
    setMenu_id(menuId);
    setUser_id(userId);
    console.log(menuId, userId);
  });

  const { Meta } = Card;

  const navigate = useNavigate();

  console.log(menuId);

  const menuPage = () => {
    navigate("/menu");
  }

  const reviewWritePage = () => {
    navigate(`menu/${menu_id}/review/write`);
  }

  const ReviewWritePage = () => {
    navigate(`/menu/${menuId}/review/write`, {
      state: {
        menu_id: menuId,
        user_id: userId
      }
    })
  }

  const formattedDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return format(date, 'yyyy.MM.dd HH:MM');
  };

  // 리뷰 불러오기
  useEffect(() => {
    axios.get(`/menu/${menuId}/review`)
      .then((res) => {
        const review_id = res.data.review_id;
        setReviews(res.data);
        console.log(res.data);
        console.log(review_id);
      })
  }, [triggerEffect]);


  const handleReviewDelete = (reviewId: number) => {
    // 각 reviewId에 대해 순회하며 삭제 요청 보내기
    axios.delete(`/review/delete/${reviewId}`)
      .then((res) => {
        setTriggerEffect(prevState => !prevState);
        // 서버로부터 성공적인 응답을 받으면, 현재 리뷰를 목록에서 제거
        message.success("리뷰가 삭제되었습니다.");
        console.log(res);

      })
      .catch((error) => {
        console.error("리뷰 삭제 중 오류:", error);
        message.error("리뷰 삭제 중 오류가 발생했습니다.");
      });
  };


  return (
    <>
      <div id="head" className={MenuStyle.head}>
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

      {reviews.length === 0 && reviews.filter(review => review.review_regist === 0) ? (
        <>
          <Result
            style={{ marginTop: "40px" }}
            status="warning"
            title="해당 메뉴의 리뷰가 없습니다."
            extra={[
              <><Button onClick={ReviewWritePage}>리뷰 적기</Button><Button onClick={menuPage}>메뉴</Button></>
            ]}
          />
        </>
      ) : (
        <Card className={Rlstyle.reviewCard}>
          <div className={Rlstyle.reviewList}>
            {reviews.map((reviewData) => (
              <div className={Rlstyle.reviewItem}>
                <div className={Rlstyle.reviewInfo} >
                  <div className={Rlstyle.userName}>{reviewData.u_name}</div>
                  <div id="reviewTime" style={{ fontSize: "10px" }}>{formattedDate(reviewData.review_time)}</div>
                </div>
                <div>
                  <Rate id="reviewRate" className={Rlstyle.reviewRate} disabled defaultValue={reviewData.review_star}></Rate>
                </div>
                {reviewData.review_img && (
                  <img
                    className={Rlstyle.reviewImg}
                    src={require(`../img/${decodeURIComponent(reviewData.review_img)}`)}
                    alt="Review"
                    // style={{
                    //   paddingBottom: reviewData.review_img ? "13%" : "0%"
                    // }}
                  />
                )}
  
                <div
                  id="reviewWriting"
                  className={Rlstyle.reviewWriting}
                  style={{
                    paddingBottom: reviewData.review_img ? "25%" : "30%"
                  }}
                >
                  {reviewData.review_writing}
                </div>
              </div>
            ))}
          </div>
          <button onClick={reviewWritePage}></button>
        </Card >
      )}
    </>
  )
}