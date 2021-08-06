import styled from 'styled-components';

const VideoWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  padding: ${({ theme }) => theme.paddings.small};
`;

export default VideoWrapper;
