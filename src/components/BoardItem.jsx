import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoLocationSharp } from "react-icons/io5";
import { BiDollarCircle } from "react-icons/bi";
import { LuCalendarDays } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import { BiUser } from "react-icons/bi";

function BoardItem({ item, onClick, photograhperInfoShow, showFollow }) {
  const [timeDifference, setTimeDifference] = useState(null);
  // 오늘 날짜
  const today = new Date();
  const navigate = useNavigate("");
  const getTimeDifference = (createdTime) => {
    const serverTime = new Date(createdTime);
    const currentTime = new Date();
    const timeDiff = Math.floor((currentTime - serverTime) / (1000 * 60)); // 분 단위로 시간 차이 계산

    if (timeDiff === 0) {
      return "방금 전 작성됨";
    }
    if (timeDiff < 60) {
      return `${timeDiff}분 전 작성됨 `;
    } else if (timeDiff >= 60 && timeDiff < 1440) {
      const hoursDiff = Math.floor(timeDiff / 60);
      return `${hoursDiff}시간 전 작성됨 `;
    } else {
      const daysDiff = Math.floor(timeDiff / 1440);
      return `${daysDiff}일 전 작성됨 `;
    }
  };

  const getDDay = (deadLine) => {
    const targetDate = new Date(deadLine);
    const timeDiff = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24)); // 일 단위로 시간 차이 계산
    if (timeDiff === 0) {
      return "D-day";
    } else if (timeDiff > 0) {
      return `D-${timeDiff}`;
    } else {
      return "마감";
    }
  };
  useEffect(() => {
    const diff = getTimeDifference(item.createdTime);
    setTimeDifference(diff);
  }, [item.createdTime]);

  return (
    <Item key={item.boardId} onClick={onClick}>
      <ImageContainer img={item.boardImgUrl}>
        <DDayInfo isDday={getDDay(item.deadLine) === "D-day"}>
          <p>{getDDay(item.deadLine)}</p>
        </DDayInfo>

        {photograhperInfoShow === "no" ? (
          <PhotographerInfo button="matching">
            <MatchingAcceptButton
              onClick={(e) => {
                e.stopPropagation();
                showFollow(true);
              }}
            >
              <MatchingCount>
                <BiUser />
                <p>3/5</p>
              </MatchingCount>
              <p>매칭 수락</p>
            </MatchingAcceptButton>
          </PhotographerInfo>
        ) : (
          <PhotographerInfo>
            <CardProfileImg src={item.hostProfileUrl} />
            <PhotographerRole>{item.role}</PhotographerRole>
            <span>|</span>
            <PhotographerName>{item.nickName}</PhotographerName>
          </PhotographerInfo>
        )}
      </ImageContainer>

      <ContentContainer>
        <Title>{item.title}</Title>
        <LocationInfo>
          <IoLocationSharp style={{ color: "#514073" }} />
          <CardFont>{item.location}</CardFont>
          <PayInfo>
            <BiDollarCircle style={{ color: "#514073" }} />
            <CardFont>{item.pay}</CardFont>
          </PayInfo>
        </LocationInfo>
        <DeadLineInfo>
          <LuCalendarDays style={{ color: "#514073" }} />{" "}
          <CardFont>{item.deadLine}</CardFont>
        </DeadLineInfo>

        <HashTagContainer>
          {item.tag_boardList.map((item) => {
            return <HashTag key={item.tagId}>{item.tag}</HashTag>;
          })}
        </HashTagContainer>
        <MeetInfo hasHashTags={item.tag_boardList.length > 0}>
          <CreatedDate>
            <FaPen style={{ color: "#514073", marginRight: "10px" }} />
            {getTimeDifference(item.createdTime)}
          </CreatedDate>
        </MeetInfo>
      </ContentContainer>
    </Item>
  );
}

export default BoardItem;

const Item = styled.div`
  margin-top: 15px;
  flex-grow: 1;
  width: 100%;
  overflow: hidden;

  &:hover {
    transform: translateY(-10px);
    transition: transform 1s ease;
    cursor: pointer;
  }

  &:not(:hover) {
    transform: translateY(0);
    transition: transform 1s ease;
  }
`;

const CardFont = styled.p`
  font-size: 13px;
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const PhotographerInfo = styled.div`
  position: absolute;
  bottom: 0px;
  z-index: 3;
  display: flex;
  align-items: center;
  background-color: ${(props) =>
    props.button === "matching" ? "transparent" : "rgba(255, 255, 255, 0.6);"};
  padding: 10px;
  font-weight: 600;
  width: 100%;
  @media (max-width: 1200px) {
    padding: 5px;
  }
`;

const MatchingCount = styled.div`
  display: flex;
  margin-right: 10px;
  align-items: center;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  border-radius: 4px;
  object-fit: cover;
  background-image: url(${(props) => props.img});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #bbbbbb;
  cursor: pointer;
  overflow: hidden;
  margin-bottom: 20px;
`;

const MatchingAcceptButton = styled.button`
  margin: auto;
  padding: 8px;
  width: 90%;
  background-color: #483767;
  color: white;
  border: none;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #8c8c8c;
    border-color: #fff;
    color: #fff;
  }
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 8px;
`;

const PhotographerName = styled.div`
  font-weight: 600;
  margin-left: 8px;
  font-size: 14px;
`;

const PhotographerRole = styled.div`
  font-weight: 600;
  margin-right: 8px;
  font-size: 10px;
`;

const MeetInfo = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const CreatedDate = styled.div`
  color: #666;
  font-size: 13px;
  margin-top: 10px;
`;

const HashTagContainer = styled.div`
  padding-top: 10px;
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
`;

const HashTag = styled.div`
  background-color: #514073;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 7px;
  font-size: 13px;
`;

const LocationInfo = styled.div`
  display: flex;
  gap: 5px;
  font-size: 16px;
  align-items: center;
  margin-bottom: 10px;
  flex-wrap: wrap;
`;
const DeadLineInfo = styled.div`
  display: flex;
  gap: 5px;
  font-size: 14px;
  align-items: center;
`;
const DDayInfo = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
  display: flex;
  font-size: 16px;
  align-items: center;
  background-color: white;
  border-radius: 13px;
  padding: 2px 10px;
  opacity: 50%;
  font-weight: 600;
  color: ${(props) => (props.isDday ? "#ff0000" : "#000000")};
`;

const CardProfileImg = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #bbbbbb;
  margin-right: 3%;
  cursor: pointer;
  @media (max-width: 1200px) {
    width: 30px;
    height: 30px;
  }
`;
const PayInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 16px;
`;
