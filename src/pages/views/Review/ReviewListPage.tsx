import { Avatar, Button, Card, Divider, Dropdown, List, Rate, Result, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react"
import { ReviewList } from "../state/review";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import MenuStyle from '../../css/Menu.module.css';
import MdStyle from '../../css/MenuDetail.module.css'
import Rlstyle from '../../css/ReviewList.module.css';
import { format } from 'date-fns';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ysuLogo from '../../img/ysu_logo.jpg';
import { faArrowLeft, faArrowRightFromBracket, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { ReviewWritePage } from "./ReviewWritePage";
import { MenuReviewTab } from "../MenuReviewTab";
import { BsFillPersonFill } from "react-icons/bs";
import { IoCartSharp } from "react-icons/io5";
import { BiArrowBack } from "react-icons/bi";

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
  }[]>([]);

  const [triggerEffect, setTriggerEffect] = useState(false);

  const [menu_id, setMenu_id] = useState<{
    menu_id: number,
  }>();

  const [user_id, setUser_id] = useState(null)

  const location = useLocation();
  const menuId = location.state ? location.state.menu_id : 1;
  const userId = localStorage.getItem('user_id') || '';

  useEffect(() => {
    setMenu_id(menuId);
    console.log(menuId, userId);
  });

  const { Meta } = Card;

  const navigate = useNavigate();

  console.log(menuId);

  const menuPage = () => {
    navigate("/menu");
  }


  const formattedDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return format(date, 'yyyy/MM/dd HH:mm:ss');
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
    axios.delete(`/review/delete/${reviewId}/${userId}`)
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

  const ReviewWritePage = () => {
    navigate(`/menu/review/write`, {
      state: {
        menu_id: menuId,
        user_id: userId
      }
    })
  }

  return (
    <>
      <div id="head" className={MenuStyle.head}>
        <Link className={MenuStyle.link} to="/Menu">
          <BiArrowBack className={MenuStyle.faArrowLeft} />
        </Link>
        <img id="logo" className={MenuStyle.logo} src={ysuLogo} alt={"logo"} />
        <Link className={MenuStyle.link} to="/">
          <IoCartSharp className={MenuStyle.faCartShopping} />
        </Link>
      </div>

      {reviews.length === 0 && reviews.filter(review => review.review_regist === 0) ? (
        <>
          <Result
            style={{ marginTop: "100px" }}
            status="warning"
            title="해당 메뉴의 리뷰가 없습니다."
            extra={[
              // <><Button onClick={ReviewWritePage}>리뷰 적기</Button><Button onClick={menuPage}>메뉴</Button></>
            ]}
          />
        </>
      ) : (
        <div className={MdStyle.menuDetail}>
          <List className={Rlstyle.reviewItem}
            itemLayout="horizontal"
            dataSource={reviews}
            renderItem={(item) => (
              <List.Item key={item.menu_id}>
                <Card style={{ width: "97%" }}>

                  <Meta key={item.review_id}
                    className={Rlstyle.reviewMeta}
                    // avatar={<Avatar icon={<UserOutlined />} style={{ marginRight: "-40px" }} />}
                    title={item.u_name}
                    description={

                      <><div style={{ fontSize: "10px" }}>{formattedDate(item.review_time)}</div>
                        <div>{(item.review_id)}</div>
                        <Divider />
                        <div><Rate className={Rlstyle.reviewRate} disabled defaultValue={item.review_star}></Rate></div>
                        <br />
                        <div style={{ color: "black" }}>{item.review_writing}</div>
                      </>
                    }
                  />
                  {/* <div>{item.u_name}</div> */}
                  <button onClick={() => { handleReviewDelete(item.review_id) }}>삭제</button>
                  {/* <ReviewDelete /> */}
                </Card>
              </List.Item>
            )}>

          </List>
        </div>
      )}</>
  )
}