import React, { useContext, useState, useEffect } from 'react';
import styled, { ThemeContext } from 'styled-components';
import useUpload from 'hooks/useUpload/useUpload';
import Button from 'common/Button';

import { useRecoilState, useRecoilValue } from 'recoil';
import { uploadModalStep } from 'atom/uploadModalStepAtom';
import { myProfileAtom } from 'atom/profileAtom';
import { uploadSelectedFile } from 'atom/uploadSelectedFile';
import { isNext } from 'atom/uploadIsNext';

import {
  enabledButtonStyle,
  getButtonStyleByCondition,
} from 'util/getButtonStyle';
import { EUploadStep } from 'enum/uploadStep.enum';
import LevelTwo from 'assets/svg/upload_level_2.svg';

interface IActiveStyleProps {
  active: boolean;
}

const GAME_CATEGORY = ['리그오브레전드', '배틀그라운드', '오버워치'];

const SecondContent = () => {
  const themeStyle = useContext(ThemeContext);
  const isNextContent = useRecoilValue(isNext);

  const selectedFile = useRecoilValue(uploadSelectedFile);
  const myProfile = useRecoilValue(myProfileAtom);
  const [currentStep, setCurrentStep] = useRecoilState(uploadModalStep);

  const [text, setText] = useState('');
  const [selectedButton, setSelectedButton] = useState(0);
  const [readyToUpload, setReadyToUpload] = useState(false);

  const { uploadObj, setUploadObj, handleUpload, uploadErrorStatus } =
    useUpload();

  const selectButton = (value: React.SetStateAction<number>) => {
    setUploadObj({
      ...uploadObj,
      category: 'lol',
    });
    setSelectedButton(value);
    console.log(uploadObj);
  };
  const handleChange = (e: any) => {
    setUploadObj({
      ...uploadObj,
      description: e.target.value,
    });
    setText(e.target.value);
  };
  const onClickUpload = () => {
    if (selectedButton > 0) {
      handleUpload();
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <ContentWrapper active={currentStep === EUploadStep.SECOND_STEP}>
      <FlexWrapper>
        <VideoWrapper>
          <video autoPlay muted loop src={selectedFile as string} />
        </VideoWrapper>
        <VideoContentWrapper>
          <VideoContent>
            <h3>게임선택</h3>
            <div>
              <Button
                text="리그오브레전드"
                onClick={() => selectButton(1)}
                fontColor={
                  getButtonStyleByCondition(selectedButton === 1).fontColor
                }
                bkgColor={
                  getButtonStyleByCondition(selectedButton === 1)
                    .backGroundColor
                }
                padding="0.8rem 0.7rem"
                width={12}
                height={3.6}
                borderRadius={0.5}
                fontStyle={themeStyle.typography.bodyRgBold}
                hoverBkgColor={
                  getButtonStyleByCondition(selectedButton === 1)
                    .hoverBackGroundColor
                }
                hoverFontColor={
                  getButtonStyleByCondition(selectedButton === 1).hoverFontColor
                }
              />
              <Button
                text="배틀그라운드"
                onClick={() => selectButton(2)}
                fontColor={
                  getButtonStyleByCondition(selectedButton === 2).fontColor
                }
                bkgColor={
                  getButtonStyleByCondition(selectedButton === 2)
                    .backGroundColor
                }
                padding="0.8rem 0.7rem"
                width={11}
                height={3.6}
                borderRadius={0.5}
                fontStyle={themeStyle.typography.bodyRgBold}
                hoverBkgColor={
                  getButtonStyleByCondition(selectedButton === 2)
                    .hoverBackGroundColor
                }
                hoverFontColor={
                  getButtonStyleByCondition(selectedButton === 2).hoverFontColor
                }
              />
              <Button
                text="오버워치"
                onClick={() => selectButton(3)}
                fontColor={
                  getButtonStyleByCondition(selectedButton === 3).fontColor
                }
                bkgColor={
                  getButtonStyleByCondition(selectedButton === 3)
                    .backGroundColor
                }
                padding="0.8rem 0.7rem"
                width={8.2}
                height={3.6}
                borderRadius={0.5}
                fontStyle={themeStyle.typography.bodyRgBold}
                hoverBkgColor={
                  getButtonStyleByCondition(selectedButton === 3)
                    .hoverBackGroundColor
                }
                hoverFontColor={
                  getButtonStyleByCondition(selectedButton === 3).hoverFontColor
                }
              />
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
          <Button
            text="업로드"
            onClick={onClickUpload}
            fontColor={getButtonStyleByCondition(selectedButton > 0).fontColor}
            bkgColor={
              getButtonStyleByCondition(selectedButton > 0).backGroundColor
            }
            padding="0.8rem 0.7rem"
            width={5.5}
            height={3.6}
            borderRadius={0.5}
            fontStyle={themeStyle.typography.bodyRgBold}
            hoverBkgColor={enabledButtonStyle.hoverBackGroundColor}
            hoverFontColor={enabledButtonStyle.hoverFontColor}
          />
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
  ${({ active }) => active && `display: flex;`}
`;

const VideoWrapper = styled.div`
  & > video {
    width: 21rem;
    border-radius: 5px;
  }
  margin: ${({ theme }) => theme.margins.base};
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
    padding: 1rem;
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
