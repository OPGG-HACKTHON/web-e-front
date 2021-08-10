import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import Button from 'common/Button';
import { typography } from 'styles/theme';
import { useRecoilValue } from 'recoil';
import { popTagsState } from 'atom/videoListAtom';

const PopularTag = () => {
  const themeStyle = useContext(ThemeContext);
  const popularTags = useRecoilValue(popTagsState);

  return (
    <TagWrapper>
      {popularTags.map((tag) => (
        <Button
          key={popularTags.indexOf(`${tag}`)}
          text={`#${tag}`}
          onClick={() => console.log(`${tag}`)}
          fontColor={themeStyle.color.blackScale[50]}
          bkgColor={themeStyle.color.grayScale[50]}
          padding="0.8rem 0.7rem"
          height={3}
          borderRadius={0.5}
          fontStyle={typography.bodyRg}
          hoverBkgColor={themeStyle.color.grayScale[250]}
        />
      ))}
    </TagWrapper>
  );
};

export default PopularTag;

const TagWrapper = styled.div`
  width: 100%;
  display: flex;
  button {
    margin: 0 ${({ theme }) => theme.margins.xs} 0
      ${({ theme }) => theme.margins.xs};
    vertical-align: middle;
    text-align: center;
    line-height: 100%;
  }
`;
