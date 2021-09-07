import styled from 'styled-components';

export const VideoItem = styled.div`
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

export const PosterInfo = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: initial;
  justify-content: end;
  align-content: center;
`;

export const FollowBtnDiv = styled.div`
  width: 60%;
  position: relative;
  display: flex;
  justify-content: flex-end;
  button {
    line-height: 100%;
  }
`;
