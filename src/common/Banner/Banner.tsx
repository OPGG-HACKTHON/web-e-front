import React from 'react';
import styled from 'styled-components';
import unRankLOL from 'assets/svg/Tier/LOL/롤 - 언랭크티어.svg';
import unRankPUBG from 'assets/svg/Tier/PUBG/배그 - 언랭크티어.svg';
import unRankWATCH from 'assets/svg/Tier/WATCH/옵치 - 언랭크티어.svg';

const Banner = () => {
  return (
    <BannerWrapper>
      <BannerImg />
      <GameWrapper>
        <img src={unRankLOL} alt="" />
        <img src={unRankPUBG} alt="" />
        <img src={unRankWATCH} alt="" />
      </GameWrapper>
    </BannerWrapper>
  );
};

export default Banner;

const BannerWrapper = styled.div`
  width: 100%;
  height: 100px;
  position: relative;
`;

const BannerImg = styled.img`
  width: 100%;
  height: 100px;
  background-color: ${({ theme }) => theme.color.grayScale[500]};
`;

const GameWrapper = styled.div`
  top: 10px;
  right: 10px;
  position: absolute;
  display: flex;
  & > * + * {
    margin-left: 8px;
  }
`;
