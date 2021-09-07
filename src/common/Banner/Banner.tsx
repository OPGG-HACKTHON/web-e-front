import React, { useMemo } from 'react';
import styled from 'styled-components';

import {
  lolTierImgConverter,
  pubgTierImgConverter,
  watchTierImgConverter,
} from 'util/tierImgConverter';

type Props = {
  img: string;
  lolTier: string;
  pubgTier: string;
  watchTier: string;
  userColor: string;
  userLolId: string;
  userPubgId: string;
};

const Banner = ({
  img,
  lolTier,
  pubgTier,
  watchTier,
  userColor,
  userLolId,
  userPubgId,
}: Props) => {
  const lolTierImg = useMemo(() => lolTierImgConverter(lolTier), [lolTier]);
  const pubgTierImg = useMemo(() => pubgTierImgConverter(pubgTier), [pubgTier]);
  const watchTierImg = useMemo(
    () => watchTierImgConverter(watchTier),
    [watchTier]
  );

  return (
    <BannerWrapper>
      {img === '' || img === null ? (
        <BannerUserColor backgroundColor={userColor} />
      ) : (
        <BannerImg src={img} />
      )}

      <GameWrapper>
        <Href
          href={`https://www.op.gg/summoner/userName=${userLolId}`}
          target="_blank"
        >
          <img src={lolTierImg} alt={lolTierImg} />
        </Href>
        <Href
          href={`https://pubg.op.gg/user/${
            (userPubgId !== null || userPubgId === '') && userPubgId.trim()
          }`}
          target="_blank"
        >
          <img src={pubgTierImg} alt={pubgTierImg} />
        </Href>
        <img src={watchTierImg} alt={watchTierImg} />
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

const BannerUserColor = styled.div<{ backgroundColor: string }>`
  width: 100%;
  height: 100px;
  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor === '' || backgroundColor === null
      ? theme.color.grayScale[500]
      : backgroundColor};
`;

const BannerImg = styled.img`
  width: 100%;
  height: 100px;
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

const Href = styled.a``;
