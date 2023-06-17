import React, { useEffect, useRef } from "react";
import "../css/FeedDetailModal.css";
import disableScroll from "./DisableScroll";
import enableScroll from "./EnableScroll";
import { feedDetailAxios } from "../apis/feed/feedDetailAxios";
import { useQuery, useQueryClient } from "react-query";
import { AiOutlineClose } from "react-icons/ai";
import { useMutation } from "react-query";
import heartAxios from "../apis/feed/heartAxios";
import HeartButton from "./HeartButton";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mypage } from "../apis/mypage/mypage";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FeedDetail = (props) => {
  const { open, close, photoId } = props;
  const modalRef = useRef(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const settings = {
    // dots: true,
    // infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // 모달창 바깥을 눌렀을 때 모달 close
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      close();
    }
  };

  // 스크롤 방지
  useEffect(() => {
    disableScroll();
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      enableScroll();
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // 피드 데이터 받아오기
  const { isError, isLoading, data } = useQuery(
    ["feedDetailAxios", feedDetailAxios],
    () => feedDetailAxios(photoId)
  );

  // 좋아요 버튼
  const likeButtonMutation = useMutation(heartAxios, {
    onSuccess: () => {
      queryClient.invalidateQueries("feedDetailAxios");
      queryClient.invalidateQueries("getFeedAxios");
      queryClient.invalidateQueries("mypage", mypage);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const likeButtonHandler = () => {
    likeButtonMutation.mutate(photoId);
  };

  if (isLoading) {
    return null;
  }

  if (isError) {
    return <h1>오류가 발생하였습니다...!</h1>;
  }

  const ImgArray = data.photoUrls;

  return (
    <div className={open ? "openModal feed-datail-modal" : "feed-datail-modal"}>
      {open && (
        // <section ref={modalRef}>
        //   <div className="container">
        //     <main className="main-body">
        //       <div className="imgContainer">
        //         <img
        //           src={data.photoUrls[0]}
        //           className="feedDetailImg"
        //           alt="피드사진"
        //         />
        //       </div>
        //     </main>

        <section ref={modalRef}>
          <div className="container">
            <MainBody>
              <ImgContainer>
                {/* <Slider {...settings}>
                  {ImgArray.map((img) => {
                    return <FeedImg image={img} alt="피드사진" />;
                  })}
                </Slider> */}

                {/* {ImgArray.map((img) => {
                  return (
                    <SliderBox>
                      <FeedImg image={img} alt="피드사진" />;
                    </SliderBox>
                  );
                })} */}
                {/* 
                <Slider {...settings}>
                  <SliderBox>
                    <h3>1</h3>
                  </SliderBox>
                  <SliderBox>
                    <h3>2</h3>
                  </SliderBox>
                  <SliderBox>
                    <h3>3</h3>
                  </SliderBox>
                  <SliderBox>
                    <h3>4</h3>
                  </SliderBox>
                  <SliderBox>
                    <h3>5</h3>
                  </SliderBox>
                </Slider> */}

                <FeedImg image={ImgArray[0]} />
              </ImgContainer>
            </MainBody>

            <div className="inputSection">
              <div className="closeButton">
                <button className="close" onClick={close}>
                  <AiOutlineClose />
                </button>
              </div>
              <div className="profileContainer">
                <img
                  src={data.profileUrl}
                  className="profileImg"
                  onClick={() => {
                    navigate(`/page/${data.hostId}`);
                  }}
                  alt="프로필사진"
                />
                <div>
                  <p className="position">{data.role}</p>
                  <p>{data.nickName}</p>
                </div>

                <div className="loveButtonBox">
                  <HeartButton
                    like={data.checkLove}
                    onClick={likeButtonHandler}
                  />
                  <div>{data.photoLoveCnt}</div>
                </div>
              </div>

              <ContentArea>
                <Content>
                  {data.contents === "undefined" ? null : data.contents}
                </Content>
              </ContentArea>

              <HashTagContainer>
                {data.tag_photoList.map((item) => {
                  return <HashTag key={item.tagId}>{item.tag}</HashTag>;
                })}
              </HashTagContainer>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default FeedDetail;

const SliderContainer = styled.div`
  height: 100%;
  background-color: aqua;
`;

const SliderBox = styled.div`
  background-color: aqua;
  min-height: 700px;
`;

/////////////////////////////

const HashTagContainer = styled.div`
  margin-top: 20px;
  padding: 10px 0 10px 0;
  display: flex;
  gap: 5px;
  margin-left: 5px;
`;

const HashTag = styled.div`
  background-color: #483767;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 40px;
`;

const MainBody = styled.div`
  /* display: flex; */
  min-height: 700px;
  max-height: 700px;
  overflow: hidden;
`;

const Container = styled.div`
  display: flex;
`;

const ContentArea = styled.div`
  margin: 20px 10px 10px 10px;
  width: 300px;
  font-size: 17px;
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: break-word;
`;

const ImgContainer = styled.div`
  width: 720px;
  background-color: #eee;
  height: 100%;
`;

const Content = styled.p`
  width: 100%;
  white-space: pre-wrap; /* Add this line */
`;

const FeedImg = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: ${(props) => `url(${props.image})`};
`;

const PrevArrow = ({ onClick }) => (
  <ArrowButton className="slick-prev" onClick={onClick}></ArrowButton>
);

const NextArrow = ({ onClick }) => (
  <ArrowButton className="slick-next" onClick={onClick}></ArrowButton>
);

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

const Styled_Slide = styled(Slider)``;
