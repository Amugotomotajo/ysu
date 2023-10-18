import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Flex, Image } from 'antd';
import { Row, Col} from 'antd';

import 꼬치어묵우동 from './img/꼬치어묵우동.jpg';

const boxStyle: React.CSSProperties = {
  width: '80%',
  height: 550,
  borderRadius: 6,
  border: '2px solid #000',
  justifyContent: 'center', // 수평 가운데 정렬
  //alignItems: 'center',
  margin: '0 auto', // 수평 가운데 정렬을 위한 스타일
  padding: '20px', // 여백 추가
};

const h1Style: React.CSSProperties = {
  textAlign: 'center', // 수평 가운데 정렬
}

const buttonStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', // 수직 가운데 정렬
  margin: 'auto',
  border:'none',
  background: 'transparent',
  fontSize:'15px'
};

const imageStyle : React.CSSProperties = {
  width: '70%',
  minWidth: '60px',
  //margin: '10px',
  borderRadius: '30%',
  marginBottom: '10px',
  maxWidth:'160px'
}; 

const colStyle : React.CSSProperties = {
  height:'150px'
};

const Main: React.FC = () => (
  <>
  <h1 style={h1Style}>키오스크 체험교육</h1>
  <Flex style={boxStyle}>
  
    <Row gutter={{ xs: 24, sm: 16, md: 24, lg: 32 }} >
      <Col className="gutter-row" span={8} style={colStyle}>
      <Link to="/ForHereToGo">
        <button style={buttonStyle}>
        <img style={imageStyle} src={꼬치어묵우동}/>식당
        </button>
      </Link>
      </Col>
      <Col className="gutter-row" span={8} style={colStyle}>
      <Link to="/ForHereToGo">
        <button style={buttonStyle}>
        <img style={imageStyle} src={꼬치어묵우동}/>카페
        </button>
      </Link>
      </Col>
      <Col className="gutter-row" span={8} style={colStyle}>
      <Link to="/ForHereToGo">
        <button style={buttonStyle}>
        <img style={imageStyle} src={꼬치어묵우동}/>영화관
        </button>
      </Link>
      </Col>
      <Col className="gutter-row" span={8} style={colStyle}>
      <Link to="/ForHereToGo">
        <button style={buttonStyle}>
        <img style={imageStyle} src={꼬치어묵우동}/>영화관
        </button>
      </Link>
      </Col>
      <Col className="gutter-row" span={8} style={colStyle}>
      <Link to="/ForHereToGo">
        <button style={buttonStyle}>
        <img style={imageStyle} src={꼬치어묵우동}/>영화관
        </button>
      </Link>
      </Col>
      <Col className="gutter-row" span={8} style={colStyle}>
      <Link to="/ForHereToGo">
        <button style={buttonStyle}>
        <img style={imageStyle} src={꼬치어묵우동}/>영화관
        </button>
      </Link>
      </Col>
      <Col className="gutter-row" span={8} style={colStyle}>
      <Link to="/ForHereToGo">
        <button style={buttonStyle}>
        <img style={imageStyle} src={꼬치어묵우동}/>영화관
        </button>
      </Link>
      </Col>
      <Col className="gutter-row" span={8} style={colStyle}>
      <Link to="/ForHereToGo">
        <button style={buttonStyle}>
        <img style={imageStyle} src={꼬치어묵우동}/>영화관
        </button>
      </Link>
      </Col>
      <Col className="gutter-row" span={8} style={colStyle}>
      <Link to="/ForHereToGo">
        <button style={buttonStyle}>
        <img style={imageStyle} src={꼬치어묵우동}/>영화관
        </button>
      </Link>
      </Col>
    
    </Row>

    
  </Flex>
  </>
);

export default Main;

