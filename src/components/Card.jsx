import React, { useRef, useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import defaultImg from "../assets/img/2.jpg";

function Card({ user }) {
  const navigate = useNavigate();
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  if (!user || !user.photoList || user.photoList.length === 0) {
    // photoList가 비어있을 때 기본 이미지
    return (
      <CardDesign
        onClick={() => {
          navigate(`/page/${user.userId}`);
        }}
      >
        <SliderWrapper>
          <Styled_Slide>
            <CardProfileImg src={defaultImg} />
          </Styled_Slide>
        </SliderWrapper>
        <CardHeader>
          <ProfileImg src={user.profileUrl}></ProfileImg>
          <FlexWrap>
            <UserNickName>{user.nickName}</UserNickName>
            <UserPosition>
              <HeartIcon />
              <UserPositionText>{user.totalLoveCnt}</UserPositionText>
            </UserPosition>
          </FlexWrap>
        </CardHeader>
      </CardDesign>
    );
  }
  return (
    <CardDesign
      onClick={() => {
        navigate(`/page/${user.userId}`);
      }}
    >
      <SliderWrapper>
        <Styled_Slide {...settings}>
          {user.photoList.map((item) => (
            <CardProfileImg key={item.photoUrl} src={item.photoUrl} />
          ))}
        </Styled_Slide>
      </SliderWrapper>
      <CardHeader>
        <ProfileImg src={user.profileUrl}></ProfileImg>
        <FlexWrap>
          <UserNickName>{user.nickName}</UserNickName>
          <UserPosition>
            <HeartIcon />
            <UserPositionText>
              {user.totalLoveCnt || user.loveCnt}
            </UserPositionText>
          </UserPosition>
        </FlexWrap>
      </CardHeader>
    </CardDesign>
  );
}

export default Card;

const UserPosition = styled.div`
  display: flex;
  align-items: center;
`;

const HeartIcon = styled(AiOutlineHeart)`
  font-size: 16px;
  margin-right: 4px;
`;

const UserPositionText = styled.span`
  font-size: 16px;
`;
const Styled_Slide = styled(Slider)`
  position: relative;
  opacity: 100%;
  border: none;
  z-index: 1;
  .slick-prev,
  .slick-next {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 11;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 50%;
    font-size: 20px;
  }
  .slick-prev {
    left: 3px;
  }
  .slick-next {
    right: 3px;
  }
`;

const CardDesign = styled.div`
  width: 100%;
  border-radius: 5px;
  flex-grow: 1;
  cursor: pointer;
  /* &:hover {
    transform: scale(1.01);
  } */
  @media (min-width: 768px) {
    width: calc(25% - 20px);
  }

  @media (min-width: 1024px) {
    width: calc(25% - 20px);
  }

  @media (min-width: 1440px) {
    width: calc(25% - 20px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
`;
const ProfileImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  padding: 10px;
  flex-shrink: 0;
`;

const FlexWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
`;

const UserNickName = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: black;

  @media (max-width: 1024px) {
    font-size: 14px;
  }
`;

const SliderWrapper = styled.div`
  position: relative;
  background-color: #fff;
`;

const CardProfileImg = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  border-radius: 12.69px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  background-color: ${(props) => (props.src ? "transparent" : "#583232")};
  background-image: ${(props) =>
    props.src ? `url(${props.src})` : `url(${defaultImg})`};
`;

const ArrowButton = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
`;

const PrevArrow = ({ onClick }) => (
  <ArrowButton className="slick-prev" onClick={onClick}></ArrowButton>
);

const NextArrow = ({ onClick }) => (
  <ArrowButton className="slick-next" onClick={onClick}></ArrowButton>
);
