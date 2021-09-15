import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { videoListState } from 'atom/videoListAtom';
import {
  ErrorWrapper,
  VideoWrapper,
} from 'styles/mainStyles/videoComponents/videoWrapper';
import ModalContainer from 'common/ModalContainer';
import VideoModal from 'components/VideoModal';
import VideoList from './VideoList';

export interface Props {
  videos: any;
  isNeedDescription: boolean;
}

const Main = ({ videos, isNeedDescription }: Props) => {
  const [isVideoModalOpen, setVideoModalOpen] = useState(false);
  const refechVideoList = useSetRecoilState(videoListState);

  const openVideoModal = (e: React.MouseEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).tagName === 'VIDEO') {
      setVideoModalOpen(true);
    }
  };

  const closeVideoModal = (e: React.MouseEvent<HTMLElement>) => {
    setVideoModalOpen(false);
    refechVideoList(0);
  };
  if (videos[0].length) {
    return (
      <>
        <ModalContainer
          isPopup={isVideoModalOpen}
          onClickOverlay={closeVideoModal}
          contentComponent={<VideoModal />}
          width={77}
          height={68.2}
          borderRadius={0.5}
        />
        <VideoWrapper onClick={openVideoModal}>
          <VideoList videos={videos} isNeedDescription={isNeedDescription} />
        </VideoWrapper>
      </>
    );
  }
  return <ErrorWrapper>업로드된 플레이가 없습니다.</ErrorWrapper>;
};

export default Main;
