import styled from 'styled-components';

export const VideoWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
`;

export const ErrorWrapper = styled.div`
  ${({ theme }) => theme.typography.headRg}
  display: flex;
  height: 20rem;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.color.grayScale[500]};
`;

// export default VideoWrapper;
