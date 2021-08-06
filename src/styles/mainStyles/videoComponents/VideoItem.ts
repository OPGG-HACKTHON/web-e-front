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
      width: 63%;
      position: relative;
      display: flex;
      justify-content: flex-end;
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
  .like_and_comment_div {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    /* z-index: 10000; */
    flex-flow: row;
    top: -6em;
    justify-content: flex-end;
    div {
      color: white;
      margin: ${({ theme }) => theme.margins.small};
    }
  }
  .describe_span {
    ${({ theme }) => theme.typography.bodySmRegular};
  }
  margin: ${({ theme }) => theme.margins.small};
  padding: ${({ theme }) => theme.verticalInterval.base};
`;

export default VideoItem;
