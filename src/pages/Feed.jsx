import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FeedDetail from "../components/FeedDetail";
import "../css/App.css";
import { useQuery } from "react-query";
import { getFeedAxios } from "../apis/feed/getFeedAxios";

function Feed() {
  // 모달 제어
  const [feedDetailOpen, setFeedDetailOpen] = useState([]);

  const openFeedDetail = (photoId) => {
    setFeedDetailOpen((prevOpen) => [...prevOpen, photoId]);
  };

  const closeFeedDetail = (photoId) => {
    setFeedDetailOpen((prevOpen) => prevOpen.filter((id) => id !== photoId));
  };

  // 서버 통신
  const { isLoading, isError, data } = useQuery("getFeedAxios", getFeedAxios);

  if (isLoading) {
    return;
  }

  if (isError) {
    return <h1>오류가 발생하였습니다...!</h1>;
  }

  return (
    <FeedContainer>
      {data.map((item) => {
        const isOpen = feedDetailOpen.includes(item.photoId);

        return (
          <React.Fragment key={item.photoId}>
            <Cards>
              <CardsImg
                src={item.photoUrl}
                onClick={() => {
                  openFeedDetail(item.photoId);
                }}
              />
            </Cards>
            {isOpen && (
              <FeedDetail
                open={() => openFeedDetail(item.photoId)}
                close={() => closeFeedDetail(item.photoId)}
                photoId={item.photoId}
              />
            )}
          </React.Fragment>
        );
      })}
    </FeedContainer>
  );
}

export default Feed;
const FeedContainer = styled.div`
  width: 80%;
  margin: auto;
  height: auto;
  display: flex;
  flex-wrap: wrap;
`;

const Cards = styled.div`
  width: 32%;
  background: black;
  margin: 5px;
`;

const CardsImg = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
`;
