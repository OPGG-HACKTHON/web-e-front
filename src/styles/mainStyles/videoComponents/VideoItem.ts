import styled from 'styled-components';

const VideoItem = styled.div`
  .poster_info {
    position: relative;
    display: grid;
    grid-auto-columns: 20% auto;
    grid-auto-rows: 60% 40%;
    grid-template-areas:
      'pic name'
      'pic follow';
    .userPicImg {
      width: 90%;
      border-radius: 5px;
    }
    .poster_img {
      grid-area: pic;
    }
    .poster_name {
      grid-area: name;
    }
    .poster_followers {
      grid-area: follow;
    }
  }
  margin: ${({ theme }) => theme.margins.small};
  padding: ${({ theme }) => theme.verticalInterval.base};
`;

export default VideoItem;
