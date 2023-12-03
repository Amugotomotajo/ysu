import { Avatar, Button, Card, Divider, Dropdown, List, Rate, Result } from "antd";
import axios from "axios";
import { useEffect, useState } from "react"
import { ReviewList } from "../../state/review";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import MenuStyle from '../../css/Menu.module.css';
import { UserOutlined } from '@ant-design/icons';
import Rlstyle from '../../css/ReviewList.module.css';
import { format } from 'date-fns';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ysuLogo from '../img/ysu_logo.jpg';
import { faArrowLeft, faArrowRightFromBracket, faCartShopping } from "@fortawesome/free-solid-svg-icons";

export const ReviewListPage = (): JSX.Element => {
  const location = useLocation();
  const menuId = location.state.menu_id;
  const reviewId = location.state.review_id;
  const navigate = useNavigate();

  const reviewWritePage = () => {
    navigate(`/menu/${menuId}/review/write`);
  }

  const menuPage = () => {
    navigate("/menu");
  }

  const [reviews, setReviews] = useState<ReviewList[]>([]);

  const { review_id } = useParams();

  const { Meta } = Card;

  // const getHiddenStudentId = (review: ReviewList) => {
  //   if (review) {
  //     const visiblePart = review.u_id.substring(0, 4);
  //     const hiddenPart = 'x'.repeat(review.u_id.length - 4);
  //     return visiblePart + hiddenPart;
  //   }
  //   return '';
  // };

  const formattedDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return format(date, 'yyyy/MM/dd HH:mm:ss');
  };

  // const getHiddenStudentName = (review: ReviewList) => {
  //   if (review) {
  //     const visiblePart1 = review.u_name.slice(0, 1);
  //     const hiddenPart = 'x'.repeat(review.u_name.length - 2);
  //     const visiblePart2 = review.u_name.slice(2, 3);
  //     return visiblePart1 + hiddenPart + visiblePart2;
  //   }
  //   return '';
  // };


  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/menu/${menuId}/review`);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [menuId]);


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

      {reviews.length === 0 ? (
        <>
          <Result
            style={{ marginTop: "40px" }}
            status="warning"
            title="해당 메뉴의 리뷰가 없습니다."
            extra={[
              <>
                <Button type="primary" onClick={reviewWritePage} >리뷰 적기</Button>
                <Button onClick={menuPage}>메뉴</Button>
              </>
            ]}
          />
        </>
      ) : (
        <div className={Rlstyle.reviewList}>
          <List className={Rlstyle.reviewItem}
            itemLayout="horizontal"
            dataSource={reviews}
            renderItem={(item) => (
              <List.Item key={item.menu_id}>
                <Card style={{ width: "80%" }}>
                  {/* <Dropdown.Button></Dropdown.Button> */}
                  <Meta
                    className={Rlstyle.reviewMeta}
                    avatar={<Avatar icon={<UserOutlined />} style={{ marginRight: "-40px" }} />}
                    //title={getHiddenStudentName(item)} 
                    title={item.u_name}
                    description={
                      <><div style={{ fontSize: "10px" }}>{formattedDate(item.review_time)}</div>
                        <Divider />
                        <div><Rate className={Rlstyle.reviewRate} disabled defaultValue={item.review_star}></Rate></div>
                        <br />
                        <div style={{ color: "black" }}>{item.review_writing}</div>
                      </>
                    }
                  />
                  {/* <div>{item.u_name}</div> */}
                </Card>
              </List.Item>
            )}></List>
        </div>
      )}</>
  )
}