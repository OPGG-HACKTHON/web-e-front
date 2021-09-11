import React, { useContext, useState, useEffect } from 'react';
import styled, { ThemeContext } from 'styled-components';
import useUpload from 'hooks/useUpload/useUpload';
import Button from 'common/Button';

import { useRecoilState, useRecoilValue } from 'recoil';
import { uploadModalStep } from 'atom/uploadModalStepAtom';
import { uploadSelectedFile } from 'atom/uploadSelectedFile';

import {
  enabledButtonStyle,
  getButtonStyleByCondition,
} from 'util/getButtonStyle';
import { EUploadStep } from 'enum/uploadStep.enum';
import { EGameList } from 'enum/game.enum';
import LevelTwo from 'assets/svg/upload_level_2.svg';

interface IActiveStyleProps {
  active: boolean;
}

const SecondContent = () => {
  const themeStyle = useContext(ThemeContext);

  const [readableSelectedFile, setSelectedFile] = useState<string>('');
  const selectedFile = useRecoilValue(uploadSelectedFile);
  const [currentStep, setCurrentStep] = useRecoilState(uploadModalStep);

  const [text, setText] = useState('');
  const [selectedButton, setSelectedButton] = useState<EGameList>();
  const { uploadObj, setUploadObj, handleUpload, uploadErrorStatus } =
    useUpload();

  const selectButton = (value: EGameList) => {
    setUploadObj({
      ...uploadObj,
      category: value,
    });
    setSelectedButton(value);
  };
  const handleChange = (e: any) => {
    setText(e.target.value);
    setUploadObj({
      ...uploadObj,
      videoIntro: e.target.value,
    });
  };

  const getHastags = () => {
    const matches = text.match(/#([가-힣a-zA-Z0-9]+)/g);
    const tags = matches.join(',');
    setUploadObj({
      ...uploadObj,
      tags,
    });
  };

  const onClickUpload = () => {
    if (selectedButton) {
      handleUpload();
      setCurrentStep(currentStep + 1);
    }
  };

  const readFile = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      const fileContent = e?.target?.result;
      setSelectedFile(fileContent as string);
    };
  };

  useEffect(() => {
    readFile(selectedFile);
  }, [selectedFile]);

  return (
    <ContentWrapper active={currentStep === EUploadStep.SECOND_STEP}>
      <FlexWrapper>
        <VideoWrapper>
          <video autoPlay muted loop src={readableSelectedFile as string} />
        </VideoWrapper>
        <VideoContentWrapper>
          <VideoContent>
            <h3>게임선택</h3>
            <div>
              <Button
                text="리그오브레전드"
                onClick={() => selectButton(EGameList.LOL)}
                fontColor={
                  getButtonStyleByCondition(selectedButton === EGameList.LOL)
                    .fontColor
                }
                bkgColor={
                  getButtonStyleByCondition(selectedButton === EGameList.LOL)
                    .backGroundColor
                }
                padding="0.8rem 0.7rem"
                width={12}
                height={3.6}
                borderRadius={0.5}
                fontStyle={themeStyle.typography.bodyRgBold}
                hoverBkgColor={
                  getButtonStyleByCondition(selectedButton === EGameList.LOL)
                    .hoverBackGroundColor
                }
                hoverFontColor={
                  getButtonStyleByCondition(selectedButton === EGameList.LOL)
                    .hoverFontColor
                }
              />
              <Button
                text="배틀그라운드"
                onClick={() => selectButton(EGameList.PUBG)}
                fontColor={
                  getButtonStyleByCondition(selectedButton === EGameList.PUBG)
                    .fontColor
                }
                bkgColor={
                  getButtonStyleByCondition(selectedButton === EGameList.PUBG)
                    .backGroundColor
                }
                padding="0.8rem 0.7rem"
                width={11}
                height={3.6}
                borderRadius={0.5}
                fontStyle={themeStyle.typography.bodyRgBold}
                hoverBkgColor={
                  getButtonStyleByCondition(selectedButton === EGameList.PUBG)
                    .hoverBackGroundColor
                }
                hoverFontColor={
                  getButtonStyleByCondition(selectedButton === EGameList.PUBG)
                    .hoverFontColor
                }
              />
              <Button
                text="오버워치"
                onClick={() => selectButton(EGameList.OVERWATCH)}
                fontColor={
                  getButtonStyleByCondition(
                    selectedButton === EGameList.OVERWATCH
                  ).fontColor
                }
                bkgColor={
                  getButtonStyleByCondition(
                    selectedButton === EGameList.OVERWATCH
                  ).backGroundColor
                }
                padding="0.8rem 0.7rem"
                width={8.2}
                height={3.6}
                borderRadius={0.5}
                fontStyle={themeStyle.typography.bodyRgBold}
                hoverBkgColor={
                  getButtonStyleByCondition(
                    selectedButton === EGameList.OVERWATCH
                  ).hoverBackGroundColor
                }
                hoverFontColor={
                  getButtonStyleByCondition(
                    selectedButton === EGameList.OVERWATCH
                  ).hoverFontColor
                }
              />
            </div>
          </VideoContent>
          <VideoContent>
            <h3>내용</h3>
            <textarea
              value={text}
              onChange={(e) => handleChange(e)}
              onBlur={getHastags}
            />
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
            fontColor={
              getButtonStyleByCondition(selectedButton !== undefined).fontColor
            }
            bkgColor={
              getButtonStyleByCondition(selectedButton !== undefined)
                .backGroundColor
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
