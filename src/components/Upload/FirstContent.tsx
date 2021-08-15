/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState, useEffect } from 'react';
import styled, { ThemeContext } from 'styled-components';
import UploadFind from 'assets/svg/upload_1.svg';
import LevelOne from 'assets/svg/upload_level_1.svg';
import Button from 'common/Button';
import useUpload from 'hooks/useUpload/useUpload';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { isNext } from 'atom/uploadIsNext';
import { myProfileAtom } from 'atom/profileAtom';
import { uploadModalStep } from 'atom/uploadModalStepAtom';
import { uploadSelectedFile } from 'atom/uploadSelectedFile';
import { EUploadStep } from 'enum/uploadStep.enum';

interface IActiveStyleProps {
  active: boolean;
}

const FirstContent = () => {
  const themeStyle = useContext(ThemeContext);
  const myProfile = useRecoilValue(myProfileAtom);
  const [selectedFile, setSelectedFile] = useState<string | ArrayBuffer | null>(
    ''
  );
  const setRecoilSelectedFile = useSetRecoilState(uploadSelectedFile);

  const onChange = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      const fileContent = e?.target?.result;
      setSelectedFile(fileContent as string);
      setRecoilSelectedFile(fileContent as string);
    };
  };

  // const [isNextContent, setIsNext] = useRecoilState(isNext);
  const [currentStep, setCurrentStep] = useRecoilState(uploadModalStep);

  const nextClick = () => {
    // setIsNext(true);
    if (currentStep < 2) setCurrentStep(currentStep + 1);
  };

  return (
    <ContentWrapper active={currentStep === EUploadStep.FIRST_STEP}>
      <label className="input-btn" htmlFor="input_file">
        <ImgWrapper>
          {!selectedFile ? (
            <Img src={UploadFind} alt="alt" />
          ) : (
            <VideoWrapper>
              <video autoPlay muted loop src={selectedFile as string} />
            </VideoWrapper>
          )}
        </ImgWrapper>
      </label>

      <input
        type="file"
        id="input_file"
        onChange={(e) => onChange(e)}
        style={{ display: 'none' }}
      />
      <BottomWrapper>
        <BottomContent>
          <Img src={LevelOne} alt="alt" />
        </BottomContent>
        <BottomContent>
          {!selectedFile ? (
            // <img src={DisBnt} alt="alt" />
            <Button
              text="다음"
              onClick={() => console.log('다음')}
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
              text="다음"
              onClick={() => nextClick()}
              fontColor={themeStyle.color.white}
              bkgColor={themeStyle.color.yellow}
              padding="0.8rem 0.7rem"
              width={5.5}
              height={3.6}
              borderRadius={0.5}
              fontStyle={themeStyle.typography.bodyRgBold}
            />
          )}
        </BottomContent>
      </BottomWrapper>
    </ContentWrapper>
  );
};
export default FirstContent;
const ContentWrapper = styled.div<IActiveStyleProps>`
  display: none;
  flex-direction: column;
  align-items: center;
  ${({ active }) => active && `display: flex;`}
`;
const ImgWrapper = styled.div`
  width: fit-content;
  margin: ${({ theme }) => theme.margins.base};
`;
const Img = styled.img``;
const BottomWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
const BottomContent = styled.div`
  margin: 0 ${({ theme }) => theme.margins.base};
`;

const VideoWrapper = styled.div`
  & > video {
    border-radius: 5px;
    height: 37rem;
  }
`;
