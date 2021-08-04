import styled from 'styled-components';

const VideoContent = styled.div`
  .video_btn {
    position: relative;
    display: block;
    top: 100%;
    width: 100%;
    height: 100%;
    z-index: 10000;
  }
  video {
    position: relative;
    display: block;
    z-index: -1;
  }
`;

export default VideoContent;
