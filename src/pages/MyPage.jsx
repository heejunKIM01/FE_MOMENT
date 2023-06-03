import React from "react";
import styled from "styled-components";
import BoardItem from "../components/BoardItem";
import { mypage } from "../apis/mypage/mypage";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import MyPageTabs from "../components/MyPageTabs";
// have a unique "key" prop? ㅜㅜㅜ

const MyPage = () => {
  const { hostId } = useParams();
  // console.log(hostId);

  const { isError, isLoading, data } = useQuery(["mypage", mypage], () =>
    mypage(hostId)
  );

  if (isLoading) {
    return <h1>로딩 중입니다(oﾟvﾟ)ノ</h1>;
  }

  if (isError) {
    return <h1>오류(⊙ˍ⊙)</h1>;
  }
  // console.log(data);
  return (
    <>
      <MyPageTabs />
      <PageContainer>
        <ContentContainer>
          <ProfileSection>
            <ProfilePicture src={data.profileUrl} />
            <ProfileInfo>
              <StFlex>
                <span>{data.role}</span>
                <UserNickname>{data.nickName}</UserNickname>
              </StFlex>
              <StFlex>
                <Post>피드 {data.photoList.length}</Post>
                <span>|</span>
                <Recommend>게시글 {data.boardCnt}</Recommend>
              </StFlex>
              <Post>추천🧡 {data.totalPhotoLoveCnt}</Post>
              <StFlex>
                <Link to={`/mypageinformation/${hostId}`}>
                  <ChatBtn>프로필 편집</ChatBtn>
                </Link>
              </StFlex>
            </ProfileInfo>
          </ProfileSection>
          <Container>
            <WorkSection>
              <Work>나의 작업물</Work>
              <WorkList>
                {data.photoList.slice(0, 10).map((item, index) => {
                  return <WorkItem key={index} src={item.photoUrl} />;
                })}
              </WorkList>
            </WorkSection>
            <Content>
              <Work>내가 쓴 게시물</Work>
              {data.boardList.slice(0, 2).map((item) => {
                return <BoardItem key={item.boardId} item={item} />;
              })}
            </Content>
          </Container>
        </ContentContainer>
      </PageContainer>
    </>
  );
};

export default MyPage;

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  padding: 20px;
`;
const Container = styled.div`
  width: 100%;
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  max-width: 1200px;
  margin-top: 80px;
  @media (min-width: 769px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 30px;
  border-radius: 20px;
  border: 1px solid #ddd;
  background-color: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin-right: 40px;
  margin-bottom: 20px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    align-items: center;
    margin-right: 0;
    margin-bottom: 30px;
    width: 70%;
  }
`;

const ProfileInfo = styled.div`
  font-size: 19px;
  font-weight: bold;
  text-align: center;
  writing-mode: horizontal-tb;
`;

const ChatBtn = styled.button`
  border: none;
  padding: 10px 40px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 20px;
  background-color: #c9ccd1;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 15px;

  &:hover {
    background-color: #202020;
  }

  @media (min-width: 769px) {
    padding: 12px 50px;
    font-size: 18px;
    writing-mode: horizontal-tb;
  }

  @media (max-width: 480px) {
    padding: 8px 30px;
    font-size: 14px;
    writing-mode: horizontal-tb;
  }
`;

const ProfilePicture = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
`;

const UserNickname = styled.span``;

const Recommend = styled.span`
  color: #666;
  font-size: 16px;
`;

const Post = styled.div`
  color: #666;
  font-size: 16px;
`;

const StFlex = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const WorkSection = styled.div`
  flex-grow: 1;
  margin: 30px;
`;

const Work = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const WorkList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  justify-items: center;
  align-items: center;
  margin-top: 16px;

  @media (min-width: 1200px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
`;

const WorkItem = styled.div`
  width: 100%;
  padding-top: 100%;
  background-image: ${(props) => `url(${props.src})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (max-width: 480px) {
    height: 200px;
  }
`;
const Content = styled.div`
  flex-grow: 1;
  margin: 30px;
`;
