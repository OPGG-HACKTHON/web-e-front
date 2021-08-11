import { isNext } from 'atom/uploadIsNext';
import { uploadSelectedFile } from 'atom/uploadSelectedFile';
import Button from 'common/Button';
import React, { useContext, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled, { ThemeContext } from 'styled-components';
import LevelTwo from 'assets/svg/upload_level_2.svg';

interface IActiveStyleProps {
  active: boolean;
}

const SecondContent = () => {
  const themeStyle = useContext(ThemeContext);
  const isNextContent = useRecoilValue(isNext);
  const useRecoilSeletedFile = useRecoilValue(uploadSelectedFile);
  const [text, setText] = useState('');
  const [selectedButton, setSelectedButton] = useState(0);
  const [readyToUpload, setReadyToUpload] = useState(false);
  const getSelectedOneButton = () => {
    setSelectedButton(1);
    console.log(selectedButton);
  };
  const getSelectedTwoButton = () => {
    setSelectedButton(2);
    console.log(selectedButton);
  };
  const getSelectedThreeButton = () => {
    setSelectedButton(3);
    console.log(selectedButton);
  };
  const handleChange = (e: any) => {
    setText(e.target.value);
  };
  return (
    <ContentWrapper active={isNextContent}>
      <FlexWrapper>
        <VideoWrapper>
          <video autoPlay muted loop src={useRecoilSeletedFile as string} />
        </VideoWrapper>
        <VideoContentWrapper>
          <VideoContent>
            <h3>게임선택</h3>
            <div>
              {selectedButton !== 1 ? (
                <Button
                  text="리그오브레전드"
                  onClick={() => getSelectedOneButton()}
                  fontColor={themeStyle.color.grayScale[500]}
                  bkgColor={themeStyle.color.grayScale[50]}
                  padding="0.8rem 0.7rem"
                  width={12}
                  height={3.6}
                  borderRadius={0.5}
                  fontStyle={themeStyle.typography.bodyRgBold}
                  hoverBkgColor={themeStyle.color.grayScale[50]}
                  hoverFontColor={themeStyle.color.grayScale[500]}
                />
              ) : (
                <Button
                  text="리그오브레전드"
                  onClick={() => getSelectedOneButton()}
                  fontColor={themeStyle.color.white}
                  bkgColor={themeStyle.color.yellow}
                  padding="0.8rem 0.7rem"
                  width={12}
                  height={3.6}
                  borderRadius={0.5}
                  fontStyle={themeStyle.typography.bodyRgBold}
                  hoverBkgColor={themeStyle.color.yellow}
                  hoverFontColor={themeStyle.color.white}
                />
              )}
              {selectedButton !== 2 ? (
                <Button
                  text="배틀그라운드"
                  onClick={() => getSelectedTwoButton()}
                  fontColor={themeStyle.color.grayScale[500]}
                  bkgColor={themeStyle.color.grayScale[50]}
                  padding="0.8rem 0.7rem"
                  width={11}
                  height={3.6}
                  borderRadius={0.5}
                  fontStyle={themeStyle.typography.bodyRgBold}
                  hoverBkgColor={themeStyle.color.grayScale[50]}
                  hoverFontColor={themeStyle.color.grayScale[500]}
                />
              ) : (
                <Button
                  text="배틀그라운드"
                  onClick={() => getSelectedTwoButton()}
                  fontColor={themeStyle.color.white}
                  bkgColor={themeStyle.color.yellow}
                  padding="0.8rem 0.7rem"
                  width={11}
                  height={3.6}
                  borderRadius={0.5}
                  fontStyle={themeStyle.typography.bodyRgBold}
                  hoverBkgColor={themeStyle.color.yellow}
                  hoverFontColor={themeStyle.color.white}
                />
              )}
              {selectedButton !== 3 ? (
                <Button
                  text="오버워치"
                  onClick={() => getSelectedThreeButton()}
                  fontColor={themeStyle.color.grayScale[500]}
                  bkgColor={themeStyle.color.grayScale[50]}
                  padding="0.8rem 0.7rem"
                  width={8.2}
                  height={3.6}
                  borderRadius={0.5}
                  fontStyle={themeStyle.typography.bodyRgBold}
                  hoverBkgColor={themeStyle.color.grayScale[50]}
                  hoverFontColor={themeStyle.color.grayScale[500]}
                />
              ) : (
                <Button
                  text="오버워치"
                  onClick={() => getSelectedThreeButton()}
                  fontColor={themeStyle.color.white}
                  bkgColor={themeStyle.color.yellow}
                  padding="0.8rem 0.7rem"
                  width={8.2}
                  height={3.6}
                  borderRadius={0.5}
                  fontStyle={themeStyle.typography.bodyRgBold}
                  hoverBkgColor={themeStyle.color.yellow}
                  hoverFontColor={themeStyle.color.white}
                />
              )}
            </div>
          </VideoContent>
          <VideoContent>
            <h3>내용</h3>
            <textarea value={text} onChange={(e) => handleChange(e)} />
          </VideoContent>
        </VideoContentWrapper>
      </FlexWrapper>
      <BottomWrapper>
        <BottomContent>
          <Img src={LevelTwo} alt="alt" />
        </BottomContent>
        <BottomContent>
          {!selectedButton ? (
            <Button
              text="업로드"
              onClick={() => console.log('업로드')}
              fontColor={themeStyle.color.grayScale[500]}
              bkgColor={themeStyle.color.grayScale[50]}
              padding="0.8rem 0.7rem"
              width={5.5}
              height={3.6}
              borderRadius={0.5}
              fontStyle={themeStyle.typography.bodyRgBold}
              hoverBkgColor={themeStyle.color.grayScale[50]}
              hoverFontColor={themeStyle.color.grayScale[500]}
            />
          ) : (
            <Button
              text="업로드"
              onClick={() => console.log('업로드')}
              fontColor={themeStyle.color.white}
              bkgColor={themeStyle.color.yellow}
              padding="0.8rem 0.7rem"
              width={5.5}
              height={3.6}
              borderRadius={0.5}
              fontStyle={themeStyle.typography.bodyRgBold}
              hoverBkgColor={themeStyle.color.yellow}
              hoverFontColor={themeStyle.color.white}
            />
          )}
        </BottomContent>
      </BottomWrapper>
    </ContentWrapper>
  );
};

export default SecondContent;

const ContentWrapper = styled.div<IActiveStyleProps>`
  display: none;
  margin-top: ${({ theme }) => theme.margins.base};
  flex-direction: column;
  align-items: center;
  ${({ active }) =>
    active &&
    `
display: flex;ß
`}
`;

const VideoWrapper = styled.div`
  & > video {
    width: 21rem;
    border-radius: 5px;
  }
  margin: ${({ theme }) => theme.margins.base}
    ${({ theme }) => theme.margins.xl};
`;

const VideoContentWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: start;
  flex-direction: column;
`;

const VideoContent = styled.div`
  & > h3 {
    font-size: 2.8rem;
    font-weight: bold;
    font-family: NotoSansKR-Bold;
    display: block;
  }
  & > textarea {
    width: 42rem;
    height: 10rem;
    margin-right: ${({ theme }) => theme.margins.xl};
    resize: none;
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.color.grayScale[500]};
    &:focus {
      outline: 1px solid ${({ theme }) => theme.color.grayScale[500]};
    }
  }
  & > div {
    margin-top: ${({ theme }) => theme.margins.base};
    margin-bottom: ${({ theme }) => theme.margins.xl};
    & > button {
      margin-right: ${({ theme }) => theme.margins.small};
    }
  }
  /* height: 20rem; */
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 39.3rem;
  /* margin: ${({ theme }) => theme.margins.base}; */
`;

const BottomWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
const BottomContent = styled.div`
  margin: 0 ${({ theme }) => theme.margins.base};
`;
const Img = styled.img``;
