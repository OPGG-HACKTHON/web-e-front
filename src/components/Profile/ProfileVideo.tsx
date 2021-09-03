import React from 'react';
import VideoListMain from 'common/VideoList/Main';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectCategory, myListByCategoryState } from 'atom/profileVideoAtom';
import styled from 'styled-components';

const ProfileVideo = () => {
  const videos = useRecoilValue(myListByCategoryState);

  const selectors = ['전체', '리그오브레전드', '배틀그라운드', '오버워치'];
  const [active, setActive] = useRecoilState(selectCategory);
  const setActiveF = (selector) => {
    setActive(selector);
  };
  return (
    <VideoWrapper>
      <SelectorWrapper>
        {selectors.map((selector) => (
          <SelectorContent
            key={selector}
            onClick={() => setActiveF(selector)}
            className={selector === active && 'is-active'}
          >
            {selector}
          </SelectorContent>
        ))}
      </SelectorWrapper>
      <VideoListMain videos={videos} isNeedDescription />
    </VideoWrapper>
  );
};

export default ProfileVideo;

const VideoWrapper = styled.div``;
const SelectorWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => `${theme.color.grayScale[250]}`};
`;
const SelectorContent = styled.button`
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  ${({ theme }) => `${theme.typography.bodyRgBold}`};
  background: none;
  margin-right: 30px;
  padding-bottom: 10px;

  &.is-active {
    color: ${({ theme }) => `${theme.color.yellow}`};
    border-bottom: 2px solid ${({ theme }) => `${theme.color.yellow}`};
    z-index: 1;
  }
`;
