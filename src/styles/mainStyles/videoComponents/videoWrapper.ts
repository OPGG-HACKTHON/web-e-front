import styled from 'styled-components';

const VideoWrapper = styled.div`
  display: grid;
  /* height: 100vh; */
  grid-template-columns: 1fr 1fr;
  /* grid-auto-flow: column dense; */
  /* grid-template-rows: 500px; */
  /* width: 100%; */
  position: relative;
  /* float: left; */
  /* flex-wrap: wrap; */
  /* column-count: 2; */
  /* flex-flow: row wrap; */
  /* align-content: stretch; */

  /* justify-content: space-evenly; */
  padding: ${({ theme }) => theme.paddings.small};
`;

export default VideoWrapper;
