/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState, useEffect } from 'react';
import styled, { ThemeContext } from 'styled-components';
import UploadFind from 'assets/svg/upload_1.svg';
import LevelOne from 'assets/svg/upload_level_1.svg';
import Button from 'common/Button';
import { uploadSelectedFileState } from 'atom/uploadSelectedFile';
import { useRecoilState } from 'recoil';
import { read } from 'fs';

type a = {
  a?: string | ArrayBuffer | null;
};

const FirstContent = () => {
  const themeStyle = useContext(ThemeContext);
  const [selectedFile, setSelectedFile] = useState<string | ArrayBuffer | null>(
    ''
  );
  const onChange = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      const fileContent = e?.target?.result;
      setSelectedFile(fileContent as string);
    };
  };

  useEffect(() => {
    console.log(selectedFile);
  }, [selectedFile]);

  //     reader.onloadend = (event: any) => {
  //       const arrayBuffer = event.target.result;
  //       const fileType = ‘video/mpeg’;
  //       const blob = new Blob(arrayBuffer, { type: fileType });s
  //       const src = URL.createObjectURL(blob);
  //       //   video.src = src;
  //       return (
  //         <video autoPlay muted loop width=“100%” height=“100%“>
  //           <source src={src} type=“video/mp4” />
  //         </video>
  //       );
  //     };
  //     reader.readAsArrayBuffer(file);
  //   };
  // const reader = new FileReader();
  // setSelectedFile(file);
  // reader.onload = (pe) => {
  //   // eslint-disable-next-line react-hooks/rules-of-hooks
  // //   const [fileContent, setFileContent] = useState(reader.result);
  // //   console.log(fileContent);
  //   //   const a = reader.result;
  //   //   setFileContent(reader.result);
  //   return (
  //     <video autoPlay muted loop width=“100%” height=“100%“>
  //       <source src={fileContent?.toString()} type=“video/mp4” />
  //     </video>
  //   );
  // };
  return (
    <ContentWrapper>
      <label className="input-btn" htmlFor="input_file">
        <ImgWrapper>
          <Img src={UploadFind} alt="alt" />
        </ImgWrapper>
      </label>
      <input type="file" id="input_file" onChange={(e) => onChange(e)} />
      <div>
        <video
          autoPlay
          muted
          loop
          width="50%"
          height="50%"
          src={selectedFile as string}
        />
      </div>
      <BottomWrapper>
        <BottomContent>
          <Img src={LevelOne} alt="alt" />
        </BottomContent>
        <BottomContent>
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
        </BottomContent>
      </BottomWrapper>
    </ContentWrapper>
  );
};
export default FirstContent;
const ContentWrapper = styled.div``;
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
