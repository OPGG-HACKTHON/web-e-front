import styled from 'styled-components';

const VideoItem = styled.div`
  .poster_info {
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: initial;
    justify-content: end;
    align-content: center;
    .userPicImg {
      width: 90%;
      border-radius: 5px;
      cursor: pointer;
    }
    .poster_img {
      width: 5rem;
    }
    .follow_btn_div {
      width: 60%;
      position: relative;
      display: flex;
      justify-content: flex-end;
      button {
        line-height: 100%;
      }
    }
    .poster_name {
      cursor: pointer;
      ${({ theme }) => theme.typography.bodyRgBold};
    }
    .poster_followers {
      ${({ theme }) => theme.typography.bodySmRegular};
      color: ${({ theme }) => theme.color.grayScale[500]};
    }
  }
  video::-webkit-media-controls {
    display: none;
  }
  video {
    border-radius: 5px;
  }
  .like_and_comment_div {
    position: absolute;
    display: flex;
    align-items: center;
    width: 100%;
    flex-flow: row;
    bottom: 0.3rem;
    justify-content: flex-end;
    div {
      color: white;
      margin: ${({ theme }) => theme.margins.xs};
    }
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.5) 100%
    );
    border-radius: 0px 0px 5px 5px;
  }
  .describe_span {
    ${({ theme }) => theme.typography.bodySmRegular};
  }
  margin: ${({ theme }) => theme.margins.base}
    ${({ theme }) => theme.margins.small} 0
    ${({ theme }) => theme.margins.small};
  /* padding: ${({ theme }) => theme.verticalInterval.base}; */
`;

export default VideoItem;
